package database

import (
	"database/sql"

	"github.com/google/uuid"
)

type Course struct {
	ID          string
	Name        string
	Description string
	CategoryId  string
	db          *sql.DB
}

const (
	createCourseQuery               = "INSERT INTO courses(id, name, description, category_id) VALUES (?, ?, ?, ?)"
	findAllCoursesQuery             = "SELECT id, name, description, category_id FROM courses"
	findAllCoursesByCategoryIdQuery = "SELECT id, name, description, category_id FROM courses WHERE category_id = ?"
)

func NewCourse(db *sql.DB) *Course {
	return &Course{db: db}
}

func (c *Course) Create(
	name string,
	description string,
	categoryId string,
) (*Course, error) {
	id := uuid.New().String()

	statement, err := c.db.Prepare(createCourseQuery)

	if err != nil {
		return nil, err
	}

	defer statement.Close()

	_, err = statement.Exec(
		id,
		name,
		description,
		categoryId,
	)

	if err != nil {
		return nil, err
	}

	return &Course{
		ID:          id,
		Name:        name,
		Description: description,
		CategoryId:  categoryId,
	}, nil
}

func (c *Course) FindAll() ([]Course, error) {
	statement, err := c.db.Prepare(findAllCoursesQuery)

	if err != nil {
		return nil, err
	}

	defer statement.Close()

	rows, err := statement.Query()

	if err != nil {
		return nil, err
	}

	var courses []Course
	var course Course

	for rows.Next() {
		if err := rows.Scan(&course.ID, &course.Name, &course.Description, &course.CategoryId); err != nil {
			return nil, err
		}

		courses = append(courses, course)
	}

	return courses, nil
}

func (c *Course) FindByCategoryId(categoryId string) ([]Course, error) {
	statement, err := c.db.Prepare(findAllCoursesByCategoryIdQuery)

	if err != nil {
		return nil, err
	}

	defer statement.Close()

	rows, err := statement.Query(categoryId)

	if err != nil {
		return nil, err
	}

	var courses []Course
	var course Course

	for rows.Next() {
		if err := rows.Scan(&course.ID, &course.Name, &course.Description, &course.CategoryId); err != nil {
			return nil, err
		}

		courses = append(courses, course)
	}

	return courses, nil
}
