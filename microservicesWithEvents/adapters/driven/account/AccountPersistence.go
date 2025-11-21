package drivenAdapterAccount

import (
	drivenAdapterAccountDataSchema "microservices-wallet-core/adapters/driven/account/dataSchema"
	domainAccount "microservices-wallet-core/core/domain/account"
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
)

type AccountPersistence struct {
	operationsHandler drivenAdapterAccountDataSchema.OperationsHandlerInterface
}

func NewAccountPersistence(operationsHandler drivenAdapterAccountDataSchema.OperationsHandlerInterface) *AccountPersistence {
	return &AccountPersistence{
		operationsHandler: operationsHandler,
	}
}

func (persistence *AccountPersistence) FindById(uuid valueObject.UuidValueObject) (*domainAccount.Account, error) {
	foundAccount, err := persistence.operationsHandler.FindById(uuid.GetValue())

	if err != nil {
		return nil, err
	}

	accountUuid, err := valueObject.MakeFromString(foundAccount.Id)

	if err != nil {
		return nil, err
	}

	clientUuid, err := valueObject.MakeFromString(foundAccount.ClientId)

	if err != nil {
		return nil, err
	}

	client := domainClient.Client{
		Id: *clientUuid,
	}

	account := &domainAccount.Account{
		Id:        *accountUuid,
		Client:    &client,
		Balance:   foundAccount.Balance,
		CreatedAt: foundAccount.CreatedAt,
	}

	return account, nil
}

func (persistence *AccountPersistence) Create(account *domainAccount.Account) error {
	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = account.Id.GetValue()
	accountDto.ClientId = account.Client.Id.GetValue()
	accountDto.Balance = account.Balance
	accountDto.CreatedAt = account.CreatedAt

	if err := persistence.operationsHandler.Create(accountDto); err != nil {
		return err
	}

	return nil
}

func (persistence *AccountPersistence) AlreadyExistForClient(account *domainAccount.Account) (bool, error) {
	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = account.Id.GetValue()
	accountDto.ClientId = account.Client.Id.GetValue()
	accountDto.Balance = account.Balance
	accountDto.CreatedAt = account.CreatedAt

	exist, err := persistence.operationsHandler.AlreadyExistForClient(accountDto)

	if err != nil {
		return false, err
	}

	return exist, nil
}

func (persistence *AccountPersistence) Deposit(account *domainAccount.Account) error {
	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = account.Id.GetValue()
	accountDto.ClientId = account.Client.Id.GetValue()
	accountDto.Balance = account.Balance

	if err := persistence.operationsHandler.Deposit(accountDto); err != nil {
		return err
	}

	return nil
}
