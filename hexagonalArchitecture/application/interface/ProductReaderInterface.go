package application_interface

type ProductReaderInterface interface {
	Get(id string) (ProductInterface, error)
}
