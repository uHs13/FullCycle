package httpServer

import (
	"fmt"
	"goHexagonal/adapters/driving/http/handler"
	application_interface "goHexagonal/application/interface"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

type HttpServer struct {
	Service application_interface.ProductServiceInterface
}

func NewHttpServer(service application_interface.ProductServiceInterface) *HttpServer {
	return &HttpServer{
		Service: service,
	}
}

func (httpServer *HttpServer) Start() error {
	muxRouter := mux.NewRouter()
	negroniMiddleware := negroni.New(negroni.NewLogger())

	handler.MakeProductHandlers(muxRouter, negroniMiddleware, httpServer.Service)
	http.Handle("/", muxRouter)

	server := &http.Server{
		ReadHeaderTimeout: 10 * time.Second,
		WriteTimeout:      10 * time.Second,
		Addr:              ":3000",
		Handler:           http.DefaultServeMux,
		ErrorLog:          log.New(os.Stderr, "log: ", log.Lshortfile),
	}

	fmt.Println(`The http server has been started in the port ":3000"`)

	err := server.ListenAndServe()

	if err != nil {
		return err
	}

	return nil
}
