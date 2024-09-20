package application_interface

type ProductServiceInterface interface {
	Get(id string) (ProductInterface, error)
	Create(product ProductInterface) (ProductInterface, error)
	Update(product ProductInterface) (ProductInterface, error)
	Enable(product ProductInterface) (ProductInterface, error)
	Disable(product ProductInterface) (ProductInterface, error)
}
