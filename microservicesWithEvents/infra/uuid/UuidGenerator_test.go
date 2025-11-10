package uuid_test

import (
	"microservices-wallet-core/infra/uuid"
	"testing"

	"github.com/stretchr/testify/require"

	googleUuid "github.com/google/uuid"
)

func TestShouldProperlyGenerateAnUuid(t *testing.T) {
	uuidGenerator := uuid.NewUuidGenerator()

	uuid := uuidGenerator.Generate()

	err := googleUuid.Validate(uuid)

	require.NotEmpty(t, uuid)
	require.Nil(t, err)
}

func TestShouldThrowAnErrorWhenUuidIsInvalid(t *testing.T) {
	uuidGenerator := uuid.NewUuidGenerator()

	err := uuidGenerator.Validate("invalid-uuid")

	require.NotNil(t, err)
	require.Equal(t, err.Error(), "invalid uuid")
}

func TestShouldProperlyValidateUuid(t *testing.T) {
	uuidGenerator := uuid.NewUuidGenerator()

	err := uuidGenerator.Validate("db819795-a5c8-4a0c-a644-a21cbce25376")

	require.Nil(t, err)
}
