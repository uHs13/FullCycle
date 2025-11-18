package client

import (
	"microservices-wallet-core/adapters/driving/http/handlers"
	clientHandler "microservices-wallet-core/adapters/driving/http/handlers/client"
	"microservices-wallet-core/adapters/driving/http/routes"
	"microservices-wallet-core/adapters/driving/http/routesConstants"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	"github.com/gin-gonic/gin"
)

const (
	CreateClientConst = "createClient"
	FindClientConst   = "findClient"
	ListClientsConst  = "listClients"
)

type ClientRoutes struct {
	*gin.Engine
	clientHandlers map[string]handlers.HandlerInterface
}

func NewClientRoutes(
	app *gin.Engine,
	database *infraDataSchema.Database,
) routes.RoutesInterface {
	return &ClientRoutes{
		app,
		createMapOfClientHandlers(database),
	}
}

func createMapOfClientHandlers(database *infraDataSchema.Database) map[string]handlers.HandlerInterface {
	return map[string]handlers.HandlerInterface{
		CreateClientConst: clientHandler.NewCreateClientHandler(database),
		FindClientConst:   clientHandler.NewFindClientByIdHandler(database),
		ListClientsConst:  clientHandler.NewListClientsHandler(database),
	}
}

func (clientRoutes *ClientRoutes) Register() {
	clientRoutes.POST(
		routesConstants.CreateClientRouteConst,
		clientRoutes.clientHandlers[CreateClientConst].Handle,
	)

	clientRoutes.GET(
		routesConstants.FindClientRouteConst,
		clientRoutes.clientHandlers[FindClientConst].Handle,
	)

	clientRoutes.GET(
		routesConstants.ListClientsRouteConst,
		clientRoutes.clientHandlers[ListClientsConst].Handle,
	)
}
