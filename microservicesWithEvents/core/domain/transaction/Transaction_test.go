package domainTransaction_test

import (
	domainAccount "microservices-wallet-core/core/domain/account"
	domainClient "microservices-wallet-core/core/domain/client"
	domainTransaction "microservices-wallet-core/core/domain/transaction"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldThrowAnErrorWhenAmountIsZero(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)

	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena Two", "john.cena.two@email.com")

	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)

	assert.Nil(t, err)

	transaction, err := domainTransaction.NewTransaction(accountFrom, accountTo, 0)

	assert.NotNil(t, err)
	assert.Nil(t, transaction)
	assert.Equal(t, err.Error(), "the transaction amount must be greater than zero")
}

func TestShouldThrowAnErrorWhenAmountIsLowerThanZero(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)

	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena Two", "john.cena.two@email.com")

	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)

	assert.Nil(t, err)

	transaction, err := domainTransaction.NewTransaction(accountFrom, accountTo, -13)

	assert.NotNil(t, err)
	assert.Nil(t, transaction)
	assert.Equal(t, err.Error(), "the transaction amount must be greater than zero")
}

func TestShouldProperlyCreateAnAccount(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)

	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena Two", "john.cena.two@email.com")

	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)

	assert.Nil(t, err)

	transaction, err := domainTransaction.NewTransaction(accountFrom, accountTo, 13)

	assert.Nil(t, err)
	assert.NotNil(t, transaction)
}

func TestShouldProperlyTransfetTheAmount(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	accountFrom.Credit(100.0)

	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena Two", "john.cena.two@email.com")

	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)

	assert.Nil(t, err)

	transaction, err := domainTransaction.NewTransaction(accountFrom, accountTo, 13.0)

	assert.Nil(t, err)
	assert.NotNil(t, transaction)

	err = transaction.Commit()

	assert.Nil(t, err)
	assert.Equal(t, accountFrom.Balance, 87.0)
	assert.Equal(t, accountTo.Balance, 13.0)
}

func TestShouldThrowAnErrorWhenFromAccountDoesNotHaveEnoughBalance(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	accountFrom.Credit(100.0)

	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena Two", "john.cena.two@email.com")

	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)

	assert.Nil(t, err)

	transaction, err := domainTransaction.NewTransaction(accountFrom, accountTo, 150)

	assert.Nil(t, err)
	assert.NotNil(t, transaction)

	err = transaction.Commit()

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "there are no sufficient funds to debit")
}
