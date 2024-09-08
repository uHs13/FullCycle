package application_interface

type ProductServiceInterface interface {
	Get(id string) (ProductInterface, error)
	Create(name string, price float32) (ProductInterface, error)
	Enable(Product ProductInterface) (ProductInterface, error)
	Disable(Product ProductInterface) (ProductInterface, error)
}
