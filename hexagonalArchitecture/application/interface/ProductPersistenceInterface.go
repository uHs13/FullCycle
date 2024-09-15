package application_interface

type ProductReaderInterface interface {
	Get(id string) (ProductInterface, error)
}

type ProductWriterInterface interface {
	Create(id string, price float32) (ProductInterface, error)
}

type ProductPersistenceInterface interface {
	ProductReaderInterface
	ProductWriterInterface
	Enable(product ProductInterface) (ProductInterface, error)
	Disable(product ProductInterface) (ProductInterface, error)
}
