package jsonResponse

import (
	"encoding/json"
)

func ThrowError(message string) []byte {
	errorStruct := struct {
		Message string `json:"message"`
	}{
		message,
	}

	jsonResponse, err := json.Marshal(errorStruct)

	if err != nil {
		return []byte(err.Error())
	}

	return jsonResponse
}
