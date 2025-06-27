<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class OrderController extends Controller
{
    public function __construct()
    {
        Stripe::setApiKey(config('services.stripe.secret'));
    }

    public function checkout(Book $book)
    {
        return Inertia::render('Orders/Checkout', [
            'book' => $book,
            'stripePublishableKey' => config('services.stripe.key')
        ]);
    }

    public function createPaymentIntent(Request $request, Book $book)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'required|email|max:255',
        ]);

        try {
            // PaymentIntentを作成
            $paymentIntent = PaymentIntent::create([
                'amount' => $book->price,
                'currency' => 'jpy',
                'metadata' => [
                    'book_id' => $book->id,
                    'customer_name' => $request->customer_name,
                    'customer_email' => $request->customer_email,
                ],
            ]);

            // 注文をデータベースに保存
            $order = Order::create([
                'book_id' => $book->id,
                'customer_name' => $request->customer_name,
                'customer_email' => $request->customer_email,
                'amount' => $book->price,
                'stripe_payment_intent_id' => $paymentIntent->id,
                'status' => 'pending',
            ]);

            return response()->json([
                'client_secret' => $paymentIntent->client_secret,
                'order_id' => $order->id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ], 400);
        }
    }

    public function success(Request $request)
    {
        $orderId = $request->query('order_id');
        $order = Order::with('book')->findOrFail($orderId);

        // 支払い成功後のステータス更新
        $order->update(['status' => 'completed']);

        return Inertia::render('Orders/Success', [
            'order' => $order
        ]);
    }

    public function cancel()
    {
        return Inertia::render('Orders/Cancel');
    }
}
