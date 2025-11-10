package domainAccount_test

import (
	domainAccount "microservices-wallet-core/core/domain/account"
	domainClient "microservices-wallet-core/core/domain/client"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyCreateAnAccount(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	balance := 0.0
	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)
	assert.Equal(t, account.Balance, balance)
	assert.NotNil(t, account.CreatedAt)
}

func TestShouldThrowAnErrorWhenClientNameIsNotValid(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	client.Name = ""

	_, err = domainAccount.NewAccount(client)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the name must contain at least one letter")
}

func TestShouldThrowAnErrorWhenClientEmailIsNotValid(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	client.Email = ""

	_, err = domainAccount.NewAccount(client)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the email must contain at least one letter")
}

func TestShouldThrowAnErrorWhenClientIsNil(t *testing.T) {
	_, err := domainAccount.NewAccount(nil)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the account client must be valid")
}

func TestShouldProperlyCreditTheAccountBalance(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)

	err = account.Credit(13.0)

	assert.Nil(t, err)
	assert.Equal(t, account.Balance, 13.0)
	assert.NotNil(t, account.UpdatedAt)
}

func TestShouldThrowAnErrorWhenTheCreditAmountIsLowerThanZero(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)

	err = account.Credit(-13.0)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the credit amount must be greater than zero")
}

func TestShouldThrowAnErrorWhenTheCreditAmountIsZero(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)

	err = account.Credit(0.0)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the credit amount must be greater than zero")
}

func TestShouldProperlyDebitTheAccountBalance(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)

	err = account.Credit(13.0)

	assert.Nil(t, err)
	assert.NotNil(t, account.UpdatedAt)

	err = account.Debit(5.0)

	assert.Nil(t, err)
	assert.NotNil(t, account.UpdatedAt)
	assert.Equal(t, account.Balance, 8.0)
}

func TestShouldThrowAnErrorWhenTheDebitAmountIsLowerThanZero(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)

	err = account.Debit(-13.0)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the debit amount must be greater than zero")
}

func TestShouldThrowAnErrorWhenTheDebitAmountIsZero(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)

	err = account.Debit(0.0)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the debit amount must be greater than zero")
}

func TestShouldThrowAnErrorWhenThereAreNoFundsToDebit(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	account, err := domainAccount.NewAccount(client)

	assert.Nil(t, err)
	assert.NotNil(t, account)

	err = account.Debit(13)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "there are no sufficient funds to debit")
}
