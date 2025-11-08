package dispatcher

import (
	"errors"
	interfaces "eventDrivenArchitecture/interfaces"
)

const (
	handlerAlreadyRegisteredErrorMessage = "handler already registered"
	notRegisteredEventErrorMessage       = "this event is not registered"
)

type EventDispatcher struct {
	handlers map[string][]interfaces.EventHandlerInterface
}

func NewEventDispatcher() *EventDispatcher {
	return &EventDispatcher{
		handlers: make(map[string][]interfaces.EventHandlerInterface),
	}
}

func (eventDispatcher *EventDispatcher) Register(
	eventName string,
	handler interfaces.EventHandlerInterface,
) error {
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

func (eventDispatcher *EventDispatcher) Clear() error {
	eventDispatcher.handlers = make(map[string][]interfaces.EventHandlerInterface)

	return nil
}

func (eventDispatcher *EventDispatcher) Has(
	eventName string,
	handler interfaces.EventHandlerInterface,
) bool {
	if _, exist := eventDispatcher.handlers[eventName]; exist {
		for _, registeredHandler := range eventDispatcher.handlers[eventName] {
			if handler == registeredHandler {
				return true
			}
		}
	}

	return false
}

func (eventDispatcher *EventDispatcher) Dispatch(event interfaces.EventInterface) error {
	if _, exist := eventDispatcher.handlers[event.GetName()]; !exist {
		return errors.New(notRegisteredEventErrorMessage)
	}

	for _, registeredHandler := range eventDispatcher.handlers[event.GetName()] {
		err := registeredHandler.Handle(event)

		if err != nil {
			return err
		}
	}

	return nil
}

func (eventDispatcher *EventDispatcher) Remove(
	eventName string,
	handler interfaces.EventHandlerInterface,
) error {
	if _, exist := eventDispatcher.handlers[eventName]; !exist {
		return errors.New(notRegisteredEventErrorMessage)
	}

	for index, registeredHandler := range eventDispatcher.handlers[eventName] {
		if handler == registeredHandler {
			eventDispatcher.handlers[eventName] = append(
				eventDispatcher.handlers[eventName][:index],
				eventDispatcher.handlers[eventName][index+1:]...,
			)

			return nil
		}
	}

	return nil
}
