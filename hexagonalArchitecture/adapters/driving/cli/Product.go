package cli

import (
	"errors"
	"fmt"
	application_interface "goHexagonal/application/interface"
	application "goHexagonal/application/product"
)

const (
	getActionConst     = "get"
	createActionConst  = "create"
	updateActionConst  = "update"
	enableActionConst  = "enable"
	disableActionConst = "disable"
	invalidActionConst = "the selected action is not available"

	GetResultConst      = "Product successfully found - Id: %s, Name: %s, Price: %f, Status: %s"
	CreateResultConst   = "Product successfully created - Id: %s, Name: %s, Price: %f, Status: %s"
	UpdateResultConst   = "Product successfully updated - Id: %s, Name: %s, Price: %f, Status: %s"
	EnableResultConst   = "Product successfully enabled - Id: %s, Name: %s, Price: %f, Status: %s"
	DisabledResultConst = "Product successfully disabled - Id: %s, Name: %s, Price: %f, Status: %s"
)

func Run(
	productService application_interface.ProductServiceInterface,
	action string,
	productId string,
	productName string,
	productPrice float32,
) (string, error) {
	var result string = ""

	switch action {
	case getActionConst:
		result, err := getProduct(productService, productId)
		return result, err
	case createActionConst:
		result, err := createProduct(productService, productName, productPrice)
		return result, err
	case updateActionConst:
		result, err := updateProduct(productService, productId, productName, productPrice)
		return result, err
	case enableActionConst:
		result, err := enableProduct(productService, productId)
		return result, err
	case disableActionConst:
		result, err := disableProduct(productService, productId)
		return result, err
	default:
		return result, errors.New(invalidActionConst)
	}
}

func getProduct(
	productService application_interface.ProductServiceInterface,
	productId string,
) (string, error) {
	product, err := productService.Get(productId)

	if err != nil {
		return "", err
	}

	return fmt.Sprintf(
		GetResultConst,
		product.GetId(),
		product.GetName(),
		product.GetPrice(),
		product.GetStatus(),
	), nil
}

func createProduct(
	productService application_interface.ProductServiceInterface,
	productName string,
	productPrice float32,
) (string, error) {
	createdProduct, err := productService.Create(productName, productPrice)

	if err != nil {
		return "", err
	}

	return buildResultString(CreateResultConst, createdProduct), nil
}

func updateProduct(
	productService application_interface.ProductServiceInterface,
	productId string,
	productName string,
	productPrice float32,
) (string, error) {
	product := &application.Product{
		Id:    productId,
		Name:  productName,
		Price: productPrice,
	}

	updatedProduct, err := productService.Update(product)

	if err != nil {
		return "", err
	}

	return buildResultString(UpdateResultConst, updatedProduct), nil
}

func enableProduct(
	productService application_interface.ProductServiceInterface,
	productId string,
) (string, error) {
	product := &application.Product{
		Id: productId,
	}

	enabledProduct, err := productService.Enable(product)

	if err != nil {
		return "", err
	}

	return buildResultString(EnableResultConst, enabledProduct), nil
}

func disableProduct(
	productService application_interface.ProductServiceInterface,
	productId string,
) (string, error) {
	product := &application.Product{
		Id: productId,
	}

	disabledProduct, err := productService.Disable(product)

	if err != nil {
		return "", err
	}

	return buildResultString(DisabledResultConst, disabledProduct), nil
}

func buildResultString(
	templateResult string,
	product application_interface.ProductInterface,
) string {
	return fmt.Sprintf(
		templateResult,
		product.GetId(),
		product.GetName(),
		product.GetPrice(),
		product.GetStatus(),
	)
}
