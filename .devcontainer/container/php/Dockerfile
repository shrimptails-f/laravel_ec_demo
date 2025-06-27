# ====== Node.js & npm をインストールするステージ ======
FROM node:20 as node_builder

WORKDIR /app

# npm の最新バージョンをインストール
RUN npm install -g npm@11.2

# ====== PHP + Laravel を構築するステージ ======
# 現時点でphpCdFixerが8.3までしか対応してないので、、、
FROM php:8.3-fpm

# 必要なシステムライブラリをインストール
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libonig-dev \
    zip \
    unzip \
    curl \
    git \
    && docker-php-ext-install pdo_mysql mbstring bcmath gd

# Composer をインストール
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Xdebug インストール
RUN pecl install xdebug-3.4.2 && docker-php-ext-enable xdebug
COPY ./php.ini /usr/local/etc/php/conf.d/99-custom.ini

# Node.js & npm のみを PHP イメージにコピー
COPY --from=node_builder /usr/local/bin/node /usr/local/bin/node
COPY --from=node_builder /usr/local/bin/npm /usr/local/bin/npm
COPY --from=node_builder /usr/local/lib/node_modules /usr/local/lib/node_modules

# 既存の npm のリンクがない場合のみ作成
RUN [ ! -f /usr/local/bin/npm ] || rm -f /usr/local/bin/npm && \
    ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# 既に www-data ユーザーが存在するか確認し、存在しない場合のみ作成
RUN id www-data || useradd -m -d /home/www-data -s /bin/bash www-data

# www-data のデフォルトシェルを /bin/bash に変更
RUN usermod -s /bin/bash www-data

# www-data の権限を変更
RUN chown -R www-data:www-data /var/www/html && \
    chmod -R 755 /var/www/html

# www-data ユーザーでコンテナを実行
USER www-data

WORKDIR /var/www/html
