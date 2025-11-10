package portTransaction

import domainTransaction "microservices-wallet-core/core/domain/transaction"

type TransactionPersistenceInterface interface {
	Create(transaction domainTransaction.Transaction) error
}
