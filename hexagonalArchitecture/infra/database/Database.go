package database

import (
	"database/sql"
	application "goHexagonal/application/port"
)

type Database struct {
	Connection *sql.DB
}

func NewDatabase(connectionType string) (application.DatabaseConnectionInterface, error) {
	databaseFactory := NewDatabaseFactory(connectionType)

	connection, err := databaseFactory.MakeInstance()

	if err != nil {
		return nil, err
	}

	return connection, nil
}
