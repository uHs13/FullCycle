package handlers

import (
	infraDataSchema "microservices-wallet-core/infra/dataSchema"

	"github.com/gin-gonic/gin"
)

type HandlerInterface interface {
	Handle(c *gin.Context)
	GetDatabase() *infraDataSchema.Database
}
