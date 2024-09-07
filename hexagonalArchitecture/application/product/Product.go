package application

import "errors"

const (
	DisabledStatusConst     = "disabled"
	EnabledStatusConst      = "enabled"
	EnableErrorMessageConst = "the product cannot be enabled with the price lower than zero"
)

type Product struct {
	Id     string
	Name   string
	Status string
	Price  float32
}

func (product *Product) IsValid() (bool, error) {
	return false, nil
}

func (product *Product) Enable() error {
	if product.Price < 0 {
		return errors.New(EnableErrorMessageConst)
	}

	product.Status = EnabledStatusConst

	return nil
}

func (product *Product) Disable() error {
	return nil
}

func (product *Product) GetId() string {
	return product.Id
}

func (product *Product) GetName() string {
	return product.Name
}

func (product *Product) GetStatus() string {
	return product.Status
}

func (product *Product) GetPrice() float32 {
	return product.Price
}
