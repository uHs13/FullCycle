package useCaseTransaction

import (
	"errors"
	eventTransaction "microservices-wallet-core/adapters/driven/event/event/Transaction"
	eventHandlerTransaction "microservices-wallet-core/adapters/driven/event/eventHandler/Transaction"
	domainAccount "microservices-wallet-core/core/domain/account"
	domainTransaction "microservices-wallet-core/core/domain/transaction"
	portAccount "microservices-wallet-core/core/port/account"
	portEvent "microservices-wallet-core/core/port/event"
	portTransaction "microservices-wallet-core/core/port/transaction"
	"time"
)

const (
	accountNotFoundErrorMessage   = "account was not found"
	transactionCreateErrorMessage = "was not possible to create the transaction"
)

type CreateTransactionUseCaseInput struct {
	AccountFrom *domainAccount.Account
	AccountTo   *domainAccount.Account
	Amount      float64
}

type CreateTransactionUseCaseOutput struct {
	Id        string
	CreatedAt time.Time
}

type CreateTransactionUseCase struct {
	transactionPersistence portTransaction.TransactionPersistenceInterface
	accountPersistence     portAccount.AccountPersistenceInterface
	eventDispatcher        portEvent.EventDispatcherInterface
	event                  portEvent.EventInterface
	kafkaProducer          portEvent.EventProducerInterface
}

func NewCreateTransactionUseCase(
	transactionPersistence portTransaction.TransactionPersistenceInterface,
	accountPersistence portAccount.AccountPersistenceInterface,
	eventDispatcher portEvent.EventDispatcherInterface,
	event portEvent.EventInterface,
	kafkaProducer portEvent.EventProducerInterface,
) *CreateTransactionUseCase {
	return &CreateTransactionUseCase{
		transactionPersistence: transactionPersistence,
		accountPersistence:     accountPersistence,
		eventDispatcher:        eventDispatcher,
		event:                  event,
		kafkaProducer:          kafkaProducer,
	}
}

func (useCase *CreateTransactionUseCase) Execute(input CreateTransactionUseCaseInput) (*CreateTransactionUseCaseOutput, error) {
	accountFrom, err := useCase.accountPersistence.FindById(input.AccountFrom.Id)

	if err != nil {
		return nil, errors.New(accountNotFoundErrorMessage)
	}

	accountTo, err := useCase.accountPersistence.FindById(input.AccountTo.Id)

	if err != nil {
		return nil, errors.New(accountNotFoundErrorMessage)
	}

	transaction, err := domainTransaction.NewTransaction(accountFrom, accountTo, input.Amount)

	if err != nil {
		return nil, err
	}

	if err := transaction.Commit(); err != nil {
		return nil, err
	}

	if err := useCase.accountPersistence.UpdateBalance(transaction.AccountFrom); err != nil {
		return nil, err
	}

	if err := useCase.accountPersistence.UpdateBalance(transaction.AccountTo); err != nil {
		return nil, err
	}

	if err := useCase.transactionPersistence.Create(*transaction); err != nil {
		return nil, errors.New(transactionCreateErrorMessage)
	}

	output := &CreateTransactionUseCaseOutput{
		Id:        transaction.Id.GetValue(),
		CreatedAt: transaction.CreatedAt,
	}

	eventHander := eventHandlerTransaction.NewTransactionCreatedHandler(useCase.kafkaProducer)
	useCase.event.SetPayload(output)
	useCase.eventDispatcher.Register(eventTransaction.TransactionCreatedEventName, eventHander)
	useCase.eventDispatcher.Dispatch(useCase.event)

	return output, nil
}
