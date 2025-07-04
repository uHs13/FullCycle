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
