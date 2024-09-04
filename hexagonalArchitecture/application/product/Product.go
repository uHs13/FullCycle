package application

const (
	Disabled = "disabled"
	Enabled  = "enabled"
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
	return nil
}

func (product *Product) Disable() error {
	return nil
}

func (product *Product) GetId() string {
	return ""
}

func (product *Product) GetName() string {
	return ""
}

func (product *Product) GetStatus() string {
	return ""
}

func (product *Product) GetPrice() float32 {
	return 0
}
