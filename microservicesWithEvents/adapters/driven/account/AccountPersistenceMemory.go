package drivenAdapterAccount

import (
	"errors"
	domainAccount "microservices-wallet-core/core/domain/account"
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

const (
	mockErrorMessage = "generic error"
)

type AccountPersistenceMemory struct {
	DataSchema          infraDataSchema.DataSchemaInterfaceInterface
	forceError          bool
	withBalance         bool
	accountAlreadyExist bool
	specificUuid        bool
	depositError        bool
}

func NewAccountPersistenceMemory(dataSchema infraDataSchema.DataSchemaInterfaceInterface) *AccountPersistenceMemory {
	return &AccountPersistenceMemory{
		DataSchema: dataSchema,
	}
}

func (persistence *AccountPersistenceMemory) FindById(uuid valueObject.UuidValueObject) (*domainAccount.Account, error) {
	if persistence.forceError {
		return nil, errors.New(mockErrorMessage)
	}

	mockClient, _ := domainClient.NewClient("John Cena", "john.cena@email.com")
	mockAccount, _ := domainAccount.NewAccount(mockClient)

	if persistence.withBalance {
		mockAccount.Credit(1000)
	}

	if persistence.specificUuid {
		mockAccount.Id = uuid
	}

	return mockAccount, nil
}

func (persistence *AccountPersistenceMemory) Create(account *domainAccount.Account) error {
	if persistence.forceError {
		return errors.New(mockErrorMessage)
	}

	return nil
}

func (persistence *AccountPersistenceMemory) AlreadyExistForClient(account *domainAccount.Account) (bool, error) {
	if persistence.accountAlreadyExist {
		return true, nil
	}

	return false, nil
}

func (persistence *AccountPersistenceMemory) Deposit(account *domainAccount.Account) error {
	if persistence.depositError {
		return errors.New(mockErrorMessage)
	}

	return nil
}

func (persistence *AccountPersistenceMemory) DefineForceError(value bool) {
	persistence.forceError = value
}

func (persistence *AccountPersistenceMemory) DefineWithBalance(value bool) {
	persistence.withBalance = value
}

func (persistence *AccountPersistenceMemory) DefineAccountAlreadyExist(value bool) {
	persistence.accountAlreadyExist = value
}

func (persistence *AccountPersistenceMemory) DefineSpecificUuid(value bool) {
	persistence.specificUuid = value
}

func (persistence *AccountPersistenceMemory) DefineDepositError(value bool) {
	persistence.depositError = value
}
