package drivenAdapterClient

import (
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	domainClient "microservices-wallet-core/core/domain/client"
	"microservices-wallet-core/core/domain/valueObject"
)

type ClientPersistence struct {
	operationsHandler drivenAdapterClientDataSchema.OperationsHandlerInterface
}

func NewClientPersistence(operationsHandler drivenAdapterClientDataSchema.OperationsHandlerInterface) *ClientPersistence {
	return &ClientPersistence{
		operationsHandler: operationsHandler,
	}
}

func (clientPersistence *ClientPersistence) FindById(uuid valueObject.UuidValueObject) (*domainClient.Client, error) {
	clientDto, err := clientPersistence.operationsHandler.FindById(uuid.GetValue())

	if err != nil {
		return nil, err
	}

	client, err := domainClient.NewClient(clientDto.Name, clientDto.Email)

	if err != nil {
		return nil, err
	}

	newUuid, err := valueObject.MakeFromString(clientDto.Id)

	if err != nil {
		return nil, err
	}

	client.DefineId(*newUuid)

	return client, nil
}

func (clientPersistence *ClientPersistence) Create(client *domainClient.Client) error {
	clientDto := drivenAdapterClientDataSchema.NewClientDto()

	clientDto.Id = client.Id.GetValue()
	clientDto.Name = client.Name
	clientDto.Email = client.Email

	if err := clientPersistence.operationsHandler.Create(*clientDto); err != nil {
		return err
	}

	return nil
}

func (clientPersistence *ClientPersistence) ListAll() ([]domainClient.Client, error) {
	var clients []domainClient.Client

	clientsDto, err := clientPersistence.operationsHandler.ListAll()

	if err != nil {
		return nil, err
	}

	for _, clientDto := range clientsDto {
		client, err := domainClient.NewClient(clientDto.Name, clientDto.Email)

		if err != nil {
			return nil, err
		}

		newUuid, err := valueObject.MakeFromString(clientDto.Id)

		if err != nil {
			return nil, err
		}

		client.DefineId(*newUuid)

		clients = append(clients, *client)
	}

	return clients, nil
}
