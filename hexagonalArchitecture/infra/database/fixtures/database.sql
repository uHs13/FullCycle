CREATE TABLE product (
    id VARCHAR(36) NOT NULL,
    name VARCHAR(255) NOT NULL,
    price FLOAT(10, 2) NOT NULL,
    status ENUM('enabled', 'disabled') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
