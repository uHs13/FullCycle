package application

import (
	application_interface "goHexagonal/application/interface"
)

type ProductService struct {
	Persistence application_interface.ProductPersistenceInterface
}

func (productService *ProductService) Get(id string) (application_interface.ProductInterface, error) {
	product, err := productService.Persistence.Get(id)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (productService *ProductService) Create(name string, price float32) (application_interface.ProductInterface, error) {
	product, err := NewProduct(name, price)

	if err != nil {
		return &Product{}, err
	}

	result, err := productService.Persistence.Create(product)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}

func (productService *ProductService) Update(name string, price float32) (application_interface.ProductInterface, error) {
	product, err := NewProduct(name, price)

	if err != nil {
		return &Product{}, err
	}

	result, err := productService.Persistence.Update(product)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}

func (productService *ProductService) Enable(product application_interface.ProductInterface) (application_interface.ProductInterface, error) {
	err := product.Enable()

	if err != nil {
		return &Product{}, err
	}

	result, err := productService.Persistence.Enable(product)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}

func (productService *ProductService) Disable(product application_interface.ProductInterface) (application_interface.ProductInterface, error) {
	err := product.Disable()

	if err != nil {
		return &Product{}, err
	}

	result, err := productService.Persistence.Disable(product)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}
