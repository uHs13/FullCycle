FROM golang:1.22.1-alpine

WORKDIR /usr/src/app

RUN go install github.com/cosmtrek/air@v1.49.0

COPY . .

RUN go mod download && go mod verify

CMD ["air"]