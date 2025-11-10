package infraDataSchema

import (
	"database/sql"
)

type Database struct {
	Connection     *sql.DB
	connectionType string
}

func NewDatabase(connectionType string) (*Database, error) {
	database := &Database{
		connectionType: connectionType,
	}

	if err := database.Init(); err != nil {
		return nil, err
	}

	return database, nil
}

func (database *Database) Init() error {
	databaseFactory := NewDatabaseFactory(database.connectionType)

	connection, err := databaseFactory.MakeInstance()

	if err != nil {
		return err
	}

	database.Connection = connection.GetConnection()

	return nil
}
