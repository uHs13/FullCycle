package drivenAdapterAccountDataSchema

type AccountPersistenceInterface interface {
	FindById(uuid string) (*AccountDto, error)
	Create(account *AccountDto) error
}
