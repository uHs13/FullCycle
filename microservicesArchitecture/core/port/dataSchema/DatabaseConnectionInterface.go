package portDataSchema

import "database/sql"

type DatabaseConnectionInterface interface {
	OpenConnection() error
	GetConnection() *sql.DB
}
