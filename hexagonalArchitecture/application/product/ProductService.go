package application

import (
	application_interface "goHexagonal/application/interface"
)

type ProductService struct {
	Persistence application_interface.ProductPersistenceInterface
}

func NewProductService(persistence application_interface.ProductPersistenceInterface) *ProductService {
	return &ProductService{
		Persistence: persistence,
	}
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

func (productService *ProductService) Update(product application_interface.ProductInterface) (application_interface.ProductInterface, error) {
	result, err := productService.Get(product.GetId())

	if err != nil {
		return nil, err
	}

	result, err = productService.Persistence.Update(result)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}

func (productService *ProductService) Enable(product application_interface.ProductInterface) (application_interface.ProductInterface, error) {
	result, err := productService.Get(product.GetId())

	if err != nil {
		return nil, err
	}

	err = result.Enable()

	if err != nil {
		return &Product{}, err
	}

	result, err = productService.Persistence.Enable(result)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}

func (productService *ProductService) Disable(product application_interface.ProductInterface) (application_interface.ProductInterface, error) {
	result, err := productService.Get(product.GetId())

	if err != nil {
		return nil, err
	}

	err = result.Disable()

	if err != nil {
		return &Product{}, err
	}

	result, err = productService.Persistence.Disable(result)

	if err != nil {
		return &Product{}, err
	}

	return result, nil
}
