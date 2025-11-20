INSERT INTO `client` (`id`, `name`, `email`, `createdAt`)
VALUES
('099d1227-ae19-448c-ab13-c04b2d5e2ae0', 'John Cena', 'john.cena@email.com', CURRENT_TIMESTAMP),
('86993261-7548-4fa2-90e1-aeeaccd7121f', 'The Kid', 'the.kid@email.com', CURRENT_TIMESTAMP);

INSERT INTO `account` (`id`, `client_id`, `balance`, `createdAt`)
VALUES
('099d1227-ae19-448c-ab13-c04b2d5e2ae0', '099d1227-ae19-448c-ab13-c04b2d5e2ae0', 1000000, CURRENT_TIMESTAMP),
('86993261-7548-4fa2-90e1-aeeaccd7121f', '86993261-7548-4fa2-90e1-aeeaccd7121f', 1000000, CURRENT_TIMESTAMP);
