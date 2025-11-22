package drivenAdapterTransactionDataSchemaMysql_test

import (
	"database/sql"
	drivenAdapterTransactionDataSchema "microservices-wallet-core/adapters/driven/transaction/dataSchema"
	drivenAdapterTransactionDataSchemaMysql "microservices-wallet-core/adapters/driven/transaction/dataSchema/mysql"
	infraDotEnv "microservices-wallet-core/infra/dotEnv"
	"testing"

	"github.com/stretchr/testify/assert"
)

var MysqlConnection *sql.DB
var MysqlTransactionPersistence *drivenAdapterTransactionDataSchemaMysql.TransactionPersistenceMysql

func MysqlSetup() {
	MysqlOpenConnection()
	MysqlDropTable()
	MysqlCreateTable()
}

func MysqlOpenConnection() {
	if err := infraDotEnv.Load(); err != nil {
		panic(err)
	}

	MysqlTransactionPersistence, _ = drivenAdapterTransactionDataSchemaMysql.NewTransactionPersistenceMysql(nil)

	MysqlConnection = MysqlTransactionPersistence.Database.Connection
}

func MysqlDropTable() {
	table := `
		DROP TABLE IF EXISTS transaction;
	`

	statement, err := MysqlConnection.Prepare(table)

	if err != nil {
		panic(err.Error())
	}

	_, err = statement.Exec()

	if err != nil {
		panic(err.Error())
	}
}

func MysqlCreateTable() {
	table := `
		CREATE TABLE IF NOT EXISTS transaction (
			id VARCHAR(36) NOT NULL,
			account_id_from VARCHAR(36) NOT NULL,
			account_id_to VARCHAR(36) NOT NULL,
			amount FLOAT(10, 2) NOT NULL,
			createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
			PRIMARY KEY (id)
		);
	`

	statement, err := MysqlConnection.Prepare(table)

	if err != nil {
		panic(err.Error())
	}

	_, err = statement.Exec()

	if err != nil {
		panic(err.Error())
	}
}

func TestShouldProperlyCreateATransaction(t *testing.T) {
	MysqlSetup()

	transactionDto := drivenAdapterTransactionDataSchema.NewTransactionDto()
	transactionDto.Id = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	transactionDto.AccountFromId = "49ebccd1-038a-4c27-ad00-e97eb194c8e0"
	transactionDto.AccountToId = "fc873a8d-4cb6-4067-b023-e1bfeb446d1d"
	transactionDto.Amount = 13

	err := MysqlTransactionPersistence.Create(*transactionDto)

	if err != nil {
		panic(err)
	}

	rows, err := MysqlConnection.Query("SELECT id, account_id_from, account_id_to, amount FROM transaction WHERE id = 'c6188c79-4aeb-4973-a24a-fa2d38cc951c'")

	if err != nil {
		panic(err)
	}

	defer rows.Close()

	var id, accountFromId, accountToId string
	var amount float64
	for rows.Next() {
		err := rows.Scan(&id, &accountFromId, &accountToId, &amount)
		if err != nil {
			panic(err)
		}
	}

	assert.Equal(t, transactionDto.Id, id)
	assert.Equal(t, transactionDto.AccountFromId, accountFromId)
	assert.Equal(t, transactionDto.AccountToId, accountToId)
	assert.Equal(t, transactionDto.Amount, amount)
}
