package drivenAdapterTransactionDataSchemaMysql

import (
	drivenAdapterTransactionDataSchema "microservices-wallet-core/adapters/driven/transaction/dataSchema"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

const (
	mysqlConst  = "mysql"
	createQuery = "INSERT INTO transaction(id, account_id_from, account_id_to, amount) VALUES (?, ?, ?, ?)"
)

type TransactionPersistenceMysql struct {
	Database *infraDataSchema.Database
}

func NewTransactionPersistenceMysql(database *infraDataSchema.Database) (*TransactionPersistenceMysql, error) {
	if database == nil {
		database, err := infraDataSchema.NewDatabase(mysqlConst)

		if err != nil {
			return nil, err
		}

		return &TransactionPersistenceMysql{
			Database: database,
		}, nil
	}

	return &TransactionPersistenceMysql{
		Database: database,
	}, nil
}

func (persistence *TransactionPersistenceMysql) Create(transaction drivenAdapterTransactionDataSchema.TransactionDto) error {
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
