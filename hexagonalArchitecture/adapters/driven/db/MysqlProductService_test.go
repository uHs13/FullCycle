package db_test

import (
	"goHexagonal/adapters/driven/db"
	application "goHexagonal/application/product"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestShouldProperlyGetAProductWithProductServiceUsingMysql(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)

	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(MysqlValidId)

	require.Nil(t, err)
	require.Equal(t, MysqlValidId, product.GetId())
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
}

func TestShouldProperlyCreateAProductWithProductServiceUsingMysql(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)

	productService := application.NewProductService(productDatabase)

	product, err := productService.Create(MysqlValidName, MysqlValidPrice)

	require.Nil(t, err)
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
	require.Equal(t, MysqlValidStatus, product.GetStatus())
}

func TestShouldProperlyEditAProductWithProductServiceUsingMysql(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)

	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(MysqlValidId)

	require.Nil(t, err)

	product, err = productService.Update(product)

	require.Nil(t, err)
	require.Equal(t, MysqlValidName, product.GetName())
	require.Equal(t, MysqlValidPrice, product.GetPrice())
}

func TestShouldProperlyEnableAProductWithProductServiceUsingMysql(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)

	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(MysqlValidId)

	require.Nil(t, err)

	product, err = productService.Enable(product)

	require.Nil(t, err)
	require.Equal(t, application.EnabledStatusConst, product.GetStatus())
}

func TestShouldNotDisableAProductWithPriceBiggerThanZeroProductServiceUsingMysql(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)
	productService := application.NewProductService(productDatabase)

	product, err := productService.Get(MysqlValidId)

	require.Nil(t, err)

	_, err = productService.Disable(product)

	require.Equal(t, err.Error(), application.DisableErrorMessageConst)
}

func TestShouldProperlyDisableAProductWithProductServiceUsingMysql(t *testing.T) {
	MysqlSetUp()

	defer MysqlDb.Close()

	productDatabase := db.NewProductDatabase(MysqlDb)
	productService := application.NewProductService(productDatabase)

	product, err := productService.Create(MysqlValidName, 0)

	require.Nil(t, err)

	product, err = productService.Disable(product)

	require.Nil(t, err)
	require.Equal(t, MysqlValidStatus, product.GetStatus())
}
