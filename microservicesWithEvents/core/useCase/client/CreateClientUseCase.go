package useCaseClient

import (
	"errors"
	"fmt"
	domainClient "microservices-wallet-core/core/domain/client"
	portClient "microservices-wallet-core/core/port/client"
	"os"
	"time"
)

const (
	notPossibleToCreateClientErrorMessage = "was not possible to create the client"
)

type CreateClientUseCaseInput struct {
	Name  string
	Email string
}

type CreateClientUseCaseOutput struct {
	Id        string
	Name      string
	Email     string
	CreatedAt time.Time
}

type CreateClientUseCase struct {
	persistence portClient.ClientPersistenceInterface
}

func NewCreateClientUseCase(
	persistence portClient.ClientPersistenceInterface,
) *CreateClientUseCase {
	return &CreateClientUseCase{
		persistence: persistence,
	}
}

func (useCase *CreateClientUseCase) Execute(input CreateClientUseCaseInput) (*CreateClientUseCaseOutput, error) {
	client, err := domainClient.NewClient(input.Name, input.Email)

	if err != nil {
		return nil, err
	}

	if err := useCase.persistence.Create(client); err != nil {
		fmt.Println(err.Error())
		os.Exit(1)
		return nil, errors.New(notPossibleToCreateClientErrorMessage)
	}

	return &CreateClientUseCaseOutput{
		Id:        client.Id.GetValue(),
		Name:      client.Name,
		Email:     client.Email,
		CreatedAt: client.CreatedAt,
	}, nil
}
