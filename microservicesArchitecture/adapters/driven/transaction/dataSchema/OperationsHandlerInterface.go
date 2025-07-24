package drivenAdapterTransactionDataSchema

type OperationsHandlerInterface interface {
	Create(transaction TransactionDto) error
}
