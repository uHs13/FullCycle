package drivenAdapterClientDataSchema

type OperationsHandlerInterface interface {
	FindById(uuid string) (ClientDto, error)
	Create(client ClientDto) error
}
