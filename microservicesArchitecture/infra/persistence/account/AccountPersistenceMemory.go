package persistenceAccount

import (
	"errors"
	domainAccount "microservices-wallet-core/core/domain/account"
	"microservices-wallet-core/core/domain/valueObject"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

const (
	mockErrorMessage = "generic error"
)

type AccountPersistenceMemory struct {
	DataSchema infraDataSchema.DataSchemaInterfaceInterface
	forceError bool
}

func NewAccountPersistenceMemory(dataSchema infraDataSchema.DataSchemaInterfaceInterface) *AccountPersistenceMemory {
	return &AccountPersistenceMemory{
		DataSchema: dataSchema,
	}
}

func (persistence *AccountPersistenceMemory) FindById(uuid valueObject.UuidValueObject) (*domainAccount.Account, error) {
	if persistence.forceError {
		return nil, nil
	}

	return nil, nil
}

func (persistence *AccountPersistenceMemory) Create(account *domainAccount.Account) error {
	if persistence.forceError {
		return errors.New(mockErrorMessage)
	}

	return nil
}

func (persistence *AccountPersistenceMemory) DefineForceError(value bool) {
	persistence.forceError = value
}
