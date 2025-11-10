package dispatcher_test

import (
	"microservices-wallet-core/adapters/driven/event/dispatcher"
	"microservices-wallet-core/adapters/driven/event/event"
	"microservices-wallet-core/adapters/driven/event/eventHandler"
	"microservices-wallet-core/adapters/driven/event/mocks"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestShouldThrowAnErrorWhenHandlerIsAlreadyRegistered(t *testing.T) {
	const eventName = "eventName"
	eventHandler := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	err := eventDispatcher.Register(eventName, eventHandler)

	assert.Nil(t, err)

	err = eventDispatcher.Register(eventName, eventHandler)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "handler already registered")
}

func TestShouldProperlyRegisterAHandler(t *testing.T) {
	const eventName = "eventName"
	eventHandler := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	err := eventDispatcher.Register(eventName, eventHandler)

	assert.Nil(t, err)
}

func TestShouldProperlyRegisterMultipleHandlers(t *testing.T) {
	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	const eventNameTwo = "eventNameTwo"
	eventHandlerTwo := eventHandler.NewEventHandler()

	const eventNameThree = "eventNameThree"
	eventHandlerThree := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	err := eventDispatcher.Register(eventName, eventHandlerOne)
	assert.Nil(t, err)

	err = eventDispatcher.Register(eventNameTwo, eventHandlerTwo)
	assert.Nil(t, err)

	err = eventDispatcher.Register(eventNameThree, eventHandlerThree)
	assert.Nil(t, err)
}

func TestShouldProperlyClearAllTheRegisteredEvents(t *testing.T) {
	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	const eventNameTwo = "eventNameTwo"
	eventHandlerTwo := eventHandler.NewEventHandler()

	const eventNameThree = "eventNameThree"
	eventHandlerThree := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	err := eventDispatcher.Register(eventName, eventHandlerOne)
	assert.Nil(t, err)

	err = eventDispatcher.Register(eventNameTwo, eventHandlerTwo)
	assert.Nil(t, err)

	err = eventDispatcher.Register(eventNameThree, eventHandlerThree)
	assert.Nil(t, err)

	err = eventDispatcher.Clear()

	assert.Nil(t, err)
}

func TestShouldProperlyReturnFalseWhenDispatcherDoesNotHaveTheEventAndEventHandlerRegistered(t *testing.T) {
	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	assert.False(t, eventDispatcher.Has(eventName, eventHandlerOne))
}

func TestShouldProperlyReturnFalseWhenDispatcherDoesNotHaveTheEventHandlerRegisteredForThatEvent(t *testing.T) {
	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	eventHandlerTwo := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	err := eventDispatcher.Register(eventName, eventHandlerOne)

	assert.Nil(t, err)
	assert.False(t, eventDispatcher.Has(eventName, eventHandlerTwo))
}

func TestShouldProperlyReturnFalseWhenDispatcherDoesNotHaveTheEventNameRegistered(t *testing.T) {
	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	err := eventDispatcher.Register(eventName, eventHandlerOne)

	assert.Nil(t, err)
	assert.False(t, eventDispatcher.Has("eventNameTwo", eventHandlerOne))
}

func TestShouldProperlyReturnTrueWhenDispatcherHaveTheEventAndEventHandlerRegistered(t *testing.T) {
	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	eventDispatcher := dispatcher.NewEventDispatcher()

	err := eventDispatcher.Register(eventName, eventHandlerOne)

	assert.Nil(t, err)
	assert.True(t, eventDispatcher.Has(eventName, eventHandlerOne))
}

func TestShouldThrowAErrorWhenTryToDispatchANotRegisteredEvent(t *testing.T) {
	eventDispatcher := dispatcher.NewEventDispatcher()

	notRegisteredEvent := event.NewEvent("eventName")

	err := eventDispatcher.Dispatch(notRegisteredEvent)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "this event is not registered")
}

func TestShouldProperlyDispatchAEvent(t *testing.T) {
	eventDispatcher := dispatcher.NewEventDispatcher()

	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	registeredEvent := event.NewEvent(eventName)

	err := eventDispatcher.Register(eventName, eventHandlerOne)

	assert.Nil(t, err)

	err = eventDispatcher.Dispatch(registeredEvent)

	assert.Nil(t, err)
}

func TestShouldThrowAnErrorWhenTheDispatchedEventFail(t *testing.T) {
	eventDispatcher := dispatcher.NewEventDispatcher()

	const mockEventName = "mockEventName"
	mockEventHandler := mocks.NewMockEventHandler(true)

	mockEvent := mocks.NewMockEvent(mockEventName)

	err := eventDispatcher.Register(mockEventName, mockEventHandler)

	assert.Nil(t, err)

	err = eventDispatcher.Dispatch(mockEvent)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "generic error message")
}

func TestShouldProperlyRemoveARegisteredEventHandler(t *testing.T) {
	eventDispatcher := dispatcher.NewEventDispatcher()

	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	err := eventDispatcher.Register(eventName, eventHandlerOne)

	assert.Nil(t, err)

	err = eventDispatcher.Remove(eventName, eventHandlerOne)

	assert.Nil(t, err)
}

func TestShouldThrowAnErrorWhenTryToRemoveAnUnregisteredEventHandler(t *testing.T) {
	eventDispatcher := dispatcher.NewEventDispatcher()

	const eventName = "eventName"
	eventHandlerOne := eventHandler.NewEventHandler()

	err := eventDispatcher.Register(eventName, eventHandlerOne)

	assert.Nil(t, err)

	err = eventDispatcher.Remove("eventNameTwo", eventHandlerOne)

	assert.NotNil(t, err)
	assert.Equal(t, err.Error(), "this event is not registered")
}
