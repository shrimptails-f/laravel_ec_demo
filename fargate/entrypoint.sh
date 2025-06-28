#!/bin/bash
set -e

echo "Starting Laravel application..."
echo "DB_HOST: ${DB_HOST}"
echo "DB_DATABASE: ${DB_DATABASE}"
echo "DB_USERNAME: ${DB_USERNAME}"

# データベース接続テスト（詳細ログ付き）
echo "Testing database connection..."
mysql -h "${DB_HOST}" -u "${DB_USERNAME}" -p"${DB_PASSWORD}" -e "SELECT 1" "${DB_DATABASE}" || {
    echo "Database connection failed. Error details:"
    echo "Host: ${DB_HOST}"
    echo "Database: ${DB_DATABASE}"
    echo "Username: ${DB_USERNAME}"
    echo "Password length: ${#DB_PASSWORD}"
}

# データベース接続待機（タイムアウト付き）
echo "Waiting for database connection..."
COUNTER=0
until mysql -h "${DB_HOST}" -u "${DB_USERNAME}" -p"${DB_PASSWORD}" -e "SELECT 1" "${DB_DATABASE}" > /dev/null 2>&1; do
    echo "Database not ready, waiting... (attempt: $((++COUNTER)))"
    if [ $COUNTER -gt 12 ]; then
        echo "Database connection timeout after 60 seconds"
        exit 1
    fi
    sleep 5
done

# マイグレーション実行
echo "Running database migrations..."
php artisan migrate --force

echo "Starting supervisord..."
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf