package persistenceClient

import (
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

type ClientPersistenceMemory struct {
	DataSchema infraDataSchema.DataSchemaInterfaceInterface
}

func NewClientPersistenceMemory(dataSchema infraDataSchema.DataSchemaInterfaceInterface) *ClientPersistenceMemory {
	return &ClientPersistenceMemory{
		DataSchema: dataSchema,
	}
}

func (persistence *ClientPersistenceMemory) FindById(uuid valueObject.UuidValueObject) (*domainClient.Client, error) {
	return nil, nil
}

func (persistence *ClientPersistenceMemory) Create(client *domainClient.Client) error {
	return nil
}
