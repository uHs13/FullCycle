package eventTransaction

import "time"

type TransactionCreatedEvent struct {
	name     string
	dateTime time.Time
	payload  interface{}
}

const TransactionCreatedEventName = "TransactionCreated"

func NewTransactionCreatedEvent() *TransactionCreatedEvent {
	return &TransactionCreatedEvent{
		name: TransactionCreatedEventName,
	}
}

func (event *TransactionCreatedEvent) GetName() string {
	return event.name
}

func (event *TransactionCreatedEvent) GetDateTime() time.Time {
	return event.dateTime
}

func (event *TransactionCreatedEvent) SetPayload(payload interface{}) {
	event.payload = payload
}

func (event *TransactionCreatedEvent) GetPayload() interface{} {
	return event.payload
}
