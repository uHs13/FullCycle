package application_interface

type ProductInterface interface {
	IsValid() (bool, error)
	Enable() error
	Disable() error
	SetId(id string) error
	GetId() string
	SetName(name string) error
	GetName() string
	SetStatus(status string) error
	GetStatus() string
	SetPrice(price float32) error
	GetPrice() float32
}
