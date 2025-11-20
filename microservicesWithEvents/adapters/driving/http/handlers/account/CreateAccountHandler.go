package accountHandler

import (
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	"microservices-wallet-core/adapters/driving/http/handlers"
	accountHandlerRequest "microservices-wallet-core/adapters/driving/http/handlers/account/request"
	"microservices-wallet-core/adapters/driving/http/routes"
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"net/http"

	"github.com/gin-gonic/gin"
)

var clientPersistence *drivenAdapterClientDataSchema.OperationsHandlerInterface

type CreateAccountHandler struct {
	database *infraDataSchema.Database
}

func NewCreateAccountHandler(database *infraDataSchema.Database) handlers.HandlerInterface {
	return &CreateAccountHandler{
		database: database,
	}
}

func (createAccountHandler *CreateAccountHandler) GetDatabase() *infraDataSchema.Database {
	return createAccountHandler.database
}

func (createAccountHandler *CreateAccountHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	requestData, err := accountHandlerRequest.NewCreateAccountRequest(context)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	uuid, err := valueObject.MakeFromString(requestData.ClientId)
	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	client := domainClient.Client{}
	client.DefineId(*uuid)

	// input := useCaseAccount.CreateAccountUseCaseInput{
	// 	Client: &client,
	// }

	// clientPersistence, err := handlers.DefineAccountPersistenceByDbms(createAccountHandler)

	// if err != nil {
	// 	jsonResponse.ThrowCustomError(
	// 		err,
	// 		http.StatusInternalServerError,
	// 		context,
	// 	)

	// 	return
	// }

	// persistence := drivenAdapterClient.NewClientPersistence(clientPersistence)

	// useCase := useCaseClient.NewCreateClientUseCase(persistence)

	// output, err := useCase.Execute(input)

	// if err != nil {
	// 	jsonResponse.ThrowCustomError(
	// 		err,
	// 		http.StatusBadRequest,
	// 		context,
	// 	)

	// 	return
	// }

	jsonResponse.SendJson(accountResponseConst, http.StatusOK, client)
}
