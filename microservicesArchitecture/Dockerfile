FROM golang:1.23

RUN apt-get update && apt-get install sqlite3 -y

RUN go install github.com/cosmtrek/air@v1.49.0
RUN go install gotest.tools/gotestsum@v1.12.0

WORKDIR /usr/src/app

COPY . .

RUN go mod tidy

CMD ["air"]
