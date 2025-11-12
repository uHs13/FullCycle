package clientHandler

import (
	"microservices-wallet-core/adapters/driving/http/handlers"
	"microservices-wallet-core/adapters/driving/http/routes"
	"net/http"

	"github.com/gin-gonic/gin"
)

type GetClientByIdHandler struct {
}

func NewGetClientByIdHandler() handlers.HandlerInterface {
	return &GetClientByIdHandler{}
}

func (getClientByIdHandler *GetClientByIdHandler) Handle(context *gin.Context) {
	jsonResponse := routes.NewJsonResponse(context)

	jsonResponse.SendJson("client", http.StatusOK, map[string]string{"key": "value"})
}
