package useCaseAccount

import (
	"errors"
	domainAccount "microservices-wallet-core/core/domain/account"
	domainClient "microservices-wallet-core/core/domain/client"
	portAccount "microservices-wallet-core/core/port/account"
	portClient "microservices-wallet-core/core/port/client"
	"time"
)

const (
	invalidClientErrorMessage              = "the account client must be valid"
	notFoundClientErrorMessage             = "the account client was not found"
	notPossibleToCreateAccountErrorMessage = "was not possible to create the account"
)

type CreateAccountUseCaseInput struct {
	Client *domainClient.Client
}

type CreateAccountUseCaseOutput struct {
	Id        string
	CreatedAt time.Time
}

type CreateAccountUseCase struct {
	persistence       portAccount.AccountPersistenceInterface
	clientPersistence portClient.ClientPersistenceInterface
}

func NewCreateAccountUseCase(
	persistence portAccount.AccountPersistenceInterface,
	clientPersistence portClient.ClientPersistenceInterface,
) *CreateAccountUseCase {
	return &CreateAccountUseCase{
		persistence:       persistence,
		clientPersistence: clientPersistence,
	}
}

func (useCase *CreateAccountUseCase) Execute(input CreateAccountUseCaseInput) (*CreateAccountUseCaseOutput, error) {
	if input.Client == nil {
		return nil, errors.New(invalidClientErrorMessage)
	}

	client, err := useCase.clientPersistence.FindById(input.Client.Id)

	if err != nil {
		return nil, errors.New(notFoundClientErrorMessage)
	}

	account, err := domainAccount.NewAccount(client)

	if err != nil {
		return nil, err
	}

	if err := useCase.persistence.Create(account); err != nil {
		return nil, errors.New(notPossibleToCreateAccountErrorMessage)
	}

	return &CreateAccountUseCaseOutput{
		Id:        account.Id.GetValue(),
		CreatedAt: account.CreatedAt,
	}, nil
}
