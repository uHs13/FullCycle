package account

import (
	"microservices-wallet-core/adapters/driving/http/handlers"
	accountHandler "microservices-wallet-core/adapters/driving/http/handlers/account"
	"microservices-wallet-core/adapters/driving/http/routes"
	"microservices-wallet-core/adapters/driving/http/routesConstants"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	"github.com/gin-gonic/gin"
)

const (
	CreateAccountConst    = "createAccount"
	DepositInAccountConst = "depositInAccount"
)

type AccountRoutes struct {
	*gin.Engine
	accountHandlers map[string]handlers.HandlerInterface
}

func NewAccountRoutes(
	app *gin.Engine,
	database *infraDataSchema.Database,
) routes.RoutesInterface {
	return &AccountRoutes{
		app,
		createMapOfAccountHandlers(database),
	}
}

func createMapOfAccountHandlers(database *infraDataSchema.Database) map[string]handlers.HandlerInterface {
	return map[string]handlers.HandlerInterface{
		CreateAccountConst:    accountHandler.NewCreateAccountHandler(database),
		DepositInAccountConst: accountHandler.NewDepositInAccountHandler(database),
	}
}

func (accountRoutes *AccountRoutes) Register() {
	accountRoutes.POST(
		routesConstants.CreateAccountRouteConst,
		accountRoutes.accountHandlers[CreateAccountConst].Handle,
	)

	accountRoutes.POST(
		routesConstants.DepositInAccountRouteConst,
		accountRoutes.accountHandlers[DepositInAccountConst].Handle,
	)
}
