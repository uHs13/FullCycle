package infraDataSchema

type DatabaseMemorySchema struct {
}

func NewDatabaseMemorySchema() *DatabaseMemorySchema {
	return &DatabaseMemorySchema{}
}

func (database *DatabaseMemorySchema) Init() error {
	return nil
}
