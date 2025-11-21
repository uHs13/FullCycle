package accountHandler

import (
	drivenAdapterAccount "microservices-wallet-core/adapters/driven/account"
	"microservices-wallet-core/adapters/driving/http/handlers"
	accountHandlerRequest "microservices-wallet-core/adapters/driving/http/handlers/account/request"
	"microservices-wallet-core/adapters/driving/http/routes"
	useCaseAccount "microservices-wallet-core/core/useCase/account"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"net/http"

	"github.com/gin-gonic/gin"
)

type DepositInAccountHandler struct {
	database *infraDataSchema.Database
}

func NewDepositInAccountHandler(database *infraDataSchema.Database) handlers.HandlerInterface {
	return &DepositInAccountHandler{
		database: database,
	}
}

func (depositInAccountHandler *DepositInAccountHandler) GetDatabase() *infraDataSchema.Database {
	return depositInAccountHandler.database
}

func (depositInAccountHandler *DepositInAccountHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	requestData, err := accountHandlerRequest.NewDepositInAccountRequest(context)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	accountConnection, err := handlers.DefineAccountPersistenceByDbms(depositInAccountHandler)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusInternalServerError,
			context,
		)

		return
	}

	persistence := drivenAdapterAccount.NewAccountPersistence(accountConnection)

	useCase := useCaseAccount.NewDepositInAccountUseCase(persistence)

	input := useCaseAccount.DepositInAccountUseCaseInput{
		Id:     requestData.AccountId,
		Amount: requestData.Amount,
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

	jsonResponse.SendJson(accountResponseConst, http.StatusOK, output)
}
