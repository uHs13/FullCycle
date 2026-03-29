#!/bin/bash

# Database migration script
set -e

# Configuration
DB_HOST=${DB_HOST:-db}
DB_USER=${DB_USER:-root}
DB_PASSWORD=${DB_PASSWORD:-admin}
DB_NAME=${DB_NAME:-golangdb}

echo "🚀 Starting database migrations..."

# Function to run SQL commands
run_sql() {
    local sql_command="$1"
    echo "Executing: $sql_command"
    mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e "$sql_command"
}

# Function to run SQL file
run_sql_file() {
    local sql_file="$1"
    local database="$2"
    if [ -f "$sql_file" ]; then
        echo "📄 Loading SQL file: $sql_file"
        if [ -n "$database" ]; then
            mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$database" < "$sql_file"
        else
            mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" < "$sql_file"
        fi
    else
        echo "⚠️  SQL file not found: $sql_file"
    fi
}

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e 'SELECT 1' >/dev/null 2>&1; do
    echo "Database is unavailable - sleeping..."
    sleep 5
done
echo "✅ Database is ready!"

# Drop and recreate database
echo "🗑️  Dropping existing database..."
run_sql "DROP DATABASE IF EXISTS $DB_NAME;"

echo "🏗️  Creating database..."
run_sql "CREATE DATABASE $DB_NAME;"

# Run schema migrations
echo "📋 Running schema migrations..."
run_sql_file "infra/dataSchema/fixtures/golangdb.sql" "$DB_NAME"

# Run data fixtures
echo "📊 Loading data fixtures..."
run_sql_file "infra/dataSchema/fixtures/fixtures.sql" "$DB_NAME"

# Add any additional migration files here
# Example:
# run_sql_file "migrations/001_create_users_table.sql" "$DB_NAME"
# run_sql_file "migrations/002_add_indexes.sql" "$DB_NAME"

echo "✅ Database migrations completed successfully!"