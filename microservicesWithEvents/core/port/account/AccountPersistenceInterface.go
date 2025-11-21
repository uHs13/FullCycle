package portAccount

import (
	domainAccount "microservices-wallet-core/core/domain/account"
	"microservices-wallet-core/core/domain/valueObject"
)

type AccountPersistenceInterface interface {
	FindById(uuid valueObject.UuidValueObject) (*domainAccount.Account, error)
	Create(account *domainAccount.Account) error
	AlreadyExistForClient(account *domainAccount.Account) (bool, error)
	Deposit(account *domainAccount.Account) error
}
