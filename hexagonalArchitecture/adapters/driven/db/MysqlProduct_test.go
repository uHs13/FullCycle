package db_test

import (
	"database/sql"
	"goHexagonal/adapters/driven/db"
	application "goHexagonal/application/product"
	"goHexagonal/infra/database"
	"goHexagonal/infra/dotEnv"
	"log"
	"testing"

	"github.com/stretchr/testify/require"
)

var MysqlDb *sql.DB

const (
	MysqlValidId     = "uuid"
	MysqlValidName   = "T-shirt"
	MysqlValidPrice  = float32(13)
	MysqlValidStatus = "disabled"
)

func MysqlSetUp() {
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

	MysqlDb = mysql.GetConnection()
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

	statement, err := MysqlDb.Prepare(table)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec()
}

func MysqlCreateProduct() {
	insert := `INSERT INTO product(id, name, price, status) VALUES(?, ?, ?, ?);`

	statement, err := MysqlDb.Prepare(insert)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec(MysqlValidId, MysqlValidName, MysqlValidPrice, MysqlValidStatus)
}

func TestShouldProperlyGetAProductWithMysqlConnection(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)

	product, err := productDatabase.Get(MysqlValidId)

	require.Nil(t, err)
	require.Equal(t, MysqlValidId, product.GetId())
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
}

func TestShouldProperlyCreateAProductWithMysqlConnection(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)
	newProduct, err := application.NewProduct(MysqlValidName, MysqlValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Create(newProduct)

	require.Nil(t, err)
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
	require.Equal(t, MysqlValidStatus, product.GetStatus())
}

func TestShouldProperlyEditAProductWithMysqlConnection(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)
	newProduct, err := application.NewProduct(MysqlValidName, MysqlValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Update(newProduct)

	require.Nil(t, err)
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
	require.Equal(t, MysqlValidStatus, product.GetStatus())
}

func TestShouldProperlyEnableAProductWithMysqlConnection(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)
	newProduct, err := application.NewProduct(MysqlValidName, MysqlValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Enable(newProduct)

	require.Nil(t, err)
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
	require.Equal(t, MysqlValidStatus, product.GetStatus())
}

func TestShouldProperlyDisableAProductWithMysqlConnection(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)
	newProduct, err := application.NewProduct(MysqlValidName, MysqlValidPrice)

	require.Nil(t, err)

	product, err := productDatabase.Disable(newProduct)

	require.Nil(t, err)
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
	require.Equal(t, MysqlValidStatus, product.GetStatus())
}
