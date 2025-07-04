package uuid

import (
	googleUuid "github.com/google/uuid"
)

type UuidGenerator struct{}

func NewUuidGenerator() *UuidGenerator {
	return &UuidGenerator{}
}

func (uuidGenerator *UuidGenerator) Generate() string {
	return googleUuid.NewString()
}
