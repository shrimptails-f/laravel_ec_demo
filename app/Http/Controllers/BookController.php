<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();

        return Inertia::render('Books/Index', [
            'books' => $books
        ]);
    }

    public function show(Book $book)
    {
        return Inertia::render('Books/Show', [
            'book' => $book
        ]);
    }
}
