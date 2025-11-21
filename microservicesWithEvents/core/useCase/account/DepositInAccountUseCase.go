package useCaseAccount

import (
	"errors"
	"microservices-wallet-core/core/domain/valueObject"
	portAccount "microservices-wallet-core/core/port/account"
	"time"
)

const (
	depositErrorMessage         = "it was not possible to deposit in the account"
	notFoundAccountErrorMessage = "it was not possible to find the account"
)

type DepositInAccountUseCaseInput struct {
	Id     string
	Amount float64
}

type DepositInAccountUseCaseOutput struct {
	Id            string
	DepositAmount float64
	DateTime      time.Time
}

type DepositInAccountUseCase struct {
	persistence portAccount.AccountPersistenceInterface
}

func NewDepositInAccountUseCase(
	persistence portAccount.AccountPersistenceInterface,
) *DepositInAccountUseCase {
	return &DepositInAccountUseCase{
		persistence: persistence,
	}
}

func (useCase DepositInAccountUseCase) Execute(
	input DepositInAccountUseCaseInput,
) (*DepositInAccountUseCaseOutput, error) {
	uuid, err := valueObject.MakeFromString(input.Id)

	if err != nil {
		return nil, err
	}

	account, err := useCase.persistence.FindById(*uuid)

	if err != nil {
		return nil, errors.New(notFoundAccountErrorMessage)
	}

	err = account.Credit(input.Amount)

	if err != nil {
		return nil, err
	}

	err = useCase.persistence.Deposit(account)

	if err != nil {
		return nil, errors.New(depositErrorMessage)
	}

	output := &DepositInAccountUseCaseOutput{
		Id:            account.Id.GetValue(),
		DepositAmount: input.Amount,
		DateTime:      account.UpdatedAt,
	}

	return output, nil
}
