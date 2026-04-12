package main

import (
	"apacheKafka/cmd"
	"fmt"
	"time"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

func main() {
	message := fmt.Sprintf("Hello World and Apache Kafka! - %s", time.Now().Format("2006-01-02 15:04:05"))

	producer := cmd.NewKafkaProducer()

	deliveryChannel := make(chan kafka.Event)

	producer.Publish(
		message,
		"teste",
		[]byte("transfers"),
		deliveryChannel,
	)

	go producer.DeliveryReport(deliveryChannel)

	producer.Flush()
}
