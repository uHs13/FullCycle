package db

import (
	"database/sql"
	application_interface "goHexagonal/application/interface"
	application "goHexagonal/application/product"

	_ "github.com/mattn/go-sqlite3"
)

type ProductDatabase struct {
	db *sql.DB
}

const (
	getProductQuery = "SELECT id, name, price, status FROM product WHERE id = ?"
)

func (productDatabase *ProductDatabase) Get(id string) (application_interface.ProductInterface, error) {
	var product application.Product

	statement, err := productDatabase.db.Prepare(getProductQuery)

	if err != nil {
		return nil, err
	}

	err = statement.QueryRow(id).Scan(
		&product.Id,
		&product.Name,
		&product.Price,
		&product.Status,
	)

	if err != nil {
		return nil, err
	}

	return &product, nil
}
