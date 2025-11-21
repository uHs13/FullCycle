package drivenAdapterAccountDataSchemaMysql_test

import (
	"database/sql"
	drivenAdapterAccountDataSchema "microservices-wallet-core/adapters/driven/account/dataSchema"
	drivenAdapterAccountDataSchemaMysql "microservices-wallet-core/adapters/driven/account/dataSchema/mysql"
	infraDotEnv "microservices-wallet-core/infra/dotEnv"
	"testing"

	"github.com/stretchr/testify/assert"
)

var MysqlConnection *sql.DB
var MysqlAccountPersistence *drivenAdapterAccountDataSchemaMysql.AccountPersistenceMysql

func MysqlSetup() {
	MysqlOpenConnection()
	MysqlDropTable()
	MysqlCreateTable()
}

func MysqlOpenConnection() {
	if err := infraDotEnv.Load(); err != nil {
		panic(err)
	}

	MysqlAccountPersistence, _ = drivenAdapterAccountDataSchemaMysql.NewAccountPersistenceMysql(nil)

	MysqlConnection = MysqlAccountPersistence.Database.Connection
}

func MysqlDropTable() {
	table := `
		DROP TABLE IF EXISTS account;
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
		CREATE TABLE IF NOT EXISTS account (
			id VARCHAR(36) NOT NULL,
			client_id VARCHAR(36) NOT NULL,
			balance FLOAT(10, 2) NOT NULL,
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

func TestShouldProperlyCreateAnAccount(t *testing.T) {
	MysqlSetup()

	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto.ClientId = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto.Balance = 13

	MysqlAccountPersistence.Create(accountDto)

	rows, err := MysqlConnection.Query("SELECT id, client_id, balance FROM account WHERE id = 'c6188c79-4aeb-4973-a24a-fa2d38cc951c'")

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

func TestShouldProperlyFindAnAccount(t *testing.T) {
	MysqlSetup()

	uuid := "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = uuid
	accountDto.ClientId = uuid
	accountDto.Balance = 13

	MysqlAccountPersistence.Create(accountDto)

	foundAccount, err := MysqlAccountPersistence.FindById(uuid)

	assert.Nil(t, err)
	assert.Equal(t, accountDto.Id, foundAccount.Id)
	assert.Equal(t, accountDto.ClientId, foundAccount.ClientId)
	assert.Equal(t, accountDto.Balance, foundAccount.Balance)
}

func TestShouldReturnTrueWhenAccountAlreadyExistForClient(t *testing.T) {
	MysqlSetup()

	uuid := "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = uuid
	accountDto.ClientId = uuid
	accountDto.Balance = 13

	MysqlAccountPersistence.Create(accountDto)

	foundAccount, err := MysqlAccountPersistence.AlreadyExistForClient(accountDto)

	assert.Nil(t, err)
	assert.True(t, foundAccount)
}

func TestShouldReturnFalseWhenAccountDoesNotExistForClient(t *testing.T) {
	MysqlSetup()

	uuid := "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = uuid
	accountDto.ClientId = uuid
	accountDto.Balance = 13

	MysqlAccountPersistence.Create(accountDto)

	uuidTwo := "c6188c79-4aeb-4973-a24a-fa2d38cc951d"
	accountDtoTwo := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDtoTwo.Id = uuidTwo
	accountDtoTwo.ClientId = uuidTwo
	accountDtoTwo.Balance = 13

	foundAccount, err := MysqlAccountPersistence.AlreadyExistForClient(accountDtoTwo)

	assert.Nil(t, err)
	assert.False(t, foundAccount)
}

func TestShouldProperlyDepositIntoAccount(t *testing.T) {
	MysqlSetup()

	accountDto := drivenAdapterAccountDataSchema.NewAccountDto()
	accountDto.Id = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto.ClientId = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	accountDto.Balance = 0

	err := MysqlAccountPersistence.Create(accountDto)

	assert.Nil(t, err)

	depositValue := 13.0

	accountDto.Balance = depositValue

	err = MysqlAccountPersistence.Deposit(accountDto)

	assert.Nil(t, err)

	rows, err := MysqlConnection.Query("SELECT id, client_id, balance FROM account WHERE id = 'c6188c79-4aeb-4973-a24a-fa2d38cc951c'")

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
	assert.Equal(t, accountDto.Balance, depositValue)
}
