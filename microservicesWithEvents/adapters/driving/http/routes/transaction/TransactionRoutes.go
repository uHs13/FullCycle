package transaction

import (
	"microservices-wallet-core/adapters/driving/http/handlers"
	transactionHandler "microservices-wallet-core/adapters/driving/http/handlers/transaction"
	"microservices-wallet-core/adapters/driving/http/routes"
	"microservices-wallet-core/adapters/driving/http/routesConstants"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	"github.com/gin-gonic/gin"
)

const (
	CreateTransactionConst = "createTransaction"
)

type TransactionRoutes struct {
	*gin.Engine
	accountHandlers map[string]handlers.HandlerInterface
}

func NewTransactionRoutes(
	app *gin.Engine,
	database *infraDataSchema.Database,
) routes.RoutesInterface {
	return &TransactionRoutes{
		app,
		createMapOfTransactionHandlers(database),
	}
}

func createMapOfTransactionHandlers(database *infraDataSchema.Database) map[string]handlers.HandlerInterface {
	return map[string]handlers.HandlerInterface{
		CreateTransactionConst: transactionHandler.NewCreateTransactionHandler(database),
	}
}

func (accountRoutes *TransactionRoutes) Register() {
	accountRoutes.POST(
		routesConstants.CreateTransactionRouteConst,
		accountRoutes.accountHandlers[CreateTransactionConst].Handle,
	)
}
