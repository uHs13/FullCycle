package handler

import (
	"encoding/json"
	"goHexagonal/adapters/driving/dto"
	"goHexagonal/adapters/driving/http/jsonResponse"
	"goHexagonal/adapters/driving/http/routes"
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
		routes.GetProductById,
		n.With(negroni.Wrap(getProduct(productService))),
	).Methods(http.MethodGet, http.MethodOptions)

	router.Handle(
		routes.CreateProduct,
		n.With(negroni.Wrap(createProduct(productService))),
	).Methods(http.MethodPost, http.MethodOptions)

	router.Handle(
		routes.EnableProduct,
		n.With(negroni.Wrap(enableProduct(productService))),
	).Methods(http.MethodPatch, http.MethodOptions)

	router.Handle(
		routes.DisableProduct,
		n.With(negroni.Wrap(disableProduct(productService))),
	).Methods(http.MethodPatch, http.MethodOptions)

	router.Handle(
		routes.EditProduct,
		n.With(negroni.Wrap(editProduct(productService))),
	).Methods(http.MethodPatch, http.MethodOptions)
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

func createProduct(productService application_interface.ProductServiceInterface) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Contenty-Type", "application/json")

		var productDto dto.ProductDto

		if err := json.NewDecoder(request.Body).Decode(&productDto); err != nil {
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		product, err := productDto.ConvertData()

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		createdProduct, err := productService.Create(product.GetName(), product.GetPrice())

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		err = json.NewEncoder(writer).Encode(createdProduct)

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}
	})
}

func enableProduct(productService application_interface.ProductServiceInterface) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Contenty-Type", "application/json")

		variables := mux.Vars(request)

		id := variables["id"]

		var productDto dto.ProductDto

		productDto.Id = id

		product, err := productDto.ConvertId()

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		enabledProduct, err := productService.Enable(product)

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		err = json.NewEncoder(writer).Encode(enabledProduct)

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}
	})
}

func disableProduct(productService application_interface.ProductServiceInterface) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Contenty-Type", "application/json")

		variables := mux.Vars(request)

		id := variables["id"]

		var productDto dto.ProductDto

		productDto.Id = id

		product, err := productDto.ConvertId()

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		disabledProduct, err := productService.Disable(product)

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		err = json.NewEncoder(writer).Encode(disabledProduct)

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}
	})
}

func editProduct(productService application_interface.ProductServiceInterface) http.Handler {
	return http.HandlerFunc(func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Contenty-Type", "application/json")

		var productDto dto.ProductDto

		if err := json.NewDecoder(request.Body).Decode(&productDto); err != nil {
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		variables := mux.Vars(request)

		id := variables["id"]

		productDto.Id = id

		product, err := productDto.ConvertData()

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		updatedProduct, err := productService.Update(product)

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}

		err = json.NewEncoder(writer).Encode(updatedProduct)

		if err != nil {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write(jsonResponse.ThrowError(err.Error()))
			return
		}
	})
}
