package clientHandler

import (
	drivenAdapterClient "microservices-wallet-core/adapters/driven/client"
	"microservices-wallet-core/adapters/driving/http/handlers"
	clientHandlerRequest "microservices-wallet-core/adapters/driving/http/handlers/client/request"
	"microservices-wallet-core/adapters/driving/http/routes"
	useCaseClient "microservices-wallet-core/core/useCase/client"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"net/http"

	"github.com/gin-gonic/gin"
)

type FindClientByIdHandler struct {
	database *infraDataSchema.Database
}

func NewFindClientByIdHandler(database *infraDataSchema.Database) handlers.HandlerInterface {
	return &FindClientByIdHandler{
		database: database,
	}
}

func (findClientByIdHandler *FindClientByIdHandler) GetDatabase() *infraDataSchema.Database {
	return findClientByIdHandler.database
}

func (findClientByIdHandler *FindClientByIdHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	requestData, err := clientHandlerRequest.NewFindClientByIdRequest(context)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusBadRequest,
			context,
		)

		return
	}

	input := useCaseClient.FindClientByIdUseCaseInput{
		Id: requestData.Uuid,
	}

	clientPersistence, err := handlers.DefinePersistenceByDbms(findClientByIdHandler)

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusInternalServerError,
			context,
		)

		return
	}

	persistence := drivenAdapterClient.NewClientPersistence(clientPersistence)

	useCase := useCaseClient.NewFindClientByIdUseCase(persistence)

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
