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

func NewMysqlDatabaseConnection() (*MysqlDatabaseConnection, error) {
	connection := &MysqlDatabaseConnection{}

	err := connection.OpenConnection()

	if err != nil {
		return nil, err
	}

	return connection, nil
}

func (mysqlDatabaseConnection *MysqlDatabaseConnection) OpenConnection() error {
	connectionString := mysqlDatabaseConnection.createConnectionString()

	mysql, err := sql.Open(mysqlDriverName, connectionString)

	if err != nil {
		return err
	}

	if err = mysql.Ping(); err != nil {
		return err
	}

	mysqlDatabaseConnection.connection = mysql

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
