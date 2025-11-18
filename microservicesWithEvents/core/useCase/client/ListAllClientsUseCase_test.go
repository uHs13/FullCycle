package useCaseClient_test

import (
	persistenceClient "microservices-wallet-core/adapters/driven/client"
	useCaseClient "microservices-wallet-core/core/useCase/client"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyListAllClients(t *testing.T) {
	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistenceMemory := persistenceClient.NewClientPersistenceMemory(dataSchema)

	useCase := useCaseClient.NewListAllClientsUseCase(persistenceMemory)

	output, err := useCase.Execute()

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.Equal(t, len(output.Clients), 2)
}
