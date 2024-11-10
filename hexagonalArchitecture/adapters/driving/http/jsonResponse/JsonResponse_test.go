package jsonResponse_test

import (
	"goHexagonal/adapters/driving/http/jsonResponse"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestShouldProperlyCreateJsonErrorMessage(t *testing.T) {
	var message string = "Some Test Message"

	result := jsonResponse.ThrowError(message)

	require.Equal(t, []byte(`{"message":"Some Test Message"}`), result)
}
