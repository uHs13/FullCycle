package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"os"
	"time"
)

var startedAt = time.Now()

func main() {
	http.HandleFunc("/", HelloWorld)
	http.HandleFunc("/env", EnvConfig)
	http.HandleFunc("/fruits", Fruits)
	http.HandleFunc("/secret", Secret)
	http.HandleFunc("/healthz", Healthz)

	if err := http.ListenAndServe(":3000", nil); err != nil {
		panic(err)
	}
}

func HelloWorld(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello World!"))
}

func EnvConfig(w http.ResponseWriter, r *http.Request) {
	pseudoRandomInteger := rand.Intn(100)
	pseudoRandomFloat := rand.Float64()

	nameFromEnv := os.Getenv("NAME")
	colorFromEnv := os.Getenv("COLOR")

	html := `
		<h1>Using Kubernetes env variables in the application</h1>
		<ol>
			<li>Pseudo Random Integer: %d</li>
			<li>Pseudo Random Float: %f</li>
			<li>Name from env: <span style="font-weight:bold">%s</span></li>
			<li>Color from env: <span style="color:#FF5C00;font-weight:bold">%s</span></li>
		<ol>
	`

	fmt.Fprintf(
		w,
		html,
		pseudoRandomInteger,
		pseudoRandomFloat,
		nameFromEnv,
		colorFromEnv,
	)
}

func Fruits(w http.ResponseWriter, r *http.Request) {
	data, err := os.ReadFile("fruits/fruits.txt")

	if err != nil {
		log.Fatalf("Error reading file: %s", err.Error())
	}

	html := `<div>Some fruits: %s</div>`

	fmt.Fprintf(w, html, string(data))
}

func Secret(w http.ResponseWriter, r *http.Request) {
	userFromEnv := os.Getenv("USER")
	passwordFromEnv := os.Getenv("PASSWORD")

	html := `
		<h1>Kubernetes Secret</h1>
		<ol>
			<li>User: %s</li>
			<li>Password: %s</li>
		</ol>
	`

	fmt.Fprintf(w, html, userFromEnv, passwordFromEnv)
}

func Healthz(w http.ResponseWriter, r *http.Request) {
	duration := time.Since(startedAt)

	if duration.Seconds() < 10 {
		w.WriteHeader(500)
		w.Write([]byte(fmt.Sprintf("Duration: %f", duration.Seconds())))
	} else {
		w.WriteHeader(200)
		w.Write([]byte("Ok"))
	}
}
