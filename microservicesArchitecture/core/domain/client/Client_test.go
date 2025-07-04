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

func TestShouldThrowAnErrorWhenTryToUpdateClientWithInvalidName(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	err = client.Update("", "john.cena2@email.com")

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the name must contain at least one letter")
}

func TestShouldThrowAnErrorWhenTryToUpdateClientWithInvalidEmail(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	err = client.Update("John Cena 2", "")

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "the email must contain at least one letter")
}

func TestShouldProperlyUpdateAClient(t *testing.T) {
	client, err := domainClient.NewClient("John Cena", "john.cena@email.com")

	assert.Nil(t, err)
	assert.NotNil(t, client)

	updatedName := "John Cena 2"
	updatedEmail := "john.cena2@gmail.com"
	err = client.Update(updatedName, updatedEmail)

	assert.Nil(t, err)
	assert.NotNil(t, client)
	assert.Equal(t, client.Name, updatedName)
	assert.Equal(t, client.Email, updatedEmail)
	assert.NotNil(t, client.UpdateAt)
}
