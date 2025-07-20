package drivenAdapterClientDataSchema

import infraDataSchema "microservices-wallet-core/infra/dataSchema"

const (
	findByIdQuery = "SELECT id, name, email, created_at FROM client WHERE id = ?"
	createQuery   = "INSERT INTO client (id, name, email, created_at) VALUES (?, ?, ?, ?)"
)

type ClientPersistenceSqlite struct {
	database infraDataSchema.Database
}

func NewClientPersistenceSqlite() (*ClientPersistenceSqlite, error) {
	database, err := infraDataSchema.NewDatabase("sqlite")

	if err != nil {
		return nil, err
	}

	return &ClientPersistenceSqlite{
		database: *database,
	}, nil
}

func (persistence *ClientPersistenceSqlite) FindById(uuid string) (ClientDto, error) {
	var clientDto ClientDto

	statement, err := persistence.database.Connection.Prepare(findByIdQuery)

	if err != nil {
		return clientDto, err
	}

	err = statement.QueryRow(uuid).Scan(
		&clientDto.Id,
		&clientDto.Name,
		&clientDto.Email,
		&clientDto.CreatedAt,
	)

	defer statement.Close()

	if err != nil {
		return clientDto, err
	}

	return clientDto, nil
}

func (persistence *ClientPersistenceSqlite) Create(client ClientDto) error {
	statement, err := persistence.database.Connection.Prepare(createQuery)

	if err != nil {
		return err
	}

	_, err = statement.Exec(
		client.Id,
		client.Name,
		client.Email,
		client.CreatedAt,
	)

	defer statement.Close()

	if err != nil {
		return err
	}

	return nil
}
