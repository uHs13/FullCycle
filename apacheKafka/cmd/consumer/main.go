package main

import (
	"fmt"
	"log"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

func main() {
	fmt.Println("Hello World Consumer!")
	configMap := &kafka.ConfigMap{
		"bootstrap.servers": "apachekafka-kafka-1:9092",
		"client.id":         "goapp-consumer",
		"group.id":          "goapp-group",
		"auto.offset.reset": "earliest",
	}

	consumer, err := kafka.NewConsumer(configMap)

	if err != nil {
		log.Println(err.Error())
	}

	topics := []string{"teste"}

	consumer.SubscribeTopics(topics, nil)

	for {
		msg, err := consumer.ReadMessage(-1)

		if err == nil {
			formattedMessage := "consumed message -> %s"
			fmt.Println(fmt.Sprintf(formattedMessage, string(msg.Value)), msg.TopicPartition)
		}
	}
}
