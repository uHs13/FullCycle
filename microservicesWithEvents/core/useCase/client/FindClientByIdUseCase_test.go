package useCaseClient_test

import (
	persistenceClient "microservices-wallet-core/adapters/driven/client"
	useCaseClient "microservices-wallet-core/core/useCase/client"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyFindAClientById(t *testing.T) {
	id := "2d16a920-4887-4f82-b268-34548d75b2ea"

	input := useCaseClient.FindClientByIdUseCaseInput{
		Id: id,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistenceMemory := persistenceClient.NewClientPersistenceMemory(dataSchema)
	persistenceMemory.DefineUseUuid(true)

	useCase := useCaseClient.NewFindClientByIdUseCase(persistenceMemory)

	output, err := useCase.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.Equal(t, output.Id, id)
	assert.NotNil(t, output.Name)
	assert.NotNil(t, output.Email)
	assert.NotNil(t, output.CreatedAt)
}

func TestShouldThrowAnErrorWhenTryToFindAClientByIdUsingInvalidUuid(t *testing.T) {
	id := "2d16a920-4887-4f82-b268-34548"

	input := useCaseClient.FindClientByIdUseCaseInput{
		Id: id,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistenceMemory := persistenceClient.NewClientPersistenceMemory(dataSchema)

	useCase := useCaseClient.NewFindClientByIdUseCase(persistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "invalid uuid")
	assert.Nil(t, output)
}

func TestShouldThrowAnErrorWhenClientWasNotFound(t *testing.T) {
	id := "2d16a920-4887-4f82-b268-34548d75b2ea"

	input := useCaseClient.FindClientByIdUseCaseInput{
		Id: id,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistenceMemory := persistenceClient.NewClientPersistenceMemory(dataSchema)
	persistenceMemory.DefineForceError(true)

	useCase := useCaseClient.NewFindClientByIdUseCase(persistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "was not possible to find the client")
	assert.Nil(t, output)
}
