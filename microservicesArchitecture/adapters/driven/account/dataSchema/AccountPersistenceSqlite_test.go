package drivenAdapterAccountDataSchema_test

import (
	"database/sql"
	drivenAdapterAccountDataSchema "microservices-wallet-core/adapters/driven/account/dataSchema"
	"testing"

	"github.com/stretchr/testify/assert"
)

var Connection *sql.DB
var AccountPersistence *drivenAdapterAccountDataSchema.AccountPersistenceSqlite

func SqliteCreateTable() {
	table := "CREATE TABLE IF NOT EXISTS account(id string, clientId string, balance float);"

	AccountPersistence, _ = drivenAdapterAccountDataSchema.NewAccountPersistenceSqlite()

	Connection = AccountPersistence.Database.Connection

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

	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto.ClientId = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto.Balance = 13

	AccountPersistence.Create(*accountDto)

	rows, err := Connection.Query("SELECT id, clientId, balance FROM account WHERE id = 'c6188c79-4aeb-4973-a24a-fa2d38cc951c'")

	if err != nil {
		panic(err)
	}

	defer rows.Close()

	var id, clientId string
	var balance float64
	for rows.Next() {
		err := rows.Scan(&id, &clientId, &balance)
		if err != nil {
			panic(err)
		}
	}

	assert.Equal(t, accountDto.Id, id)
	assert.Equal(t, accountDto.ClientId, clientId)
	assert.Equal(t, accountDto.Balance, balance)
}

func TestShouldProperlyFindAClient(t *testing.T) {
	SqliteCreateTable()

	uuid := "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = uuid
	accountDto.ClientId = uuid
	accountDto.Balance = 13

	AccountPersistence.Create(*accountDto)

	foundAccount, err := AccountPersistence.FindById(uuid)

	assert.Nil(t, err)
	assert.Equal(t, accountDto.Id, foundAccount.Id)
	assert.Equal(t, accountDto.ClientId, foundAccount.ClientId)
	assert.Equal(t, accountDto.Balance, foundAccount.Balance)
}
