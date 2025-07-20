package infraDataSchema

import "database/sql"

const (
	sqliteDriverName     = "sqlite3"
	sqliteDataSourceName = ":memory:"
)

type SqliteDatabaseConnection struct {
	connection *sql.DB
}

func NewSqliteDatabaseConnection() (*SqliteDatabaseConnection, error) {
	connection := &SqliteDatabaseConnection{}

	err := connection.OpenConnection()

	if err != nil {
		return nil, err
	}

	return connection, nil
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
