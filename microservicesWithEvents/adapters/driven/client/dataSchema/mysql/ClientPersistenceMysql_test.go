package drivenAdapterClientDataSchemaMysql_test

import (
	"database/sql"
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	drivenAdapterClientDataSchemaMysql "microservices-wallet-core/adapters/driven/client/dataSchema/mysql"
	infraDotEnv "microservices-wallet-core/infra/dotEnv"
	"testing"

	"github.com/stretchr/testify/assert"
)

var MysqlConnection *sql.DB
var MysqlClientPersistence *drivenAdapterClientDataSchemaMysql.ClientPersistenceMysql

func MysqlSetup() {
	MysqlOpenConnection()
	MysqlDropTable()
	MysqlCreateTable()
}

func MysqlOpenConnection() {
	if err := infraDotEnv.Load(); err != nil {
		panic(err)
	}

	MysqlClientPersistence, _ = drivenAdapterClientDataSchemaMysql.NewClientPersistenceMysql(nil)

	MysqlConnection = MysqlClientPersistence.Database.Connection
}

func MysqlDropTable() {
	table := `
		DROP TABLE IF EXISTS client;
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
		CREATE TABLE IF NOT EXISTS client (
			id VARCHAR(36) NOT NULL,
			name VARCHAR(100) NOT NULL,
			email VARCHAR(100) NOT NULL,
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

func TestShouldProperlyCreateAClient(t *testing.T) {
	MysqlSetup()

	clientDto := drivenAdapterClientDataSchema.NewClientDto()
	clientDto.Id = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	clientDto.Name = "John Cena"
	clientDto.Email = "john.cena@email.com"

	MysqlClientPersistence.Create(*clientDto)

	rows, err := MysqlConnection.Query("SELECT id, name, email FROM client WHERE id = 'c6188c79-4aeb-4973-a24a-fa2d38cc951c'")

	if err != nil {
		panic(err)
	}

	defer rows.Close()

	var id, name, email string
	for rows.Next() {
		err := rows.Scan(&id, &name, &email)
		if err != nil {
			panic(err)
		}
	}

	assert.Equal(t, clientDto.Id, id)
	assert.Equal(t, clientDto.Name, name)
	assert.Equal(t, clientDto.Email, email)
	assert.Equal(t, clientDto.Email, email)
}

func TestShouldProperlyFindAClient(t *testing.T) {
	MysqlSetup()

	uuid := "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	clientDto := drivenAdapterClientDataSchema.NewClientDto()
	clientDto.Id = uuid
	clientDto.Name = "John Cena"
	clientDto.Email = "john.cena@email.com"

	MysqlClientPersistence.Create(*clientDto)

	foundClient, err := MysqlClientPersistence.FindById(uuid)

	assert.Nil(t, err)
	assert.Equal(t, clientDto.Id, foundClient.Id)
	assert.Equal(t, clientDto.Name, foundClient.Name)
	assert.Equal(t, clientDto.Email, foundClient.Email)
}

func TestShouldProperlyListAllClients(t *testing.T) {
	MysqlSetup()

	uuid := "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	clientDto := drivenAdapterClientDataSchema.NewClientDto()
	clientDto.Id = uuid
	clientDto.Name = "John Cena"
	clientDto.Email = "john.cena@email.com"

	uuidTwo := "5c51edec-f6e4-439d-97a1-65a051b32401"
	clientDtoTwo := drivenAdapterClientDataSchema.NewClientDto()
	clientDtoTwo.Id = uuidTwo
	clientDtoTwo.Name = "John Cena"
	clientDtoTwo.Email = "john.cena@email.com"

	MysqlClientPersistence.Create(*clientDto)
	MysqlClientPersistence.Create(*clientDtoTwo)

	foundClients, err := MysqlClientPersistence.ListAll()

	assert.Nil(t, err)
	assert.Equal(t, len(foundClients), 2)
	assert.Equal(t, clientDto.Name, foundClients[0].Name)
	assert.Equal(t, clientDto.Email, foundClients[0].Email)
	assert.Equal(t, clientDtoTwo.Name, foundClients[1].Name)
	assert.Equal(t, clientDtoTwo.Email, foundClients[1].Email)
}
