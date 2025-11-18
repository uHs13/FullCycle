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

type GetClientByIdHandler struct {
	database *infraDataSchema.Database
}

func NewGetClientByIdHandler(database *infraDataSchema.Database) handlers.HandlerInterface {
	return &GetClientByIdHandler{
		database: database,
	}
}

func (getClientByIdHandler *GetClientByIdHandler) GetDatabase() *infraDataSchema.Database {
	return getClientByIdHandler.database
}

func (getClientByIdHandler *GetClientByIdHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	requestData, err := clientHandlerRequest.NewGetClientByIdRequest(context)

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

	clientPersistence, err := handlers.DefinePersistenceByDbms(getClientByIdHandler)

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
