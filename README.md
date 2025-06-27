# 概要

このプロジェクトは、DevContainer + Laravel+ Reactの構成で、MVC + Service + Repository のアーキテクチャを採用した雛形として作成しました。

# ローカル環境構築手順

1. Dockerをインストール
2. VsCodeをインストール
3. VsCodeの拡張機能にDevContainersをインストール
4. ソースをクローン
5. プロジェクトルート直下と.devcontainerディレクトリ内に.envを作成

```bash
cp .env.sample .env
cp .devcontainer/.env.sample .env
```

6. Ctrl Shift Pでコマンドパレットを開く<br>
7. DevContainer:Reopen in Containerを押下

# 技術スタック

## 使用技術

バックエンド: Laravel 12系<br>
フロントエンド: React 19、Type Script 5.8

## 開発環境

DevContainer<br>
Inertia<br>
Vite HMR

## コード品質管理

PHPCsFixer<br>
PHP Intelephense<br>
Prettier
ESLint

## デバッガ

バックエンド:Xdebug

フロント:[こちら](https://zenn.dev/chida/articles/a12f72ed8153b0)を参照

## テスト方法
1.テストコマンドを実行
```bsash
php artisan test
```
