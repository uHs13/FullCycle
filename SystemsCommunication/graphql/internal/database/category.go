package database

import (
	"database/sql"

	"github.com/google/uuid"
)

type Category struct {
	db          *sql.DB
	ID          string
	Name        string
	Description string
}

const (
	createCategoryQuery    = "INSERT INTO categories (id, name, description) VALUES (?, ?, ?)"
	findAllCategoriesQuery = "SELECT id, name, description FROM categories"
)

func NewCategory(db *sql.DB) *Category {
	return &Category{db: db}
}

func (c *Category) Create(
	name string,
	description string,
) (Category, error) {
	id := uuid.New().String()

	statement, err := c.db.Prepare(createCategoryQuery)

	if err != nil {
		return Category{}, err
	}

	defer statement.Close()

	_, err = statement.Exec(
		id,
		name,
		description,
	)

	if err != nil {
		return Category{}, err
	}

	return Category{
		ID:          id,
		Name:        name,
		Description: description,
	}, nil
}

func (c *Category) FindAll() ([]Category, error) {
	statement, err := c.db.Prepare(findAllCategoriesQuery)

	if err != nil {
		return nil, err
	}

	defer statement.Close()

	rows, err := statement.Query()

	if err != nil {
		return nil, err
	}

	var categories []Category
	var category Category

	for rows.Next() {
		if err := rows.Scan(&category.ID, &category.Name, &category.Description); err != nil {
			return nil, err
		}

		categories = append(categories, category)
	}

	return categories, nil
}
