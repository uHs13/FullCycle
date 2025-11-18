package useCaseClient

import (
	"errors"
	"fmt"
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
	portClient "microservices-wallet-core/core/port/client"
	"time"
)

const (
	notPossibleToFindClientErrorMessage = "was not possible to find the client"
)

type FindClientByIdUseCaseInput struct {
	Id string
}

type FindClientByIdUseCaseOutput struct {
	Id        string
	Name      string
	Email     string
	CreatedAt time.Time
}

type FindClientByIdUseCase struct {
	persistence portClient.ClientPersistenceInterface
}

func NewFindClientByIdUseCase(persistence portClient.ClientPersistenceInterface) *FindClientByIdUseCase {
	return &FindClientByIdUseCase{
		persistence: persistence,
	}
}

func (useCase *FindClientByIdUseCase) Execute(input FindClientByIdUseCaseInput) (*FindClientByIdUseCaseOutput, error) {
	var client *domainClient.Client

	uuid, err := valueObject.MakeFromString(input.Id)

	if err != nil {
		return nil, err
	}

	client, err = useCase.persistence.FindById(*uuid)

	if err != nil {
		fmt.Println("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB")
		fmt.Println(err.Error())
		return nil, errors.New(notPossibleToFindClientErrorMessage)
	}

	return &FindClientByIdUseCaseOutput{
		Id:        client.Id.GetValue(),
		Name:      client.Name,
		Email:     client.Email,
		CreatedAt: client.CreatedAt,
	}, nil
}
