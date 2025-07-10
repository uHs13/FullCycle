package persistenceClient

import (
	"errors"
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

const (
	mockErrorMessage = "generic error"
)

type ClientPersistenceMemory struct {
	DataSchema infraDataSchema.DataSchemaInterfaceInterface
	forceError bool
}

func NewClientPersistenceMemory(dataSchema infraDataSchema.DataSchemaInterfaceInterface) *ClientPersistenceMemory {
	return &ClientPersistenceMemory{
		DataSchema: dataSchema,
	}
}

func (persistence *ClientPersistenceMemory) FindById(uuid valueObject.UuidValueObject) (*domainClient.Client, error) {
	if persistence.forceError {
		return nil, errors.New(mockErrorMessage)
	}

	mockClient, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	if err != nil {
		return nil, err
	}

	return mockClient, nil
}

func (persistence *ClientPersistenceMemory) Create(client *domainClient.Client) error {
	if persistence.forceError {
		return errors.New(mockErrorMessage)
	}

	return nil
}

func (persistence *ClientPersistenceMemory) DefineForceError(value bool) {
	persistence.forceError = value
}
