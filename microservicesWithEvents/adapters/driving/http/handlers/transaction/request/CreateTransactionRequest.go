package transactionHandlerRequest

import (
	"encoding/json"
	"errors"

	"github.com/gin-gonic/gin"
)

const (
	invalidAccountIdFromLengthConst = "the account id from cannot be empty"
	invalidAccountIdToLengthConst   = "the account id to cannot be empty"
	invalidAmountConst              = "the amount cannot be zero or negative"
)

type CreateTransactionRequest struct {
	AccountIdFrom string  `json:"account_id_from"`
	AccountIdTo   string  `json:"account_id_to"`
	Amount        float64 `json:"amount"`
}

func NewCreateTransactionRequest(context *gin.Context) (*CreateTransactionRequest, error) {
	request := &CreateTransactionRequest{}

	if err := json.NewDecoder(context.Request.Body).Decode(&request); err != nil {
		return nil, err
	}

	if err := request.validate(); err != nil {
		return nil, err
	}

	return request, nil
}

func (request *CreateTransactionRequest) validate() error {
	if len(request.AccountIdFrom) == 0 {
		return errors.New(invalidAccountIdFromLengthConst)
	}

	if len(request.AccountIdTo) == 0 {
		return errors.New(invalidAccountIdToLengthConst)
	}

	if request.Amount <= 0.0 {
		return errors.New(invalidAmountConst)
	}

	return nil
}
