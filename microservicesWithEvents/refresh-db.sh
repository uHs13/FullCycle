#!/bin/bash

PASSWORD=${1:-admin}

docker exec -i golang_db mariadb -u root -p$PASSWORD -e "DROP DATABASE IF EXISTS golangdb"
docker exec -i golang_db mariadb -u root -p$PASSWORD -e "CREATE DATABASE golangdb"

docker exec -i golang_db mariadb -u root -p$PASSWORD -D golangdb < infra/dataSchema/fixtures/golangdb.sql
docker exec -i golang_db mariadb -u root -p$PASSWORD -D golangdb < infra/dataSchema/fixtures/fixtures.sql

echo -e "\e[32mDatabase created and mock data inserted.\e[0m"
