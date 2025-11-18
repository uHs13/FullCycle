package drivenAdapterClientDataSchema

import (
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	_ "github.com/mattn/go-sqlite3"
)

const (
	sqliteConst   = "sqlite3"
	findByIdQuery = "SELECT id, name, email FROM client WHERE id = ?"
	createQuery   = "INSERT INTO client (id, name, email) VALUES (?, ?, ?)"
)

type ClientPersistenceSqlite struct {
	Database *infraDataSchema.Database
}

func NewClientPersistenceSqlite(database *infraDataSchema.Database) (*ClientPersistenceSqlite, error) {
	if database == nil {
		database, err := infraDataSchema.NewDatabase(sqliteConst)

		if err != nil {
			return nil, err
		}

		return &ClientPersistenceSqlite{
			Database: database,
		}, nil
	}

	return &ClientPersistenceSqlite{
		Database: database,
	}, nil
}

func (persistence *ClientPersistenceSqlite) FindById(uuid string) (ClientDto, error) {
	var clientDto ClientDto

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

func (persistence *ClientPersistenceSqlite) Create(client ClientDto) error {
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
