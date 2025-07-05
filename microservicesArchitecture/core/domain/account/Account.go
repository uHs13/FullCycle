package domainAccount

import (
	"errors"
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
	"time"
)

const (
	invalidBalanceErrorMessage      = "the account balance cannot be lower than zero"
	invalidClientErrorMessage       = "the account client must be valid"
	invalidCreditAmountErrorMessage = "the credit amount must be greater than zero"
	invalidDebitAmountErrorMessage  = "the debit amount must be greater than zero"
	insufficientFundsErrorMessage   = "there are no sufficient funds to debit"
)

type Account struct {
	Id        valueObject.UuidValueObject
	Client    *domainClient.Client
	Balance   float64
	CreatedAt time.Time
	UpdatedAt time.Time
}

func NewAccount(client *domainClient.Client) (*Account, error) {
	if client == nil {
		return nil, errors.New(invalidClientErrorMessage)
	}

	account := &Account{
		Id:        *valueObject.NewUuidValueObject(),
		Client:    client,
		Balance:   0,
		CreatedAt: time.Now(),
	}

	if err := account.Validate(); err != nil {
		return nil, err
	}

	return account, nil
}

func (account *Account) Validate() error {
	if err := account.Client.Validate(); err != nil {
		return err
	}

	if account.Balance < 0 {
		return errors.New(invalidBalanceErrorMessage)
	}

	return nil
}

func (account *Account) Credit(amount float64) error {
	if amount <= 0 {
		return errors.New(invalidCreditAmountErrorMessage)
	}

	account.Balance += amount
	account.UpdatedAt = time.Now()

	return nil
}

func (account *Account) Debit(amount float64) error {
	if amount <= 0 {
		return errors.New(invalidDebitAmountErrorMessage)
	}

	if amount > account.Balance {
		return errors.New(insufficientFundsErrorMessage)
	}

	account.Balance -= amount
	account.UpdatedAt = time.Now()

	return nil
}
