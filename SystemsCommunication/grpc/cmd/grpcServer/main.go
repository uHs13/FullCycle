package main

import (
	"fmt"
	"grpc/internal/database"
	"grpc/internal/dotenv"
	"grpc/internal/pb"
	"grpc/internal/service"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	protocol   = "tpc"
	serverPort = "50051"
)

func main() {
	if err := dotenv.Load(); err != nil {
		panic(err)
	}

	db, err := database.Connect()

	if err != nil {
		panic(err)
	}

	defer db.Close()

	categoryDb := database.NewCategory(db)
	categoryService := service.NewCategoryService(*categoryDb)

	grpcServer := grpc.NewServer()
	pb.RegisterCategoryServiceServer(grpcServer, categoryService)
	reflection.Register(grpcServer)

	listener, err := net.Listen(protocol, fmt.Sprintf(":%s", serverPort))

	if err != nil {
		panic(err)
	}

	if err := grpcServer.Serve(listener); err != nil {
		panic(err)
	}
}
