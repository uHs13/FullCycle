package cmd

import (
	"fmt"
	"log"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

type Producer struct {
	producer *kafka.Producer
}

func NewKafkaProducer() *Producer {
	configMap := &kafka.ConfigMap{
		"bootstrap.servers":   "apachekafka-kafka-1:9092",
		"delivery.timeout.ms": "2000",
		"acks":                "all",
		"enable.idempotence":  "true",
	}

	producer, err := kafka.NewProducer(configMap)

	if err != nil {
		log.Println(err.Error())
	}

	return &Producer{producer}
}

func (producer Producer) Publish(
	message string,
	topicName string,
	key []byte,
	deliveryChannel chan kafka.Event,
) error {
	kafkaMessage := &kafka.Message{
		Value: []byte(message),
		TopicPartition: kafka.TopicPartition{
			Topic:     &topicName,
			Partition: kafka.PartitionAny,
		},
		Key: key,
	}

	if err := producer.producer.Produce(kafkaMessage, deliveryChannel); err != nil {
		return err
	}

	producer.Flush()

	return nil
}

func (producer Producer) DeliveryReport(deliveryChannel chan kafka.Event) {
	for event := range deliveryChannel {
		switch receivedMessage := event.(type) {
		case *kafka.Message:
			if receivedMessage.TopicPartition.Error != nil {
				fmt.Println("Error in the message publish process")
			} else {
				fmt.Println("Message sucessfully published - ", receivedMessage.TopicPartition)
			}
		}
	}
}

func (producer Producer) Flush() {
	producer.producer.Flush(1000)
}
