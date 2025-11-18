package clientHandlerRequest

import (
	"encoding/json"
	"errors"

	"github.com/gin-gonic/gin"
)

const (
	invalidNameLengthConst  = "the name cannot be empty"
	invalidEmailLengthConst = "the email cannot be empty"
)

type CreateClientRequest struct {
	Name  string
	Email string
}

func NewCreateClientRequest(context *gin.Context) (*CreateClientRequest, error) {
	request := &CreateClientRequest{}

	if err := json.NewDecoder(context.Request.Body).Decode(&request); err != nil {
		return nil, err
	}

	if err := request.validate(); err != nil {
		return nil, err
	}

	return request, nil
}

func (request *CreateClientRequest) validate() error {
	if len(request.Name) == 0 {
		return errors.New(invalidNameLengthConst)
	}

	if len(request.Email) == 0 {
		return errors.New(invalidEmailLengthConst)
	}

	return nil
}
