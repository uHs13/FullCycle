package database

import (
	"database/sql"
	"fmt"
	"os"
)

const (
	mysqlDriverName = "mysql"
	userConst       = "DB_USERNAME"
	schemaConst     = "DB_DATABASE"
	passwordConst   = "DB_PASSWORD"
	hostConst       = "DB_HOST"
	portConst       = "DB_PORT"
)

type MysqlDatabaseConnection struct {
	connection *sql.DB
}

func NewMysqlDatabaseConnection() *MysqlDatabaseConnection {
	connection := &MysqlDatabaseConnection{}
	connection.OpenConnection()

	return connection
}

func (mysqlDatabaseConnection *MysqlDatabaseConnection) OpenConnection() error {
	connectionString := mysqlDatabaseConnection.createConnectionString()

	connection, err := sql.Open(mysqlDriverName, connectionString)

	if err != nil {
		return err
	}

	mysqlDatabaseConnection.connection = connection

	return nil
}

func (mysqlDatabaseConnection *MysqlDatabaseConnection) createConnectionString() string {
	user := os.Getenv(userConst)
	password := os.Getenv(passwordConst)
	host := os.Getenv(hostConst)
	port := os.Getenv(portConst)
	schema := os.Getenv(schemaConst)

	return fmt.Sprintf(
		"%s:%s@tcp(%s:%s)/%s",
		user,
		password,
		host,
		port,
		schema,
	)
}

func (mysqlDatabaseConnection *MysqlDatabaseConnection) GetConnection() *sql.DB {
	return mysqlDatabaseConnection.connection
}
