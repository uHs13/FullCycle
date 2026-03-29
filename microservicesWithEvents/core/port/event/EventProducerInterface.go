package portEvent

type EventProducerInterface interface {
	Publish(msg interface{}, key []byte, topic string) error
}
