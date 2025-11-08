package mocks

import (
	"time"
)

type MockEvent struct {
	name     string
	dateTime time.Time
	payload  interface{}
}

func NewMockEvent(name string) *MockEvent {
	return &MockEvent{
		name: name,
	}
}

func (event *MockEvent) GetName() string {
	return event.name
}

func (event *MockEvent) GetDateTime() time.Time {
	return event.dateTime
}

func (event *MockEvent) GetPayload() interface{} {
	return event.payload
}
