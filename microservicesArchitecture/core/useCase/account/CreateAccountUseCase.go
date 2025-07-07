package useCaseAccount

import (
	domainAccount "microservices-wallet-core/core/domain/account"
	domainClient "microservices-wallet-core/core/domain/client"
	portAccount "microservices-wallet-core/core/port/account"
	"time"
)

type CreateAccountUseCaseInput struct {
	Client *domainClient.Client
}

type CreateAccountUseCaseOutput struct {
	Id        string
	CreatedAt time.Time
}

type CreateAccountUseCase struct {
	persistence portAccount.AccountPersistenceInterface
}

func NewCreateAccountUseCase(
	persistence portAccount.AccountPersistenceInterface,
) *CreateAccountUseCase {
	return &CreateAccountUseCase{
		persistence: persistence,
	}
}

func (useCase *CreateAccountUseCase) Execute(input CreateAccountUseCaseInput) (*CreateAccountUseCaseOutput, error) {
	account, err := domainAccount.NewAccount(input.Client)

	if err != nil {
		return nil, err
	}

	if err := useCase.persistence.Create(account); err != nil {
		return nil, err
	}

	return &CreateAccountUseCaseOutput{
		Id:        account.Id.GetValue(),
		CreatedAt: account.CreatedAt,
	}, nil
}
