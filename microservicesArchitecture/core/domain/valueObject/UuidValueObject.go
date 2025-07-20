package valueObject

import (
	"microservices-wallet-core/infra/uuid"
)

type UuidValueObject struct {
	value string
}

func NewUuidValueObject() *UuidValueObject {
	return &UuidValueObject{
		value: uuid.NewUuidGenerator().Generate(),
	}
}

func MakeFromString(value string) (*UuidValueObject, error) {
	validator := uuid.NewUuidGenerator()

	if err := validator.Validate(value); err != nil {
		return nil, err
	}

	return &UuidValueObject{
		value: value,
	}, nil
}

func (uuid *UuidValueObject) GetValue() string {
	return uuid.value
}
