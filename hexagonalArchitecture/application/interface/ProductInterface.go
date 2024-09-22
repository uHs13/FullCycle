package application_interface

type ProductInterface interface {
	IsValid() (bool, error)
	Enable() error
	Disable() error
	GetId() string
	SetName(name string) error
	GetName() string
	GetStatus() string
	SetPrice(price float32) error
	GetPrice() float32
}
