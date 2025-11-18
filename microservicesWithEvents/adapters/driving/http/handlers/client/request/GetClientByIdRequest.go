package clientHandlerRequest

import (
	"errors"

	"github.com/gin-gonic/gin"
)

const (
	invalidNameLengthConst  = "the name cannot be empty"
	invalidEmailLengthConst = "the email cannot be empty"
)

type GetClientByIdRequest struct {
	Name  string
	Email string
}

func NewGetClientByIdRequest(context *gin.Context) (*GetClientByIdRequest, error) {
	name := context.Query("name")
	email := context.Query("email")

	request := &GetClientByIdRequest{}

	if err := request.validate(name, email); err != nil {
		return nil, err
	}

	request.Name = name
	request.Email = email

	return request, nil
}

func (request *GetClientByIdRequest) validate(name string, email string) error {
	if len(name) == 0 {
		return errors.New(invalidNameLengthConst)
	}

	if len(email) == 0 {
		return errors.New(invalidEmailLengthConst)
	}

	return nil
}
