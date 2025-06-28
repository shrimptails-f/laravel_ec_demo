# ====== Node.js & npm をインストールするステージ ======
FROM node:20 as node_builder
WORKDIR /app
RUN npm install -g npm@11.2

# ====== PHP + Laravel を構築するステージ ======
FROM php:8.3-fpm

# 必要なシステムライブラリ + nginx をインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    zip \
    unzip \
    curl \
    git \
    nginx \
    supervisor \
    default-mysql-client \
    && docker-php-ext-install pdo_mysql mbstring bcmath gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Composer をインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Node.js & npm のみを PHP イメージにコピー
COPY --from=node_builder /usr/local/bin/node /usr/local/bin/node
COPY --from=node_builder /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node_builder /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN [ ! -f /usr/local/bin/npm ] || rm -f /usr/local/bin/npm && \
    ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# 作業ディレクトリを設定
WORKDIR /var/www/html

# まず依存関係定義ファイルのみをコピー（Dockerレイヤーキャッシュ最適化）
COPY composer.json composer.lock* ./
COPY package.json package-lock.json* ./

# 依存関係をインストール
RUN composer install --no-dev --optimize-autoloader --no-scripts
RUN npm ci

# アプリケーションファイルをコピー
COPY . .

# Composer のpost-install-cmdなどのスクリプトを実行
RUN composer run-script post-autoload-dump

# npm build実行
RUN npm run build

# 権限設定
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html/storage /var/www/html/bootstrap/cache

# 設定ファイルをコピー
COPY fargate/nginx.conf /etc/nginx/nginx.conf
COPY fargate/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 本番用PHP設定（Xdebugなし）
COPY fargate/php-prod.ini /usr/local/etc/php/conf.d/99-custom.ini

EXPOSE 80

# CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
# CMD ["bash", "-c", "nginx -t && echo 'nginx config OK' && nginx -g 'daemon off;' & php-fpm -F"]

COPY fargate/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

CMD ["/entrypoint.sh"]