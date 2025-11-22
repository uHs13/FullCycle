package accountHandlerRequest

import (
	"encoding/json"
	"errors"

	"github.com/gin-gonic/gin"
)

const (
	invalidIdLengthConst = "the account id cannot be empty"
	invalidAmountConst   = "the amount cannot be zero or negative"
)

type DepositInAccountRequest struct {
	AccountId string  `json:"account_id"`
	Amount    float64 `json:"amount"`
}

func NewDepositInAccountRequest(context *gin.Context) (*DepositInAccountRequest, error) {
	request := &DepositInAccountRequest{}

	if err := json.NewDecoder(context.Request.Body).Decode(&request); err != nil {
		return nil, err
	}

	if err := request.validate(); err != nil {
		return nil, err
	}

	return request, nil
}

func (request *DepositInAccountRequest) validate() error {
	if len(request.AccountId) == 0 {
		return errors.New(invalidIdLengthConst)
	}

	if request.Amount <= 0.0 {
		return errors.New(invalidAmountConst)
	}

	return nil
}
