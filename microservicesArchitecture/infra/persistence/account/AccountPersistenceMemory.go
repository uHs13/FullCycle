package persistenceAccount

import (
	domainAccount "microservices-wallet-core/core/domain/account"
	"microservices-wallet-core/core/domain/valueObject"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

type AccountPersistenceMemory struct {
	DataSchema infraDataSchema.DataSchemaInterfaceInterface
}

func NewAccountPersistenceMemory(dataSchema infraDataSchema.DataSchemaInterfaceInterface) *AccountPersistenceMemory {
	return &AccountPersistenceMemory{
		DataSchema: dataSchema,
	}
}

func (persistence *AccountPersistenceMemory) FindById(uuid valueObject.UuidValueObject) (*domainAccount.Account, error) {
	return nil, nil
}

func (persistence *AccountPersistenceMemory) Create(account *domainAccount.Account) error {
	return nil
}
