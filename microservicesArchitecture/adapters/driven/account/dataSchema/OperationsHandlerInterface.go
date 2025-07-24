package drivenAdapterAccountDataSchema

type OperationsHandlerInterface interface {
	FindById(uuid string) (*AccountDto, error)
	Create(account *AccountDto) error
}
