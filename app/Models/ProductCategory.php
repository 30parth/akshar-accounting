<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductCategory extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'name_slug',
        'status',
    ];

    /**
     * Category belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Category has many products
     */
    public function products()
    {
        return $this->hasMany(Product::class, 'product_category_id', 'id');
    }
}
