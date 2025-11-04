package dispatcher

import (
	"errors"
	interfaces "eventDrivenArchitecture/interfaces"
)

const (
	handlerAlreadyRegisteredErrorMessage = "handler already registered"
)

type EventDispatcher struct {
	handlers map[string][]interfaces.EventHandlerInterface
}

func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		handlers: make(map[string][]interfaces.EventHandlerInterface),
	}
}

func (eventDispatcher *EventDispatcher) Register(eventName string, handler interfaces.EventHandlerInterface) error {
	if _, exist := eventDispatcher.handlers[eventName]; exist {
		for _, registeredHandler := range eventDispatcher.handlers[eventName] {
			if handler == registeredHandler {
				return errors.New(handlerAlreadyRegisteredErrorMessage)
			}
		}
	}

	eventDispatcher.handlers[eventName] = append(eventDispatcher.handlers[eventName], handler)

	return nil
}
