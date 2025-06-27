<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;
use App\Http\Controllers\OrderController;


Route::get('/', [UserController::class, 'index'])->name('welcomePage');

// 書籍関連のルート
Route::get('/books', [BookController::class, 'index'])->name('books.index');
Route::get('/books/{book}', [BookController::class, 'show'])->name('books.show');

// 注文・決済関連のルート
Route::get('/books/{book}/checkout', [OrderController::class, 'checkout'])->name('orders.checkout');
Route::post('/books/{book}/payment-intent', [OrderController::class, 'createPaymentIntent'])->name('orders.payment-intent');
Route::get('/orders/success', [OrderController::class, 'success'])->name('orders.success');
Route::get('/orders/cancel', [OrderController::class, 'cancel'])->name('orders.cancel');
