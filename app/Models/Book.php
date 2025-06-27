<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'author',
        'price',
        'image_url',
        'stock',
    ];

    protected $casts = [
        'price' => 'integer',
        'stock' => 'integer',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function getPriceFormattedAttribute()
    {
        return number_format($this->price) . '円';
    }
}
