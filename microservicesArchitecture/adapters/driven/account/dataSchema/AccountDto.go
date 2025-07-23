package drivenAdapterAccountDataSchema

import (
	"time"
)

type AccountDto struct {
	Id        string
	ClientId  string
	Balance   float64
	CreatedAt time.Time
}

func NewAccountDto() *AccountDto {
	return &AccountDto{}
}
