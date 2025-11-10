package uuid

import (
	"errors"

	googleUuid "github.com/google/uuid"
)

const (
	invalidUuidErrorMessage = "invalid uuid"
)

type UuidGenerator struct{}

func NewUuidGenerator() *UuidGenerator {
	return &UuidGenerator{}
}

func (uuidGenerator *UuidGenerator) Generate() string {
	return googleUuid.NewString()
}

func (uuidGenerator *UuidGenerator) Validate(uuid string) error {
	if err := googleUuid.Validate(uuid); err != nil {
		return errors.New(invalidUuidErrorMessage)
	}

	return nil
}
