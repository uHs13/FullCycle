package portDataSchema

type DatabaseFactoryInterface interface {
	MakeInstance() (DatabaseConnectionInterface, error)
}
