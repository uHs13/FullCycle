package drivenAdapterTransaction

import (
	drivenAdapterTransactionDataSchema "microservices-wallet-core/adapters/driven/transaction/dataSchema"
	domainTransaction "microservices-wallet-core/core/domain/transaction"
)

type TransactionPersistence struct {
	operationsHandler drivenAdapterTransactionDataSchema.OperationsHandlerInterface
}

func NewTransactionPersistence(
	operationsHandler drivenAdapterTransactionDataSchema.OperationsHandlerInterface,
) *TransactionPersistence {
	return &TransactionPersistence{
		operationsHandler: operationsHandler,
	}
}

func (persistence *TransactionPersistence) Create(
	transaction domainTransaction.Transaction,
) error {
	transactionDto := drivenAdapterTransactionDataSchema.NewTransactionDto()
	transactionDto.Id = transaction.Id.GetValue()
	transactionDto.AccountFromId = transaction.AccountFrom.Id.GetValue()
	transactionDto.AccountToId = transaction.AccountTo.Id.GetValue()
	transactionDto.Amount = transaction.Amount

	if err := persistence.operationsHandler.Create(*transactionDto); err != nil {
		return err
	}

	return nil
}
