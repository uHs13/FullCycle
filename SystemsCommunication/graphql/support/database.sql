CREATE TABLE categories (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300)
);

CREATE TABLE courses (
    id VARCHAR(36) NOT NULL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(300),
    category_id VARCHAR(36) NOT NULL
);

ALTER TABLE courses
ADD CONSTRAINT FK_COURSE_CATEGORY
FOREIGN KEY (category_id) REFERENCES categories(id);
