package handlers

import (
	"errors"
	drivenAdapterAccountDataSchema "microservices-wallet-core/adapters/driven/account/dataSchema"
	drivenAdapterClientDataSchema "microservices-wallet-core/adapters/driven/client/dataSchema"
	drivenAdapterClientDataSchemaMysql "microservices-wallet-core/adapters/driven/client/dataSchema/mysql"
	drivenAdapterClientDataSchemaSqlite "microservices-wallet-core/adapters/driven/client/dataSchema/sqlite"
)

const (
	notValidDbmsOptionConst = "not valid dbms option"
)

func DefinePersistenceByDbms(handler HandlerInterface) (
	drivenAdapterClientDataSchema.OperationsHandlerInterface,
	error,
) {
	if handler.GetDatabase().IsSqliteConnection() {
		clientPersistence, err := drivenAdapterClientDataSchemaSqlite.NewClientPersistenceSqlite(handler.GetDatabase())

		if err != nil {
			return nil, err
		}

		return clientPersistence, nil
	}

	if handler.GetDatabase().IsMysqlConnection() {
		clientPersistence, err := drivenAdapterClientDataSchemaMysql.NewClientPersistenceMysql(handler.GetDatabase())

		if err != nil {
			return nil, err
		}

		return clientPersistence, nil
	}

	return nil, errors.New(notValidDbmsOptionConst)
}

func DefineAccountPersistenceByDbms(handler HandlerInterface) (
	drivenAdapterAccountDataSchema.OperationsHandlerInterface,
	error,
) {
	// if handler.GetDatabase().IsSqliteConnection() {
	// 	clientPersistence, err := drivenAdapterAccountDataSchema.NewAccountPersistenceSqlite(handler.GetDatabase())

	// 	if err != nil {
	// 		return nil, err
	// 	}

	// 	return clientPersistence, nil
	// }

	// if handler.GetDatabase().IsMysqlConnection() {
	// 	clientPersistence, err := drivenAdapterClientDataSchemaMysql.NewClientPersistenceMysql(handler.GetDatabase())

	// 	if err != nil {
	// 		return nil, err
	// 	}

	// 	return clientPersistence, nil
	// }

	return nil, errors.New(notValidDbmsOptionConst)
}
