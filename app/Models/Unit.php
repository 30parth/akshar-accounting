<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'short_name',
        'status',
    ];

    /**
     * Unit belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Unit has many products (Purchase Unit)
     */
    public function purchaseProducts()
    {
        return $this->hasMany(Product::class, 'purchase_unit_id', 'id');
    }

    /**
     * Unit has many products (Sale Unit)
     */
    public function saleProducts()
    {
        return $this->hasMany(Product::class, 'sale_unit_id', 'id');
    }
}
