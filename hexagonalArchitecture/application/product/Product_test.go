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
