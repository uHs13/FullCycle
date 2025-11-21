package drivenAdapterAccountDataSchemaMysql

import (
	drivenAdapterAccountDataSchema "microservices-wallet-core/adapters/driven/account/dataSchema"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
)

const (
	mysqlConst                 = "mysql"
	findByIdQuery              = "SELECT id, client_id, balance FROM account WHERE id = ?"
	createQuery                = "INSERT INTO account (id, client_id, balance) VALUES (?, ?, ?)"
	alreadyExistForClientQuery = "SELECT EXISTS(SELECT id FROM account WHERE client_id = ?)"
	depositQuery               = "UPDATE account SET balance = ? WHERE id = ?"
)

type AccountPersistenceMysql struct {
	Database *infraDataSchema.Database
}

func NewAccountPersistenceMysql(database *infraDataSchema.Database) (*AccountPersistenceMysql, error) {
	if database == nil {
		database, err := infraDataSchema.NewDatabase(mysqlConst)

		if err != nil {
			return nil, err
		}

		return &AccountPersistenceMysql{
			Database: database,
		}, nil
	}

	return &AccountPersistenceMysql{
		Database: database,
	}, nil
}

func (persistence *AccountPersistenceMysql) FindById(uuid string) (*drivenAdapterAccountDataSchema.AccountDto, error) {
	var accountDto drivenAdapterAccountDataSchema.AccountDto

	statement, err := persistence.Database.Connection.Prepare(findByIdQuery)

	if err != nil {
		return nil, err
	}

	err = statement.QueryRow(uuid).Scan(
		&accountDto.Id,
		&accountDto.ClientId,
		&accountDto.Balance,
	)

	defer statement.Close()

	if err != nil {
		return nil, err
	}

	return &accountDto, nil
}

func (persistence *AccountPersistenceMysql) Create(account *drivenAdapterAccountDataSchema.AccountDto) error {
	statement, err := persistence.Database.Connection.Prepare(createQuery)

	if err != nil {
		return err
	}

	_, err = statement.Exec(
		account.Id,
		account.ClientId,
		account.Balance,
	)

	defer statement.Close()

	if err != nil {
		return err
	}

	return nil
}

func (persistence *AccountPersistenceMysql) AlreadyExistForClient(
	account *drivenAdapterAccountDataSchema.AccountDto,
) (bool, error) {
	statement, err := persistence.Database.Connection.Prepare(alreadyExistForClientQuery)

	if err != nil {
		return false, err
	}

	var exist bool
	err = statement.QueryRow(account.ClientId).Scan(&exist)

	defer statement.Close()

	if err != nil {
		return false, err
	}

	return exist, nil
}

func (persistence *AccountPersistenceMysql) Deposit(
	account *drivenAdapterAccountDataSchema.AccountDto,
) error {
	statement, err := persistence.Database.Connection.Prepare(depositQuery)

	if err != nil {
		return err
	}

	_, err = statement.Exec(
		account.Balance,
		account.Id,
	)

	defer statement.Close()

	if err != nil {
		return err
	}

	return nil
}
