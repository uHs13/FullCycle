package routes

import (
	"github.com/gin-gonic/gin"
)

type JsonResponse struct {
	*gin.Context
}

const (
	contentTypeConst     = "Content-Type"
	applicationJsonConst = "application/json"
	codeConst            = "code"
	messageConst         = "message"
	statusConst          = "status"
)

func NewJsonResponse(
	context *gin.Context,
) *JsonResponse {
	return &JsonResponse{
		Context: context,
	}
}

func (jsonResponse *JsonResponse) SendJson(
	key string,
	statusCode int,
	data interface{},
) {
	jsonResponse.Writer.Header().Set(contentTypeConst, applicationJsonConst)
	jsonResponse.Writer.WriteHeader(statusCode)

	jsonResponse.JSON(statusCode, map[string]interface{}{key: data})
}

func (jsonResponse *JsonResponse) ThrowCustomError(
	err error,
	statusCode int,
	context *gin.Context,
) {
	jsonResponse.Writer.Header().Set(contentTypeConst, applicationJsonConst)
	jsonResponse.Writer.WriteHeader(statusCode)

	jsonResponse.JSON(
		statusCode,
		map[string]interface{}{
			messageConst: err.Error(),
			statusConst:  statusCode,
		},
	)
}
