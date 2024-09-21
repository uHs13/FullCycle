package database

import "database/sql"

const (
	sqliteDriverName     = "sqlite3"
	sqliteDataSourceName = ":memory:"
)

type SqliteDatabaseConnection struct {
	connection *sql.DB
}

func NewSqliteDatabaseConnection() *SqliteDatabaseConnection {
	connection := &SqliteDatabaseConnection{}
	connection.OpenConnection()

	return connection
}

func (sqliteDatabaseConnection *SqliteDatabaseConnection) OpenConnection() error {
	sqlite, err := sql.Open(sqliteDriverName, sqliteDataSourceName)

	if err != nil {
		return err
	}

	sqliteDatabaseConnection.connection = sqlite

	return nil
}

func (sqliteDatabaseConnection *SqliteDatabaseConnection) GetConnection() *sql.DB {
	return sqliteDatabaseConnection.connection
}
