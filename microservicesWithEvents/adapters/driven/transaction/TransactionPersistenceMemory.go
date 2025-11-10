package persistenceTransaction

import (
	"errors"
	domainTransaction "microservices-wallet-core/core/domain/transaction"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

const (
	mockErrorMessage = "generic error"
)

type TransactionPersistenceMemory struct {
	dataSchema infraDataSchema.DataSchemaInterfaceInterface
	forceError bool
}

func NewTransactionPersistenceMemory(dataSchema infraDataSchema.DataSchemaInterfaceInterface) *TransactionPersistenceMemory {
	return &TransactionPersistenceMemory{
		dataSchema: dataSchema,
	}
}

func (persistence *TransactionPersistenceMemory) Create(transaction domainTransaction.Transaction) error {
	if persistence.forceError {
		return errors.New(mockErrorMessage)
	}

	return nil
}

func (persistence *TransactionPersistenceMemory) DefineForceError(value bool) {
	persistence.forceError = value
}
