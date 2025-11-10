package useCaseAccount_test

import (
	persistenceAccount "microservices-wallet-core/adapters/driven/account"
	persistenceClient "microservices-wallet-core/adapters/driven/client"
	domainClient "microservices-wallet-core/core/domain/client"
	useCaseAccount "microservices-wallet-core/core/useCase/account"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyCreateAnAccount(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	input := useCaseAccount.CreateAccountUseCaseInput{
		Client: client,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	clientPersistence := persistenceClient.NewClientPersistenceMemory(dataSchema)
	useCase := useCaseAccount.NewCreateAccountUseCase(persistence, clientPersistence)
	output, err := useCase.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotNil(t, output.Id)
	assert.NotNil(t, output.CreatedAt)
}

func TestShouldThrowAnErrorWhenTryToCreateAnAccountWithNilClient(t *testing.T) {
	input := useCaseAccount.CreateAccountUseCaseInput{
		Client: nil,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	clientPersistence := persistenceClient.NewClientPersistenceMemory(dataSchema)
	useCase := useCaseAccount.NewCreateAccountUseCase(persistence, clientPersistence)
	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the account client must be valid")
	assert.Nil(t, output)
}

func TestShouldThrowAnErrorWhenClientWasNotFound(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	input := useCaseAccount.CreateAccountUseCaseInput{
		Client: client,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	clientPersistence := persistenceClient.NewClientPersistenceMemory(dataSchema)
	clientPersistence.DefineForceError(true)

	useCase := useCaseAccount.NewCreateAccountUseCase(persistence, clientPersistence)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the account client was not found")
	assert.Nil(t, output)
}

func TestShouldThrowAnErrorWhenWasNotPossibleToCreateTheAccount(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	input := useCaseAccount.CreateAccountUseCaseInput{
		Client: client,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	persistence.DefineForceError(true)
	clientPersistence := persistenceClient.NewClientPersistenceMemory(dataSchema)

	useCase := useCaseAccount.NewCreateAccountUseCase(persistence, clientPersistence)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "was not possible to create the account")
	assert.Nil(t, output)
}
