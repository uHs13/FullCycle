package transaction

import (
	"microservices-wallet-core/adapters/driven/kafka"
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
	kafkaProducer   *kafka.Producer
}

func NewTransactionRoutes(
	app *gin.Engine,
	database *infraDataSchema.Database,
	kafkaProducer *kafka.Producer,
) routes.RoutesInterface {
	return &TransactionRoutes{
		app,
		createMapOfTransactionHandlers(database, kafkaProducer),
		kafkaProducer,
	}
}

func createMapOfTransactionHandlers(
	database *infraDataSchema.Database,
	kafkaProducer *kafka.Producer,
) map[string]handlers.HandlerInterface {
	return map[string]handlers.HandlerInterface{
		CreateTransactionConst: transactionHandler.NewCreateTransactionHandler(database, kafkaProducer),
	}
}

func (accountRoutes *TransactionRoutes) Register() {
	accountRoutes.POST(
		routesConstants.CreateTransactionRouteConst,
		accountRoutes.accountHandlers[CreateTransactionConst].Handle,
	)
}
