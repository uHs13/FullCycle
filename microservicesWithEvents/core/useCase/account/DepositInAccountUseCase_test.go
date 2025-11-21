package useCaseAccount_test

import (
	persistenceAccount "microservices-wallet-core/adapters/driven/account"
	useCaseAccount "microservices-wallet-core/core/useCase/account"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyDepositInAccount(t *testing.T) {
	id := "c5b6c35c-5435-46a7-a86c-44ac875e7811"
	amount := 13.0

	input := useCaseAccount.DepositInAccountUseCaseInput{
		Id:     id,
		Amount: amount,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	persistence.DefineSpecificUuid(true)

	useCase := useCaseAccount.NewDepositInAccountUseCase(persistence)

	output, err := useCase.Execute(input)

	assert.Nil(t, err)
	assert.NotNil(t, output)
	assert.Equal(t, output.Id, id)
	assert.Equal(t, output.Amount, amount)
	assert.NotNil(t, output.DateTime)
}

func TestShouldThrowAnErrorWhenAccountWasNotFound(t *testing.T) {
	id := "c5b6c35c-5435-46a7-a86c-44ac875e7811"
	amount := 13.0

	input := useCaseAccount.DepositInAccountUseCaseInput{
		Id:     id,
		Amount: amount,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	persistence.DefineForceError(true)

	useCase := useCaseAccount.NewDepositInAccountUseCase(persistence)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, err.Error(), "it was not possible to find the account")
}

func TestShouldThrowAnErrorWhenAmountIsZero(t *testing.T) {
	id := "c5b6c35c-5435-46a7-a86c-44ac875e7811"
	amount := 0.0

	input := useCaseAccount.DepositInAccountUseCaseInput{
		Id:     id,
		Amount: amount,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)

	useCase := useCaseAccount.NewDepositInAccountUseCase(persistence)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, err.Error(), "the credit amount must be greater than zero")
}

func TestShouldThrowAnErrorWhenAmountIsLoweThanZero(t *testing.T) {
	id := "c5b6c35c-5435-46a7-a86c-44ac875e7811"
	amount := -13.0

	input := useCaseAccount.DepositInAccountUseCaseInput{
		Id:     id,
		Amount: amount,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)

	useCase := useCaseAccount.NewDepositInAccountUseCase(persistence)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, err.Error(), "the credit amount must be greater than zero")
}

func TestShouldThrowAnErrorWhenItWasNotPossibleToDeposit(t *testing.T) {
	id := "c5b6c35c-5435-46a7-a86c-44ac875e7811"
	amount := 13.0

	input := useCaseAccount.DepositInAccountUseCaseInput{
		Id:     id,
		Amount: amount,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)
	persistence.DefineDepositError(true)

	useCase := useCaseAccount.NewDepositInAccountUseCase(persistence)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, err.Error(), "it was not possible to deposit in the account")
}

func TestShouldThrowAnErrorWhenUuidIsNotValid(t *testing.T) {
	id := "c5b6c35c-5435-46a7-a86c-44ac875e7"
	amount := 13.0

	input := useCaseAccount.DepositInAccountUseCaseInput{
		Id:     id,
		Amount: amount,
	}

	dataSchema := infraDataSchema.NewDatabaseMemorySchema()
	persistence := persistenceAccount.NewAccountPersistenceMemory(dataSchema)

	useCase := useCaseAccount.NewDepositInAccountUseCase(persistence)

	output, err := useCase.Execute(input)

	assert.NotNil(t, err)
	assert.Nil(t, output)
	assert.Equal(t, err.Error(), "invalid uuid")
}
