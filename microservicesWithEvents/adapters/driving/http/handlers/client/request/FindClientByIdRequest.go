package clientHandlerRequest

import (
	"errors"

	"github.com/gin-gonic/gin"
)

const (
	invalidUuidLengthConst = "the id cannot be empty"
)

type FindClientByIdRequest struct {
	Uuid string
}

func NewFindClientByIdRequest(context *gin.Context) (*FindClientByIdRequest, error) {
	request := &FindClientByIdRequest{}

	uuid := context.Query("id")

	if err := request.validate(uuid); err != nil {
		return nil, err
	}

	request.Uuid = uuid

	return request, nil
}

func (request *FindClientByIdRequest) validate(uuid string) error {
	if len(uuid) == 0 {
		return errors.New(invalidUuidLengthConst)
	}

	return nil
}
