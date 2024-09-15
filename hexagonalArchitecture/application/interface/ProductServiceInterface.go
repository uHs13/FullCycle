package application_interface

type ProductServiceInterface interface {
	Get(id string) (ProductInterface, error)
	Create(name string, price float32) (ProductInterface, error)
	Enable(product ProductInterface) (ProductInterface, error)
	Disable(product ProductInterface) (ProductInterface, error)
}
