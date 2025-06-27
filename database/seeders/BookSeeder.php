<?php

namespace Database\Seeders;

use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    public function run(): void
    {
        $books = [
            [
                'title' => 'Laravel実践入門',
                'description' => 'LaravelでWebアプリケーションを構築するための実践的なガイドブック',
                'author' => '田中太郎',
                'price' => 3200,
                'stock' => 10,
                'image_url' => 'https://placehold.jp/200x200.png',
            ],
            [
                'title' => 'React+TypeScript開発技法',
                'description' => 'モダンなフロントエンド開発のベストプラクティス',
                'author' => '佐藤花子',
                'price' => 2800,
                'stock' => 15,
                'image_url' => 'https://placehold.jp/200x200.png',
            ],
            [
                'title' => 'AWS実践ガイド',
                'description' => 'クラウドインフラ構築の実践的手法を学ぶ',
                'author' => '山田次郎',
                'price' => 4200,
                'stock' => 8,
                'image_url' => 'https://placehold.jp/200x200.png',
            ],
        ];

        foreach ($books as $book) {
            Book::create($book);
        }
    }
}
