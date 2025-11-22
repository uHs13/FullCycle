DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
    `id` VARCHAR(36) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
    `id` VARCHAR(36) NOT NULL,
    `client_id` VARCHAR(36) NOT NULL,
    `balance` FLOAT(10, 2) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

ALTER TABLE `account`
ADD CONSTRAINT `fk_account_client`
FOREIGN KEY (`client_id`) REFERENCES `client`(`id`);

DROP TABLE IF EXISTS `transaction`;
CREATE TABLE IF NOT EXISTS `transaction` (
    `id` VARCHAR(36) NOT NULL,
    `account_id_from` VARCHAR(36) NOT NULL,
    `account_id_to` VARCHAR(36) NOT NULL,
    `amount` FLOAT(10, 2) NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

ALTER TABLE `transaction`
ADD CONSTRAINT `fk_account_from_transaction`
FOREIGN KEY (`account_id_from`) REFERENCES `account`(`id`);

ALTER TABLE `transaction`
ADD CONSTRAINT `fk_account_to_transaction`
FOREIGN KEY (`account_id_to`) REFERENCES `account`(`id`);