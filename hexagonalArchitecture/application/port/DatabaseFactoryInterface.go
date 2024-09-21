package application

type DatabaseFactoryInterface interface {
	MakeInstance() (DatabaseConnectionInterface, error)
}
