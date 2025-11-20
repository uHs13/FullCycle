package http

import (
	"context"
	"fmt"
	"log"
	"microservices-wallet-core/adapters/driving/http/routes/account"
	"microservices-wallet-core/adapters/driving/http/routes/client"
	infraDataSchema "microservices-wallet-core/infra/dataSchema"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/handlers"
)

const (
	originLocalhostConst   = "http://localhost:3000"
	defaultServerPortConst = ":3000"
)

type HttpServer struct {
	server   *http.Server
	app      *gin.Engine
	database *infraDataSchema.Database
}

func NewHttpServer(database *infraDataSchema.Database) *HttpServer {
	gin.SetMode(gin.ReleaseMode)
	app := gin.Default()

	serverConfiguration := &http.Server{
		Addr: defaultServerPortConst,
	}

	return &HttpServer{
		serverConfiguration,
		app,
		database,
	}
}

func (httpServer *HttpServer) Start() error {
	httpServer.corsConfig()

	httpServer.registerRoutes()

	fmt.Printf("server running in port %s\n", defaultServerPortConst)

	httpServer.initialize()

	if err := httpServer.gracefulShutdown(); err != nil {
		return err
	}

	return nil
}

func (httpServer *HttpServer) corsConfig() {
	headers := handlers.AllowedHeaders([]string{
		"Origin",
		"Content-Type",
		"Accept",
		"Content-Length",
		"Accept-Language",
		"Accept-Encoding",
		"Connection",
		"Access-Control-Allow-Origin",
	})

	origins := handlers.AllowedOrigins([]string{
		originLocalhostConst,
	})

	methods := handlers.AllowedMethods([]string{
		http.MethodGet,
		http.MethodPost,
		http.MethodPut,
		http.MethodPatch,
		http.MethodDelete,
		http.MethodOptions,
	})

	credentials := handlers.AllowCredentials()

	corsHandler := handlers.CORS(headers, origins, methods, credentials)(httpServer.app)
	httpServer.server.Handler = corsHandler
}

func (httpServer *HttpServer) registerRoutes() {
	client.NewClientRoutes(httpServer.app, httpServer.database).Register()
	account.NewAccountRoutes(httpServer.app, httpServer.database).Register()
}

func (httpServer *HttpServer) initialize() {
	go func() {
		if err := httpServer.server.ListenAndServe(); err != nil {
			log.Fatal(err)
		}
	}()
}

func (httpServer *HttpServer) gracefulShutdown() error {
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt)

	<-quit
	fmt.Println("kill signal received, shutting down server...")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	if err := httpServer.server.Shutdown(ctx); err != nil {
		return err
	}

	fmt.Println("Server shutdown gracefully")
	return nil
}
