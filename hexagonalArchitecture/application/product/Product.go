package application

import (
	"errors"
	"slices"

	"github.com/google/uuid"
)

const (
	DisabledStatusConst      = "disabled"
	EnabledStatusConst       = "enabled"
	EnableErrorMessageConst  = "the product cannot be enabled with the price lower than zero"
	DisableErrorMessageConst = "the product cannot be disabled with the price bigger than zero"
	NotValidIdErrorConst     = "the product id is not valid"
	NotValidNameErrorConst   = "the product name is not valid"
	NotValidStatusErrorConst = "the product status is not valid"
	NotValidPriceErrorConst  = "the product price is not valid"
)

type Product struct {
	Id     string
	Name   string
	Status string
	Price  float32
}

func NewProduct(
	name string,
	price float32,
) (*Product, error) {
	newProduct := Product{
		Id:     uuid.NewString(),
		Name:   name,
		Status: DisabledStatusConst,
		Price:  price,
	}

	if _, err := newProduct.IsValid(); err != nil {
		return nil, err
	}

	return &newProduct, nil
}

func (product *Product) IsValid() (bool, error) {
	if err := product.checkId(); err != nil {
		return false, err
	}

	if err := product.checkName(); err != nil {
		return false, err
	}

	if err := product.checkStatus(); err != nil {
		return false, err
	}

	if err := product.checkPrice(); err != nil {
		return false, err
	}

	return false, nil
}

func (product *Product) checkId() error {
	_, err := uuid.Parse(product.Id)

	if err != nil {
		return errors.New(NotValidIdErrorConst)
	}

	return nil
}

func (product *Product) checkName() error {
	if len(product.Name) == 0 || len(product.Name) > 255 {
		return errors.New(NotValidNameErrorConst)
	}

	return nil
}

func (product *Product) checkStatus() error {
	statusSlice := []string{DisabledStatusConst, EnabledStatusConst}

	if !slices.Contains(statusSlice, product.Status) {
		return errors.New(NotValidStatusErrorConst)
	}

	return nil
}

func (product *Product) checkPrice() error {
	if product.Price < 0 {
		return errors.New(NotValidPriceErrorConst)
	}

	return nil
}

func (product *Product) Enable() error {
	if product.Price < 0 {
		return errors.New(EnableErrorMessageConst)
	}

	product.Status = EnabledStatusConst

	return nil
}

func (product *Product) Disable() error {
	if product.Price != 0 {
		return errors.New(DisableErrorMessageConst)
	}

	product.Status = DisabledStatusConst

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

func (product *Product) SetPrice(price float32) error {
	product.Price = price

	_, err := product.IsValid()

	if err != nil {
		return err
	}

	return nil
}

func (product *Product) GetPrice() float32 {
	return product.Price
}
