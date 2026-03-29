package kafka

type ProducerMemory struct {
}

func NewProducerMemory() *ProducerMemory {
	return &ProducerMemory{}
}

func (producer *ProducerMemory) Publish(msg interface{}, key []byte, topic string) error {
	return nil
}
