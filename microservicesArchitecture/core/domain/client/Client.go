package domainClient

import (
	"errors"
	"microservices-wallet-core/core/domain/valueObject"
	"time"
)

const (
	invalidNameLengthError  = "the name must contain at least one letter"
	invalidEmailLengthError = "the email must contain at least one letter"
)

type Client struct {
	Id        valueObject.UuidValueObject
	Name      string
	Email     string
	CreatedAt time.Time
	UpdateAt  time.Time
}

func NewClient(
	name string,
	email string,
) (*Client, error) {
	client := &Client{
		Id:        *valueObject.NewUuidValueObject(),
		Name:      name,
		Email:     email,
		CreatedAt: time.Now(),
	}

	if err := client.Validate(); err != nil {
		return nil, err
	}

	return client, nil
}

func (client *Client) Validate() error {
	if len(client.Name) == 0 {
		return errors.New(invalidNameLengthError)
	}

	if len(client.Email) == 0 {
		return errors.New(invalidEmailLengthError)
	}

	return nil
}

func (client *Client) Update(name string, email string) error {
	client.Name = name
	client.Email = email
	client.UpdateAt = time.Now()

	if err := client.Validate(); err != nil {
		return err
	}

	return nil
}
