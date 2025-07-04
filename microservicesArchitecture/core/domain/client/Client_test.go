package domainClient_test

import (
	domainClient "microservices-wallet-core/core/domain/client"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldProperlyCreateAClient(t *testing.T) {
	name := "John Cena"
	email := "john.cena@email.com"

	client, err := domainClient.NewClient(name, email)

	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.Equal(t, client.Name, name)
	assert.Equal(t, client.Email, email)
	assert.NotNil(t, client.CreatedAt)
}

func TestShouldThrowAnErrorWhenClientNameIsInvalid(t *testing.T) {
	_, err := domainClient.NewClient("", "john.cena@email.com")

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the name must contain at least one letter")
}

func TestShouldThrowAnErrorWhenClientEmailIsInvalid(t *testing.T) {
	_, err := domainClient.NewClient("John Cena", "")

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the email must contain at least one letter")
}
