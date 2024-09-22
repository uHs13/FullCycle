package application_test

import (
	application "goHexagonal/application/product"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestShouldProperlyActivateProduct(t *testing.T) {
	product := application.Product{}

	product.Name = "T-Shirt"
	product.Status = application.EnabledStatusConst
	product.Price = 13

	err := product.Enable()

	require.Nil(t, err)
}

func TestShouldThrowAnErrorWhenTryToEnableProductWithPriceLowerThanZero(t *testing.T) {
	product := application.Product{}

	product.Name = "T-Shirt"
	product.Status = application.EnabledStatusConst
	product.Price = -13

	err := product.Enable()

	require.Equal(t, application.EnableErrorMessageConst, err.Error())
}

func TestShouldProperlyDisableProduct(t *testing.T) {
	product := application.Product{}

	product.Name = "T-Shirt"
	product.Status = application.EnabledStatusConst
	product.Price = 0

	err := product.Disable()

	require.Nil(t, err)
}

func TestShouldThrowAnErrorWhenTryToDisableProductWithPriceBiggerThanZero(t *testing.T) {
	product := application.Product{}

	product.Name = "T-Shirt"
	product.Status = application.EnabledStatusConst
	product.Price = 13

	err := product.Disable()

	require.Equal(t, application.DisableErrorMessageConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToChangeProductIdToANotValidOne(t *testing.T) {
	product, err := application.NewProduct(
		"T-Shirt",
		13,
	)

	require.Nil(t, err)

	product.Id = "not-valid-id"

	_, err = product.IsValid()

	require.Equal(t, application.NotValidIdErrorConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToCreateProductWithEmptyName(t *testing.T) {
	_, err := application.NewProduct(
		"",
		13,
	)

	require.Equal(t, application.NotValidNameErrorConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToCreateProductWithTooLongName(t *testing.T) {
	_, err := application.NewProduct(
		"Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.",
		13,
	)

	require.Equal(t, application.NotValidNameErrorConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToSetProductNameWithEmptyValue(t *testing.T) {
	product, err := application.NewProduct(
		"name",
		13,
	)

	require.Nil(t, err)

	err = product.SetName("")

	require.Equal(t, application.NotValidNameErrorConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToSetProductNameWithTooLongValue(t *testing.T) {
	product, err := application.NewProduct(
		"name",
		13,
	)

	require.Nil(t, err)

	err = product.SetName("Mussum Ipsum, cacilds vidis litro abertis. Suco de cevadiss, é um leite divinis, qui tem lupuliz, matis, aguis e fermentis. Admodum accumsan disputationi eu sit. Vide electram sadipscing et per. Tá deprimidis, eu conheço uma cachacis que pode alegrar sua vidis. Mais vale um bebadis conhecidiss, que um alcoolatra anonimis.")

	require.Equal(t, application.NotValidNameErrorConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToCreateProductWithNotValidPrice(t *testing.T) {
	_, err := application.NewProduct(
		"T-shirt",
		-13,
	)

	require.Equal(t, application.NotValidPriceErrorConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToChangeProductStatusToANotValidOne(t *testing.T) {
	name := "T-shirt"
	price := float32(13)

	product, err := application.NewProduct(name, price)

	require.Nil(t, err)

	product.Status = "not-valid-status"

	_, err = product.IsValid()

	require.Equal(t, application.NotValidStatusErrorConst, err.Error())
}

func TestShouldThrowAnErrorWhenTryToSetANotValidPrice(t *testing.T) {
	product, err := application.NewProduct(
		"T-shirt",
		13,
	)

	require.Nil(t, err)

	err = product.SetPrice(-13)

	require.Equal(t, application.NotValidPriceErrorConst, err.Error())
}

func TestShouldProperlyCreateProduct(t *testing.T) {
	name := "T-shirt"
	price := float32(13)

	_, err := application.NewProduct(name, price)

	require.Nil(t, err)
}
