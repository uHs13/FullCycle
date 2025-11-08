package eventHandler

import "eventDrivenArchitecture/interfaces"

type EventHandler struct{}

func NewEventHandler() *EventHandler {
	return &EventHandler{}
}

func (eventHandler *EventHandler) Handle(event interfaces.EventInterface) error {
	return nil
}
