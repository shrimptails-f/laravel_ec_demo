<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'book_id',
        'customer_name',
        'customer_email',
        'amount',
        'stripe_payment_intent_id',
        'status',
    ];

    protected $casts = [
        'amount' => 'integer',
    ];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
