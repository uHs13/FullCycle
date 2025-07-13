package useCaseTransaction_test

import (
	domainAccount "microservices-wallet-core/core/domain/account"
	domainClient "microservices-wallet-core/core/domain/client"
	useCaseTransaction "microservices-wallet-core/core/useCase/transaction"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	persistenceAccount "microservices-wallet-core/infra/persistence/account"
	persistenceTransaction "microservices-wallet-core/infra/persistence/transaction"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyCreateATransaction(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)
	assert.Nil(t, err)

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	transactionPersistenceMemory := persistenceTransaction.NewTransactionPersistenceMemory(dataSchema)
	accountPersistenceMemory := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	accountPersistenceMemory.DefineWithBalance(true)

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      13,
	}

	useCase := useCaseTransaction.NewCreateTransactionUseCase(transactionPersistenceMemory, accountPersistenceMemory)

	output, err := useCase.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
}

func TestShouldThrowAnExceptionWhenAccountFromIsNotFound(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)
	assert.Nil(t, err)

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	transactionPersistenceMemory := persistenceTransaction.NewTransactionPersistenceMemory(dataSchema)
	accountPersistenceMemory := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	accountPersistenceMemory.DefineForceError(true)

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      13,
	}

	useCase := useCaseTransaction.NewCreateTransactionUseCase(transactionPersistenceMemory, accountPersistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "account was not found")
	assert.Nil(t, output)
}

func TestShouldThrowAnExceptionWhenAccountToIsNotFound(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)
	assert.Nil(t, err)

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	transactionPersistenceMemory := persistenceTransaction.NewTransactionPersistenceMemory(dataSchema)
	accountPersistenceMemory := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	accountPersistenceMemory.DefineForceError(true)

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      13,
	}

	useCase := useCaseTransaction.NewCreateTransactionUseCase(transactionPersistenceMemory, accountPersistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "account was not found")
	assert.Nil(t, output)
}

func TestShouldThrowAnExceptionWhenAmountIsZero(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)
	assert.Nil(t, err)

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	transactionPersistenceMemory := persistenceTransaction.NewTransactionPersistenceMemory(dataSchema)
	accountPersistenceMemory := persistenceAccount.NewAccountPersistenceMemory(dataSchema)

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      0,
	}

	useCase := useCaseTransaction.NewCreateTransactionUseCase(transactionPersistenceMemory, accountPersistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the transaction amount must be greater than zero")
	assert.Nil(t, output)
}

func TestShouldThrowAnExceptionWhenAmountIsLowerThanZero(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)
	assert.Nil(t, err)

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	transactionPersistenceMemory := persistenceTransaction.NewTransactionPersistenceMemory(dataSchema)
	accountPersistenceMemory := persistenceAccount.NewAccountPersistenceMemory(dataSchema)

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      -10,
	}

	useCase := useCaseTransaction.NewCreateTransactionUseCase(transactionPersistenceMemory, accountPersistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the transaction amount must be greater than zero")
	assert.Nil(t, output)
}

func TestShouldThrowAnExceptionWhenThereIsNotEnoughBalaceToCompleteTheTransaction(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)
	assert.Nil(t, err)

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	transactionPersistenceMemory := persistenceTransaction.NewTransactionPersistenceMemory(dataSchema)
	accountPersistenceMemory := persistenceAccount.NewAccountPersistenceMemory(dataSchema)

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      13,
	}

	useCase := useCaseTransaction.NewCreateTransactionUseCase(transactionPersistenceMemory, accountPersistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "there are no sufficient funds to debit")
	assert.Nil(t, output)
}

func TestShouldThrowAnErrorWhenWasNotPossibleToCreateTheTransaction(t *testing.T) {
	clientFrom, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountFrom, err := domainAccount.NewAccount(clientFrom)
	assert.Nil(t, err)

	clientTo, err := domainClient.NewClient("John Cena", "john.cena@email.com")
	assert.Nil(t, err)

	accountTo, err := domainAccount.NewAccount(clientTo)
	assert.Nil(t, err)

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	transactionPersistenceMemory := persistenceTransaction.NewTransactionPersistenceMemory(dataSchema)
	transactionPersistenceMemory.DefineForceError(true)
	accountPersistenceMemory := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	accountPersistenceMemory.DefineWithBalance(true)

	input := useCaseTransaction.CreateTransactionUseCaseInput{
		AccountFrom: accountFrom,
		AccountTo:   accountTo,
		Amount:      13,
	}

	useCase := useCaseTransaction.NewCreateTransactionUseCase(transactionPersistenceMemory, accountPersistenceMemory)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "was not possible to create the transaction")
	assert.Nil(t, output)
}
