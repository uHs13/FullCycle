package drivenAdapterTransactionDataSchema

type TransactionDto struct {
	Id            string
	AccountFromId string
	AccountToId   string
	Amount        float64
}

func NewTransactionDto() *TransactionDto {
	return &TransactionDto{}
}
