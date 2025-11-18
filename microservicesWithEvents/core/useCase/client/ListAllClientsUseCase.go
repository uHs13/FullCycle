package useCaseClient

import (
	"errors"
	domainClient "microservices-wallet-core/core/domain/client"
	portClient "microservices-wallet-core/core/port/client"
)

type ListAllClientsUseCaseOutput struct {
	Clients []map[string]string
}

type ListAllClientsUseCase struct {
	persistence portClient.ClientPersistenceInterface
}

func NewListAllClientsUseCase(persistence portClient.ClientPersistenceInterface) *ListAllClientsUseCase {
	return &ListAllClientsUseCase{
		persistence: persistence,
	}
}

func (useCase *ListAllClientsUseCase) Execute() (*ListAllClientsUseCaseOutput, error) {
	var clients []domainClient.Client
	var clientsOutput []map[string]string

	clients, err := useCase.persistence.ListAll()

	if err != nil {
		return nil, errors.New(notPossibleToFindClientErrorMessage)
	}

	for _, client := range clients {
		clientsOutput = append(clientsOutput, map[string]string{
			"id":    client.Id.GetValue(),
			"name":  client.Name,
			"email": client.Email,
		})
	}

	return &ListAllClientsUseCaseOutput{
		Clients: clientsOutput,
	}, nil
}
