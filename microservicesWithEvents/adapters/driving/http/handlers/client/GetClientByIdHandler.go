package clientHandler

import (
	drivenAdapterClient "microservices-wallet-core/adapters/driven/client"
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	"microservices-wallet-core/adapters/driving/http/handlers"
	clientHandlerRequest "microservices-wallet-core/adapters/driving/http/handlers/client/request"
	"microservices-wallet-core/adapters/driving/http/routes"
	useCaseClient "microservices-wallet-core/core/useCase/client"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GetClientByIdHandler struct {
}

func NewGetClientByIdHandler() handlers.HandlerInterface {
	return &GetClientByIdHandler{}
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

	sqlite, err := drivenAdapterClientDataSchema.NewClientPersistenceSqlite()

	if err != nil {
		jsonResponse.ThrowCustomError(
			err,
			http.StatusInternalServerError,
			context,
		)

		return
	}

	connection := sqlite.Database.Connection

	table := "CREATE TABLE IF NOT EXISTS client(id string, name string, email string, createdAt string);"

	statement, err := connection.Prepare(table)

	if err != nil {
		panic(err.Error())
	}

	_, err = statement.Exec()

	if err != nil {
		panic(err.Error())
	}

	persistence := drivenAdapterClient.NewClientPersistence(sqlite)

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

	jsonResponse.SendJson("client", http.StatusOK, output)
}
