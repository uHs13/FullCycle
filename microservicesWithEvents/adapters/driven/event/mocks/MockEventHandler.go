package mocks

import (
	"errors"
	interfaces "microservices-wallet-core/core/port/event"
)

const genericErrorMessage = "generic error message"

type MockEventHandler struct {
	shouldThrowErrorOnHandle bool
}

func NewMockEventHandler(shouldThrowErrorOnHandle bool) *MockEventHandler {
	return &MockEventHandler{
		shouldThrowErrorOnHandle: shouldThrowErrorOnHandle,
	}
}

func (eventHandler *MockEventHandler) Handle(event interfaces.EventInterface) error {
	if eventHandler.shouldThrowErrorOnHandle {
		return errors.New(genericErrorMessage)
	}

	return nil
}
