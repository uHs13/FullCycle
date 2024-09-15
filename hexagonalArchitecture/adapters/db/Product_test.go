package db_test

import (
	"database/sql"
	"log"
)

var Db *sql.DB

func SetUp() {
	OpenConnection()
	CreateTable()
	CreateProduct()
}

func OpenConnection() {
	Db, _ = sql.Open("sqlite3", ":memory:")
}

func CreateTable() {
	table := "CREATE TABLE product(id string, name string, price float, status string);"

	statement, err := Db.Prepare(table)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec()
}

func CreateProduct() {
	insert := `INSERT INTO product VALUES("uuid", "T-shirt", 13, "disabled");`

	statement, err := Db.Prepare(insert)

	if err != nil {
		log.Fatal(err.Error())
	}

	statement.Exec()
}
