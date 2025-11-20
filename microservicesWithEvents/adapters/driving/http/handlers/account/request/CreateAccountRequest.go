package accountHandlerRequest

import (
	"encoding/json"
	"errors"

	"github.com/gin-gonic/gin"
)

const (
	invalidClientIdLengthConst = "the client id cannot be empty"
)

type CreateAccountRequest struct {
	ClientId string `json:"client_id"`
}

func NewCreateAccountRequest(context *gin.Context) (*CreateAccountRequest, error) {
	request := &CreateAccountRequest{}

	if err := json.NewDecoder(context.Request.Body).Decode(&request); err != nil {
		return nil, err
	}

	if err := request.validate(); err != nil {
		return nil, err
	}

	return request, nil
}

func (request *CreateAccountRequest) validate() error {
	if len(request.ClientId) == 0 {
		return errors.New(invalidClientIdLengthConst)
	}

	return nil
}
