package db_test

import (
	"database/sql"
	"goHexagonal/adapters/db"
	application "goHexagonal/application/product"
	"log"
	"testing"

	"github.com/stretchr/testify/require"
)

var Db *sql.DB

const (
	validId     = "uuid"
	validName   = "T-shirt"
	validPrice  = float32(13)
	validStatus = "disabled"
)

func SetUp() {
	OpenConnection()
	CreateTable()
	CreateProduct()
}

func OpenConnection() {
	Db, _ = sql.Open("sqlite3", ":memory:")
}

func CreateTable() {
	table := "CREATE TABLE product(id string, name string, price float, status string);"

	statement, err := Db.Prepare(table)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec()
}

func CreateProduct() {
	insert := `INSERT INTO product VALUES(?, ?, ?, ?);`

	statement, err := Db.Prepare(insert)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec(validId, validName, validPrice, validStatus)
}

func TestShouldProperlyGetAProduct(t *testing.T) {
	SetUp()

	defer Db.Close()

	productDatabase := db.NewProductDatabase(Db)

	product, err := productDatabase.Get(validId)

	require.Nil(t, err)
	require.Equal(t, validId, product.GetId())
	require.Equal(t, validName, product.GetName())
	require.Equal(t, validPrice, product.GetPrice())
	require.Equal(t, validStatus, product.GetStatus())
}

func TestShouldProperlyCreateAProduct(t *testing.T) {
	SetUp()

	defer Db.Close()

	productDatabase := db.NewProductDatabase(Db)
	newProduct, err := application.NewProduct(validName, validPrice)

	require.Nil(t, err)

	product, err := productDatabase.Create(newProduct)

	require.Nil(t, err)
	require.Equal(t, validName, product.GetName())
	require.Equal(t, validPrice, product.GetPrice())
	require.Equal(t, validStatus, product.GetStatus())
}

func TestShouldProperlyEditAProduct(t *testing.T) {
	SetUp()

	defer Db.Close()

	productDatabase := db.NewProductDatabase(Db)
	newProduct, err := application.NewProduct(validName, validPrice)

	require.Nil(t, err)

	product, err := productDatabase.Update(newProduct)

	require.Nil(t, err)
	require.Equal(t, validName, product.GetName())
	require.Equal(t, validPrice, product.GetPrice())
	require.Equal(t, validStatus, product.GetStatus())
}
