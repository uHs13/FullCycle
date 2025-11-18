package handlers

import (
	"errors"
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
)

const (
	notValidDbmsOptionConst = "not valid dbms option"
)

func DefinePersistenceByDbms(handler HandlerInterface) (
	*drivenAdapterClientDataSchema.ClientPersistenceSqlite,
	error,
) {
	if handler.GetDatabase().IsSqliteConnection() {
		clientPersistence, err := drivenAdapterClientDataSchema.NewClientPersistenceSqlite(handler.GetDatabase())

		if err != nil {
			return nil, err
		}

		return clientPersistence, nil
	}

	return nil, errors.New(notValidDbmsOptionConst)
}
