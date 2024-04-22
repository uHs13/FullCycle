FROM golang:1.22.1-alpine

WORKDIR /usr/src/app

RUN apk update
RUN apk add protobuf

RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
RUN go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
RUN go install github.com/ktr0731/evans@latest
RUN go install github.com/cosmtrek/air@latest

COPY . .

RUN go mod tidy

CMD ["air"]