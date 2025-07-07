package useCaseAccount_test

import (
	domainClient "microservices-wallet-core/core/domain/client"
	useCaseAccount "microservices-wallet-core/core/useCase/account"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	persistenceAccount "microservices-wallet-core/infra/persistence/account"
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
	useCase := useCaseAccount.NewCreateAccountUseCase(persistence)
	output, err := useCase.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.NotNil(t, output.Id)
	assert.NotNil(t, output.CreatedAt)
}
