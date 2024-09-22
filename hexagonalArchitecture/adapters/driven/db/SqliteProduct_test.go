package db_test

import (
	"database/sql"
	"goHexagonal/adapters/driven/db"
	application "goHexagonal/application/product"
	"goHexagonal/infra/database"
	"log"
	"testing"

	"github.com/stretchr/testify/require"
)

var SqliteDb *sql.DB

const (
	SqliteValidId     = "uuid"
	SqliteValidName   = "T-shirt"
	SqliteValidPrice  = float32(13)
	SqliteValidStatus = "disabled"
)

func SqliteSetUp() {
	SqliteOpenConnection()
	SqliteCreateTable()
	SqliteCreateProduct()
}

func SqliteOpenConnection() {
	sqlite3, err := database.NewDatabase(database.SqliteConnectionConst)

	if err != nil {
		panic(err)
	}

	SqliteDb = sqlite3.GetConnection()
}

func SqliteCreateTable() {
	table := "CREATE TABLE product(id string, name string, price float, status string);"

	statement, err := SqliteDb.Prepare(table)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec()
}

func SqliteCreateProduct() {
	insert := `INSERT INTO product VALUES(?, ?, ?, ?);`

	statement, err := SqliteDb.Prepare(insert)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec(SqliteValidId, SqliteValidName, SqliteValidPrice, SqliteValidStatus)
}

func TestShouldProperlyGetAProductWithSqliteConnection(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)

	product, err := productDatabase.Get(SqliteValidId)

	require.Nil(t, err)
	require.Equal(t, SqliteValidId, product.GetId())
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
	require.Equal(t, SqliteValidStatus, product.GetStatus())
}

func TestShouldProperlyCreateAProductWithSqliteConnection(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)
	newProduct, err := application.NewProduct(SqliteValidName, SqliteValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Create(newProduct)

	require.Nil(t, err)
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
	require.Equal(t, SqliteValidStatus, product.GetStatus())
}

func TestShouldProperlyEditAProductWithSqliteConnection(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)
	newProduct, err := application.NewProduct(SqliteValidName, SqliteValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Update(newProduct)

	require.Nil(t, err)
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
	require.Equal(t, SqliteValidStatus, product.GetStatus())
}

func TestShouldProperlyEnableAProductWithSqliteConnection(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)
	newProduct, err := application.NewProduct(SqliteValidName, SqliteValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Enable(newProduct)

	require.Nil(t, err)
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
	require.Equal(t, SqliteValidStatus, product.GetStatus())
}

func TestShouldProperlyDisableAProductWithSqliteConnection(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)
	newProduct, err := application.NewProduct(SqliteValidName, SqliteValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Disable(newProduct)

	require.Nil(t, err)
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
	require.Equal(t, SqliteValidStatus, product.GetStatus())
}
