package application_interface

type ProductWriterInterface interface {
	Create(id string, price float32) (ProductInterface, error)
}
