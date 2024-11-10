package dto

import (
	application "goHexagonal/application/product"
)

type ProductDto struct {
	Id     string  `json:"id"`
	Name   string  `json:"name"`
	Status string  `json:"status"`
	Price  float32 `json:"price"`
}

func NewProductDto() *ProductDto {
	return &ProductDto{}
}

func (productDto *ProductDto) ConvertData() (*application.Product, error) {
	product := application.Product{}
	var err error

	if productDto.Id != "" {
		if err = product.SetId(productDto.Id); err != nil {
			return nil, err
		}
	}

	if err = product.SetName(productDto.Name); err != nil {
		return nil, err
	}

	if err = product.SetPrice(productDto.Price); err != nil {
		return nil, err
	}

	if productDto.Status != "" {
		if err = product.SetStatus(productDto.Status); err != nil {
			return nil, err
		}
	}

	return &product, nil
}
