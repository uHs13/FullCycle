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
	}
}

func (clientRoutes *ClientRoutes) Register() {
	clientRoutes.POST(
		routesConstants.GetClientRouteConst,
		clientRoutes.clientHandlers[CreateClientConst].Handle,
	)
}
