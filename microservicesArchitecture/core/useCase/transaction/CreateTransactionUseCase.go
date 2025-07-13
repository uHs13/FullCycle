package useCaseTransaction

import (
	"errors"
	domainAccount "microservices-wallet-core/core/domain/account"
	domainTransaction "microservices-wallet-core/core/domain/transaction"
	portAccount "microservices-wallet-core/core/port/account"
	portTransaction "microservices-wallet-core/core/port/transaction"
	"time"
)

const (
	accountNotFoundErrorMessage   = "account was not found"
	transactionCreateErrorMessage = "was not possible to create the transaction"
)

type CreateTransactionUseCaseInput struct {
	AccountFrom *domainAccount.Account
	AccountTo   *domainAccount.Account
	Amount      float64
}

type CreateTransactionUseCaseOutput struct {
	Id        string
	CreatedAt time.Time
}

type CreateTransactionUseCase struct {
	transactionPersistence portTransaction.TransactionPersistenceInterface
	accountPersistence     portAccount.AccountPersistenceInterface
}

func NewCreateTransactionUseCase(
	transactionPersistence portTransaction.TransactionPersistenceInterface,
	accountPersistence portAccount.AccountPersistenceInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		transactionPersistence: transactionPersistence,
		accountPersistence:     accountPersistence,
	}
}

func (useCase *CreateTransactionUseCase) Execute(input CreateTransactionUseCaseInput) (*CreateTransactionUseCaseOutput, error) {
	accountFrom, err := useCase.accountPersistence.FindById(input.AccountFrom.Id)

	if err != nil {
		return nil, errors.New(accountNotFoundErrorMessage)
	}

	accountTo, err := useCase.accountPersistence.FindById(input.AccountTo.Id)

	if err != nil {
		return nil, errors.New(accountNotFoundErrorMessage)
	}

	transaction, err := domainTransaction.NewTransaction(accountFrom, accountTo, input.Amount)

	if err != nil {
		return nil, err
	}

	if err := transaction.Commit(); err != nil {
		return nil, err
	}

	if err := useCase.transactionPersistence.Create(*transaction); err != nil {
		return nil, errors.New(transactionCreateErrorMessage)
	}

	return &CreateTransactionUseCaseOutput{
		Id:        transaction.Id.GetValue(),
		CreatedAt: transaction.CreatedAt,
	}, nil
}
