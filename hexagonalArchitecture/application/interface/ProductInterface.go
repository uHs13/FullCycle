package application_interface

type ProductInterface interface {
	IsValid() (bool, error)
	Enable() error
	Disable() error
	GetId() string
	GetName() string
	GetStatus() string
	SetPrice(price float32) error
	GetPrice() float32
}
