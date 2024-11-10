package handler

import (
	"encoding/json"
	application_interface "goHexagonal/application/interface"
	"net/http"

	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"
)

func MakeProductHandlers(
	router *mux.Router,
	n *negroni.Negroni,
	productService application_interface.ProductServiceInterface,
) {
	router.Handle(
		"/product/{id}",
		n.With(negroni.Wrap(getProduct(productService))),
	).Methods(http.MethodGet, http.MethodOptions)
}

func getProduct(productService application_interface.ProductServiceInterface) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Content-Type", "application/json")

		variables := mux.Vars(request)

		id := variables["id"]

		product, err := productService.Get(id)

		if err != nil {
			writer.WriteHeader(http.StatusNotFound)
		}

		err = json.NewEncoder(writer).Encode(product)

		if err != nil {
			writer.WriteHeader(http.StatusInternalServerError)
		}
	})
}
