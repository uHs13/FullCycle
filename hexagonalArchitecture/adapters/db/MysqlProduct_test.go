package db_test

import (
	"database/sql"
	"goHexagonal/adapters/db"
	application "goHexagonal/application/product"
	"goHexagonal/infra/database"
	"goHexagonal/infra/dotEnv"
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
	MysqlOpenConnection()
	MysqlCreateTable()
	MysqlCreateProduct()
}

func MysqlOpenConnection() {
	if err := dotEnv.Load(); err != nil {
		panic(err)
	}

	mysql, err := database.NewDatabase(database.MysqlConnectionConst)

	if err != nil {
		panic(err)
	}

	Db = mysql.GetConnection()
}

func MysqlCreateTable() {
	table := `
		CREATE TABLE IF NOT EXISTS product (
			id VARCHAR(36) NOT NULL,
			name VARCHAR(255) NOT NULL,
			price FLOAT(10, 2) NOT NULL,
			status ENUM('enabled', 'disabled') NOT NULL,
			created_at DATETIME DEFAULT CURRENT_TIMESTAMP
		);

	`

	statement, err := Db.Prepare(table)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec()
}

func MysqlCreateProduct() {
	insert := `INSERT INTO product(id, name, price, status) VALUES(?, ?, ?, ?);`

	statement, err := Db.Prepare(insert)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec(validId, validName, validPrice, validStatus)
}

func TestShouldProperlyGetAProductWithMysqlConnection(t *testing.T) {
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

func TestShouldProperlyCreateAProductWithMysqlConnection(t *testing.T) {
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

func TestShouldProperlyEditAProductWithMysqlConnection(t *testing.T) {
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

func TestShouldProperlyEnableAProductWithMysqlConnection(t *testing.T) {
	SetUp()

	defer Db.Close()

	productDatabase := db.NewProductDatabase(Db)
	newProduct, err := application.NewProduct(validName, validPrice)

	require.Nil(t, err)

	product, err := productDatabase.Enable(newProduct)

	require.Nil(t, err)
	require.Equal(t, validName, product.GetName())
	require.Equal(t, validPrice, product.GetPrice())
	require.Equal(t, validStatus, product.GetStatus())
}

func TestShouldProperlyDisableAProductWithMysqlConnection(t *testing.T) {
	SetUp()

	defer Db.Close()

	productDatabase := db.NewProductDatabase(Db)
	newProduct, err := application.NewProduct(validName, validPrice)

	require.Nil(t, err)

	product, err := productDatabase.Disable(newProduct)

	require.Nil(t, err)
	require.Equal(t, validName, product.GetName())
	require.Equal(t, validPrice, product.GetPrice())
	require.Equal(t, validStatus, product.GetStatus())
}
