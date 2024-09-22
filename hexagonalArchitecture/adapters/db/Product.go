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
	getProductQuery          = "SELECT id, name, price, status FROM product WHERE id = ?"
	createProductQuery       = "INSERT INTO product(id, name, price, status) VALUES (?, ?, ?, ?)"
	updateProductQuery       = "UPDATE product SET name = ?, price = ? WHERE id = ?"
	updateProductStatusQuery = "UPDATE product SET status = ? WHERE id = ?"
)

func NewProductDatabase(database *sql.DB) *ProductDatabase {
	return &ProductDatabase{
		db: database,
	}
}

func (productDatabase *ProductDatabase) Get(
	id string,
) (application_interface.ProductInterface, error) {
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

	defer statement.Close()

	if err != nil {
		return nil, err
	}

	return &product, nil
}

func (productDatabase *ProductDatabase) Create(
	product application_interface.ProductInterface,
) (application_interface.ProductInterface, error) {
	statement, err := productDatabase.db.Prepare(createProductQuery)

	if err != nil {
		return nil, err
	}

	_, err = statement.Exec(
		product.GetId(),
		product.GetName(),
		product.GetPrice(),
		product.GetStatus(),
	)

	defer statement.Close()

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (productDatabase *ProductDatabase) Update(
	product application_interface.ProductInterface,
) (application_interface.ProductInterface, error) {
	statement, err := productDatabase.db.Prepare(updateProductQuery)

	if err != nil {
		return nil, err
	}

	_, err = statement.Exec(
		product.GetName(),
		product.GetPrice(),
		product.GetId(),
	)

	defer statement.Close()

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (productDatabase *ProductDatabase) Enable(
	product application_interface.ProductInterface,
) (application_interface.ProductInterface, error) {
	err := productDatabase.UpdateStatus(product.GetId(), application.EnabledStatusConst)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (productDatabase *ProductDatabase) Disable(
	product application_interface.ProductInterface,
) (application_interface.ProductInterface, error) {
	err := productDatabase.UpdateStatus(product.GetId(), application.DisabledStatusConst)

	if err != nil {
		return nil, err
	}

	return product, nil
}

func (productDatabase *ProductDatabase) UpdateStatus(
	productId string,
	productStatus string,
) error {
	statement, err := productDatabase.db.Prepare(updateProductStatusQuery)

	if err != nil {
		return err
	}

	_, err = statement.Exec(
		productStatus,
		productId,
	)

	if err != nil {
		return err
	}

	return nil
}
