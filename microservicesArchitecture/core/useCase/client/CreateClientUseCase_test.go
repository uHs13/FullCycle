package useCaseClient_test

import (
	useCaseClient "microservices-wallet-core/core/useCase/client"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	persistenceClient "microservices-wallet-core/infra/persistence/client"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyCreateAnClient(t *testing.T) {
	clientName := "John Cena"
	clientEmail := "john.cena@mail.com"

	input := useCaseClient.CreateClientUseCaseInput{
		Name:  clientName,
		Email: clientEmail,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistenceMemory := persistenceClient.NewClientPersistenceMemory(dataSchema)

	useCase := useCaseClient.NewCreateClientUseCase(persistenceMemory)

	output, err := useCase.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotNil(t, output.Id)
	assert.Equal(t, output.Name, clientName)
	assert.Equal(t, output.Email, clientEmail)
	assert.NotNil(t, output.CreatedAt)
}

func TestShouldThrowAnErrorWhenTryToCreateAnClientWithInvalidName(t *testing.T) {
	clientName := ""
	clientEmail := "john.cena@mail.com"

	input := useCaseClient.CreateClientUseCaseInput{
		Name:  clientName,
		Email: clientEmail,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistenceMemory := persistenceClient.NewClientPersistenceMemory(dataSchema)

	useCase := useCaseClient.NewCreateClientUseCase(persistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, err.Error(), "the name must contain at least one letter")
}

func TestShouldThrowAnErrorWhenTryToCreateAnClientWithInvalidEmail(t *testing.T) {
	clientName := "John Cena"
	clientEmail := ""

	input := useCaseClient.CreateClientUseCaseInput{
		Name:  clientName,
		Email: clientEmail,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistenceMemory := persistenceClient.NewClientPersistenceMemory(dataSchema)

	useCase := useCaseClient.NewCreateClientUseCase(persistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, err.Error(), "the email must contain at least one letter")
}
