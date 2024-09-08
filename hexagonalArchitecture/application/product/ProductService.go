package application

import application_interface "goHexagonal/application/interface"

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
	return nil, nil
}

func (productService *ProductService) Enable(Product application_interface.ProductInterface) (application_interface.ProductInterface, error) {
	return nil, nil
}

func (productService *ProductService) Disable(Product application_interface.ProductInterface) (application_interface.ProductInterface, error) {
	return nil, nil
}
