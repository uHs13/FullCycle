package eventHandlerTransaction

import (
	"fmt"
	interfaces "microservices-wallet-core/core/port/event"
	portEvent "microservices-wallet-core/core/port/event"
)

const transactions = "transactions"

type TransactionCreatedHandler struct {
	producer portEvent.EventProducerInterface
}

func NewTransactionCreatedHandler(producer portEvent.EventProducerInterface) *TransactionCreatedHandler {
	return &TransactionCreatedHandler{
		producer: producer,
	}
}

func (eventHandler *TransactionCreatedHandler) Handle(event interfaces.EventInterface) error {
	if err := eventHandler.producer.Publish(event.GetPayload(), nil, transactions); err != nil {
		return err
	}

	fmt.Println("-----------")
	fmt.Println("EVENT PUBLISHED")
	fmt.Println("-----------")

	return nil
}
