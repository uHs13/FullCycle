package application_interface

type ProductPersistenceInterface interface {
	ProductReaderInterface
	ProductWriterInterface
}
