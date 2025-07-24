package drivenAdapterTransactionDataSchema

import (
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	_ "github.com/mattn/go-sqlite3"
)

const (
	createQuery = "INSERT INTO transactions(id, accountFromId, accountToId, amount) VALUES (?, ?, ?, ?)"
)

type TransactionPersistenceSqlite struct {
	Database *infraDataSchema.Database
}

func NewTransactionPersistenceSqlite() (*TransactionPersistenceSqlite, error) {
	database, err := infraDataSchema.NewDatabase("sqlite3")

	if err != nil {
		return nil, err
	}

	return &TransactionPersistenceSqlite{
		Database: database,
	}, nil
}

func (persistence *TransactionPersistenceSqlite) Create(transaction TransactionDto) error {
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
