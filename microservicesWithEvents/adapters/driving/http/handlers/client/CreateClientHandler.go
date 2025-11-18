package clientHandler

import (
	drivenAdapterClient "microservices-wallet-core/adapters/driven/client"
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	"microservices-wallet-core/adapters/driving/http/handlers"
	clientHandlerRequest "microservices-wallet-core/adapters/driving/http/handlers/client/request"
	"microservices-wallet-core/adapters/driving/http/routes"
	useCaseClient "microservices-wallet-core/core/useCase/client"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"net/http"

	"github.com/gin-gonic/gin"
)

var clientPersistence *drivenAdapterClientDataSchema.ClientPersistenceSqlite

type CreateClientHandler struct {
	database *infraDataSchema.Database
}

func NewCreateClientHandler(database *infraDataSchema.Database) handlers.HandlerInterface {
	return &CreateClientHandler{
		database: database,
	}
}

func (createClientHandler *CreateClientHandler) GetDatabase() *infraDataSchema.Database {
	return createClientHandler.database
}

func (createClientHandler *CreateClientHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	requestData, err := clientHandlerRequest.NewCreateClientRequest(context)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	input := useCaseClient.CreateClientUseCaseInput{
		Name:  requestData.Name,
		Email: requestData.Email,
	}

	clientPersistence, err := handlers.DefinePersistenceByDbms(createClientHandler)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusInternalServerError,
			context,
		)

		return
	}

	persistence := drivenAdapterClient.NewClientPersistence(clientPersistence)

	useCase := useCaseClient.NewCreateClientUseCase(persistence)

	output, err := useCase.Execute(input)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	jsonResponse.SendJson(clientResponseConst, http.StatusOK, output)
}
