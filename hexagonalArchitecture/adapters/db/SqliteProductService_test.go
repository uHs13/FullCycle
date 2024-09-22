package db_test

import (
	"goHexagonal/adapters/db"
	application "goHexagonal/application/product"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestShouldProperlyGetAProductWithProductServiceUsingSqlite(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)

	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(SqliteValidId)

	require.Nil(t, err)
	require.Equal(t, SqliteValidId, product.GetId())
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
}

func TestShouldProperlyCreateAProductWithProductServiceUsingSqlite(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)

	productService := application.NewProductService(productDatabase)

	product, err := productService.Create(SqliteValidName, SqliteValidPrice)

	require.Nil(t, err)
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
	require.Equal(t, SqliteValidStatus, product.GetStatus())
}

func TestShouldProperlyEditAProductWithProductServiceUsingSqlite(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)
	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(SqliteValidId)

	require.Nil(t, err)

	product, err = productService.Update(product)

	require.Nil(t, err)
	require.Equal(t, SqliteValidName, product.GetName())
	require.Equal(t, SqliteValidPrice, product.GetPrice())
}

func TestShouldProperlyEnableAProductWithProductServiceUsingSqlite(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)

	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(SqliteValidId)

	require.Nil(t, err)

	product, err = productService.Enable(product)

	require.Nil(t, err)
	require.Equal(t, application.EnabledStatusConst, product.GetStatus())
}

func TestShouldNotDisableAProductWithPriceBiggerThanZeroProductServiceUsingSqlite(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)
	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(SqliteValidId)

	require.Nil(t, err)

	_, err = productService.Disable(product)

	require.Equal(t, err.Error(), application.DisableErrorMessageConst)
}

func TestShouldProperlyDisableAProductWithProductServiceUsingSqlite(t *testing.T) {
	SqliteSetUp()

	defer SqliteDb.Close()

	productDatabase := db.NewProductDatabase(SqliteDb)
	productService := application.NewProductService(productDatabase)

	product, err := productService.Create(SqliteValidName, 0)

	require.Nil(t, err)

	product, err = productDatabase.Disable(product)

	require.Nil(t, err)
	require.Equal(t, SqliteValidStatus, product.GetStatus())
}
