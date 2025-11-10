package drivenAdapterClientDataSchema

import "time"

type ClientDto struct {
	Id        string
	Name      string
	Email     string
	CreatedAt time.Time
}

func NewClientDto() *ClientDto {
	return &ClientDto{}
}
