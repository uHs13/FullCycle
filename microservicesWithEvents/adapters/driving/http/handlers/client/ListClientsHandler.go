package clientHandler

import (
	drivenAdapterClient "microservices-wallet-core/adapters/driven/client"
	"microservices-wallet-core/adapters/driving/http/handlers"
	"microservices-wallet-core/adapters/driving/http/routes"
	useCaseClient "microservices-wallet-core/core/useCase/client"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ListClientsHandler struct {
	database *infraDataSchema.Database
}

func NewListClientsHandler(database *infraDataSchema.Database) handlers.HandlerInterface {
	return &ListClientsHandler{
		database: database,
	}
}

func (listClientsHandler *ListClientsHandler) GetDatabase() *infraDataSchema.Database {
	return listClientsHandler.database
}

func (listClientsHandler *ListClientsHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	clientPersistence, err := handlers.DefinePersistenceByDbms(listClientsHandler)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusInternalServerError,
			context,
		)

		return
	}

	persistence := drivenAdapterClient.NewClientPersistence(clientPersistence)

	useCase := useCaseClient.NewListAllClientsUseCase(persistence)

	output, err := useCase.Execute()

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	jsonResponse.SendJson(clientsResponseConst, http.StatusOK, output.Clients)
}
