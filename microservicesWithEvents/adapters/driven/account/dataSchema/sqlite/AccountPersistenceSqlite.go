package drivenAdapterAccountDataSchemaSqlite

import (
	drivenAdapterAccountDataSchema "microservices-wallet-core/adapters/driven/account/dataSchema"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	_ "github.com/mattn/go-sqlite3"
)

const (
	findByIdQuery              = "SELECT id, clientId, balance FROM account WHERE id = ?"
	createQuery                = "INSERT INTO account (id, clientId, balance) VALUES (?, ?, ?)"
	alreadyExistForClientQuery = "SELECT EXISTS(SELECT id FROM account WHERE clientId = ?)"
	depositQuery               = "UPDATE account SET balance = ? WHERE id = ?"
)

type AccountPersistenceSqlite struct {
	Database *infraDataSchema.Database
}

func NewAccountPersistenceSqlite(database *infraDataSchema.Database) (*AccountPersistenceSqlite, error) {
	if database == nil {
		database, err := infraDataSchema.NewDatabase("sqlite3")

		if err != nil {
			return nil, err
		}

		return &AccountPersistenceSqlite{
			Database: database,
		}, nil
	}

	return &AccountPersistenceSqlite{
		Database: database,
	}, nil
}

func (persistence *AccountPersistenceSqlite) FindById(uuid string) (*drivenAdapterAccountDataSchema.AccountDto, error) {
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

func (persistence *AccountPersistenceSqlite) Create(account *drivenAdapterAccountDataSchema.AccountDto) error {
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

func (persistence *AccountPersistenceSqlite) AlreadyExistForClient(
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

func (persistence *AccountPersistenceSqlite) Deposit(
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
