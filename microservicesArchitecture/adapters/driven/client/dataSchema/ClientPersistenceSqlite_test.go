package drivenAdapterClientDataSchema_test

import (
	"database/sql"
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	"testing"

	_ "github.com/mattn/go-sqlite3"
	"github.com/stretchr/testify/assert"
)

var Connection *sql.DB
var ClientPersistence *drivenAdapterClientDataSchema.ClientPersistenceSqlite

func SqliteCreateTable() {
	table := "CREATE TABLE IF NOT EXISTS client(id string, name string, email string, createdAt string);"

	ClientPersistence, _ = drivenAdapterClientDataSchema.NewClientPersistenceSqlite()

	Connection = ClientPersistence.Database.Connection

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

	clientDto := drivenAdapterClientDataSchema.NewClientDto()
	clientDto.Id = "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	clientDto.Name = "John Cena"
	clientDto.Email = "john.cena@email.com"

	ClientPersistence.Create(*clientDto)

	rows, err := Connection.Query("SELECT id, name, email FROM client WHERE id = 'c6188c79-4aeb-4973-a24a-fa2d38cc951c'")

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
	SqliteCreateTable()

	uuid := "c6188c79-4aeb-4973-a24a-fa2d38cc951c"
	clientDto := drivenAdapterClientDataSchema.NewClientDto()
	clientDto.Id = uuid
	clientDto.Name = "John Cena"
	clientDto.Email = "john.cena@email.com"

	ClientPersistence.Create(*clientDto)

	foundClient, err := ClientPersistence.FindById(uuid)

	assert.Nil(t, err)
	assert.Equal(t, clientDto.Id, foundClient.Id)
	assert.Equal(t, clientDto.Name, foundClient.Name)
	assert.Equal(t, clientDto.Email, foundClient.Email)
}
