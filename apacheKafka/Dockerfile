FROM golang:1.26

RUN go install github.com/cosmtrek/air@v1.49.0
RUN apt-get update && apt-get install build-essential librdkafka-dev -y

WORKDIR /usr/src/app

COPY . .

RUN go mod tidy

CMD ["air"]
