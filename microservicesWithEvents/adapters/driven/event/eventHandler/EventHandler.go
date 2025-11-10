package eventHandler

import (
	interfaces "microservices-wallet-core/core/port/event"
)

type EventHandler struct{}

func NewEventHandler() *EventHandler {
	return &EventHandler{}
}

func (eventHandler *EventHandler) Handle(event interfaces.EventInterface) error {
	return nil
}
