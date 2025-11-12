package client

import (
	"microservices-wallet-core/adapters/driving/http/handlers"
	clientHandler "microservices-wallet-core/adapters/driving/http/handlers/client"
	"microservices-wallet-core/adapters/driving/http/routes"
	"microservices-wallet-core/adapters/driving/http/routesConstants"

	"github.com/gin-gonic/gin"
)

const (
	GetClientByIdConst = "getClientById"
)

type ClientRoutes struct {
	*gin.Engine
	clientHandlers map[string]handlers.HandlerInterface
}

func NewClientRoutes(
	app *gin.Engine,
) routes.RoutesInterface {
	return &ClientRoutes{
		app,
		createMapOfClientHandlers(),
	}
}

func createMapOfClientHandlers() map[string]handlers.HandlerInterface {
	return map[string]handlers.HandlerInterface{
		GetClientByIdConst: clientHandler.NewGetClientByIdHandler(),
	}
}

func (clientRoutes *ClientRoutes) Register() {
	clientRoutes.GET(
		routesConstants.GetClientRouteConst,
		clientRoutes.clientHandlers[GetClientByIdConst].Handle,
	)
}
