package valueObject_test

import (
	"microservices-wallet-core/core/domain/valueObject"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyCreateAnUuid(t *testing.T) {
	uuid := valueObject.NewUuidValueObject()

	assert.NotNil(t, uuid)
	assert.NotNil(t, uuid.GetValue())
}

func TestShouldProperlyMakeFromString(t *testing.T) {
	uuid, err := valueObject.MakeFromString("db819795-a5c8-4a0c-a644-a21cbce25376")

	assert.Nil(t, err)
	assert.NotNil(t, uuid)
}

func TestShouldThrowAnErrorWhenMakeFromInvalidString(t *testing.T) {
	uuid, err := valueObject.MakeFromString("invalid-uuid")

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "invalid uuid")
	assert.Nil(t, uuid)
}
