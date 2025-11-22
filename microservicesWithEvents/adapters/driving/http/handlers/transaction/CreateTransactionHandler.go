package transactionHandler

import (
	drivenAdapterAccount "microservices-wallet-core/adapters/driven/account"
	"microservices-wallet-core/adapters/driven/event/dispatcher"
	"microservices-wallet-core/adapters/driven/event/event"
	drivenAdapterTransaction "microservices-wallet-core/adapters/driven/transaction"
	"microservices-wallet-core/adapters/driving/http/handlers"
	transactionHandlerRequest "microservices-wallet-core/adapters/driving/http/handlers/transaction/request"
	"microservices-wallet-core/adapters/driving/http/routes"
	domainAccount "microservices-wallet-core/core/domain/account"
	"microservices-wallet-core/core/domain/valueObject"
	useCaseTransaction "microservices-wallet-core/core/useCase/transaction"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"net/http"

	"github.com/gin-gonic/gin"
)

type CreateTransactionHandler struct {
	database *infraDataSchema.Database
}

func NewCreateTransactionHandler(database *infraDataSchema.Database) handlers.HandlerInterface {
	return &CreateTransactionHandler{
		database: database,
	}
}

func (createTransactionHandler *CreateTransactionHandler) GetDatabase() *infraDataSchema.Database {
	return createTransactionHandler.database
}

func (createTransactionHandler *CreateTransactionHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	requestData, err := transactionHandlerRequest.NewCreateTransactionRequest(context)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	accountIdFrom, err := valueObject.MakeFromString(requestData.AccountIdFrom)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	accountFrom := domainAccount.Account{
		Id: *accountIdFrom,
	}

	accountIdTo, err := valueObject.MakeFromString(requestData.AccountIdTo)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	accountTo := domainAccount.Account{
		Id: *accountIdTo,
	}

	amount := requestData.Amount

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: &accountFrom,
		AccountTo:   &accountTo,
		Amount:      amount,
	}

	transactionConnection, err := handlers.DefineTransactionPersistenceByDbms(createTransactionHandler)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	accountConnection, err := handlers.DefineAccountPersistenceByDbms(createTransactionHandler)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	event := event.NewEvent("CreateTransactionEvent")
	eventDispatcher := dispatcher.NewEventDispatcher()

	transactionPersistence := drivenAdapterTransaction.NewTransactionPersistence(transactionConnection)
	accountPersistence := drivenAdapterAccount.NewAccountPersistence(accountConnection)

	useCase := useCaseTransaction.NewCreateTransactionUseCase(
		transactionPersistence,
		accountPersistence,
		eventDispatcher,
		event,
	)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	output, err := useCase.Execute(input)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	jsonResponse.SendJson(transactionResponseConst, http.StatusOK, output)
}
