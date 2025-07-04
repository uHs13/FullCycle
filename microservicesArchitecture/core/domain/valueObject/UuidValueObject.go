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

func (uuid *UuidValueObject) GetValue() string {
	return uuid.value
}
