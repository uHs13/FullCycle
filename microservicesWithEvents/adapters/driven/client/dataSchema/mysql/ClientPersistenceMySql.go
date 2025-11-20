package drivenAdapterClientDataSchemaMysql

import (
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

const (
	mysqlConst    = "mysql"
	findByIdQuery = "SELECT id, name, email FROM client WHERE id = ?"
	createQuery   = "INSERT INTO client (id, name, email) VALUES (?, ?, ?)"
	listAllQuery  = "SELECT id, name, email FROM client"
)

type ClientPersistenceMysql struct {
	Database *infraDataSchema.Database
}

func NewClientPersistenceMysql(database *infraDataSchema.Database) (*ClientPersistenceMysql, error) {
	if database == nil {
		database, err := infraDataSchema.NewDatabase(mysqlConst)

		if err != nil {
			return nil, err
		}

		return &ClientPersistenceMysql{
			Database: database,
		}, nil
	}

	return &ClientPersistenceMysql{
		Database: database,
	}, nil
}

func (persistence *ClientPersistenceMysql) FindById(uuid string) (drivenAdapterClientDataSchema.ClientDto, error) {
	var clientDto drivenAdapterClientDataSchema.ClientDto

	statement, err := persistence.Database.Connection.Prepare(findByIdQuery)

	if err != nil {
		return clientDto, err
	}

	err = statement.QueryRow(uuid).Scan(
		&clientDto.Id,
		&clientDto.Name,
		&clientDto.Email,
	)

	defer statement.Close()

	if err != nil {
		return clientDto, err
	}

	return clientDto, nil
}

func (persistence *ClientPersistenceMysql) Create(client drivenAdapterClientDataSchema.ClientDto) error {
	statement, err := persistence.Database.Connection.Prepare(createQuery)

	if err != nil {
		return err
	}

	_, err = statement.Exec(
		client.Id,
		client.Name,
		client.Email,
	)

	defer statement.Close()

	if err != nil {
		return err
	}

	return nil
}

func (persistence *ClientPersistenceMysql) ListAll() ([]drivenAdapterClientDataSchema.ClientDto, error) {
	var clientsDto []drivenAdapterClientDataSchema.ClientDto
	var clientDto drivenAdapterClientDataSchema.ClientDto

	statement, err := persistence.Database.Connection.Prepare(listAllQuery)

	if err != nil {
		return clientsDto, err
	}

	rows, err := statement.Query()

	if err != nil {
		return clientsDto, err
	}

	defer rows.Close()

	for rows.Next() {
		if err := rows.Scan(&clientDto.Id, &clientDto.Name, &clientDto.Email); err != nil {
			return clientsDto, nil
		}

		clientsDto = append(clientsDto, clientDto)
	}

	return clientsDto, nil
}
