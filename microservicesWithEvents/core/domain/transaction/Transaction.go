package domainTransaction

import (
	"errors"
	domainAccount "microservices-wallet-core/core/domain/account"
	"microservices-wallet-core/core/domain/valueObject"
	"time"
)

const (
	invalidAmountErrorMessage = "the transaction amount must be greater than zero"
)

type Transaction struct {
	Id          valueObject.UuidValueObject
	AccountFrom *domainAccount.Account
	AccountTo   *domainAccount.Account
	Amount      float64
	CreatedAt   time.Time
}

func NewTransaction(
	accountFrom *domainAccount.Account,
	accountTo *domainAccount.Account,
	amount float64,
) (*Transaction, error) {
	transaction := &Transaction{
		Id:          *valueObject.NewUuidValueObject(),
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      amount,
		CreatedAt:   time.Now(),
	}

	if err := transaction.validate(); err != nil {
		return nil, err
	}

	return transaction, nil
}

func (transaction *Transaction) validate() error {
	if transaction.Amount <= 0 {
		return errors.New(invalidAmountErrorMessage)
	}

	return nil
}

func (transaction *Transaction) Commit() error {
	if err := transaction.AccountFrom.Debit(transaction.Amount); err != nil {
		return err
	}

	transaction.AccountTo.Credit(transaction.Amount)

	return nil
}
