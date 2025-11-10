package drivenAdapterTransactionDataSchema_test

import (
	"database/sql"
	drivenAdapterTransactionDataSchema "microservices-wallet-core/adapters/driven/transaction/dataSchema"
	"testing"

	"github.com/stretchr/testify/assert"
)

var Connection *sql.DB
var TransactionPersistence *drivenAdapterTransactionDataSchema.TransactionPersistenceSqlite

func SqliteCreateTable() {
	table := "CREATE TABLE IF NOT EXISTS transactions(id string, accountFromId string, accountToId string, amount float);"

	TransactionPersistence, _ = drivenAdapterTransactionDataSchema.NewTransactionPersistenceSqlite()

	Connection = TransactionPersistence.Database.Connection

	statement, err := Connection.Prepare(table)

	if err != nil {
		panic(err.Error())
	}

	_, err = statement.Exec()

	if err != nil {
		panic(err.Error())
	}
}

func TestShouldProperlyCreateAClient(t *testing.T) {
	SqliteCreateTable()

	transactionDto := drivenAdapterTransactionDataSchema.NewTransactionDto()
	transactionDto.Id = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	transactionDto.AccountFromId = "49ebccd1-038a-4c27-ad00-e97eb194c8e0"
	transactionDto.AccountToId = "fc873a8d-4cb6-4067-b023-e1bfeb446d1d"
	transactionDto.Amount = 13

	TransactionPersistence.Create(*transactionDto)

	rows, err := Connection.Query("SELECT id, accountFromId, accountToId, amount FROM transactions WHERE id = 'c6188c79-4aeb-4973-a24a-fa2d38cc951c'")

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
