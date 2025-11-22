package drivenAdapterTransactionDataSchemaSqlite

import (
	drivenAdapterTransactionDataSchema "microservices-wallet-core/adapters/driven/transaction/dataSchema"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	_ "github.com/mattn/go-sqlite3"
)

const (
	sqliteConst = "sqlite3"
	createQuery = "INSERT INTO transactions(id, accountFromId, accountToId, amount) VALUES (?, ?, ?, ?)"
)

type TransactionPersistenceSqlite struct {
	Database *infraDataSchema.Database
}

func NewTransactionPersistenceSqlite(database *infraDataSchema.Database) (*TransactionPersistenceSqlite, error) {
	if database == nil {
		database, err := infraDataSchema.NewDatabase(sqliteConst)

		if err != nil {
			return nil, err
		}

		return &TransactionPersistenceSqlite{
			Database: database,
		}, nil
	}

	return &TransactionPersistenceSqlite{
		Database: database,
	}, nil
}

func (persistence *TransactionPersistenceSqlite) Create(transaction drivenAdapterTransactionDataSchema.TransactionDto) error {
	statement, err := persistence.Database.Connection.Prepare(createQuery)

	if err != nil {
		return err
	}

	_, err = statement.Exec(
		transaction.Id,
		transaction.AccountFromId,
		transaction.AccountToId,
		transaction.Amount,
	)

	defer statement.Close()

	if err != nil {
		return err
	}

	return nil
}
