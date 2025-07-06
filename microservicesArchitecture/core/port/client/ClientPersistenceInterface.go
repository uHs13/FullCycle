package portClient

import (
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
)

type ClientPersistenceInterface interface {
	FindById(uuid valueObject.UuidValueObject) (*domainClient.Client, error)
	Create(client *domainClient.Client) error
}
