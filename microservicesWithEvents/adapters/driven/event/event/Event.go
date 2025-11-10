package event

import "time"

type Event struct {
	name     string
	dateTime time.Time
	payload  interface{}
}

func NewEvent(name string) *Event {
	return &Event{
		name: name,
	}
}

func (event *Event) GetName() string {
	return event.name
}

func (event *Event) GetDateTime() time.Time {
	return event.dateTime
}

func (event *Event) SetPayload(payload interface{}) {
	event.payload = payload
}

func (event *Event) GetPayload() interface{} {
	return event.payload
}
