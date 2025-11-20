package drivenAdapterAccountDataSchema

import (
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	_ "github.com/mattn/go-sqlite3"
)

const (
	findByIdQuery              = "SELECT id, clientId, balance FROM account WHERE id = ?"
	createQuery                = "INSERT INTO account (id, clientId, balance) VALUES (?, ?, ?)"
	alreadyExistForClientQuery = "SELECT EXISTS(SELECT id FROM account WHERE clientId = ?)"
)

type AccountPersistenceSqlite struct {
	Database *infraDataSchema.Database
}

func NewAccountPersistenceSqlite() (*AccountPersistenceSqlite, error) {
	database, err := infraDataSchema.NewDatabase("sqlite3")

	if err != nil {
		return nil, err
	}

	return &AccountPersistenceSqlite{
		Database: database,
	}, nil
}

func (persistence *AccountPersistenceSqlite) FindById(uuid string) (*AccountDto, error) {
	var accountDto AccountDto

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

func (persistence *AccountPersistenceSqlite) Create(account AccountDto) error {
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
	account *AccountDto,
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
