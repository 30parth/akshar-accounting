<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Unit extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'short_name',
        'status',
    ];

    public function purchaseProducts()
    {
        return $this->hasMany(Product::class, 'purchase_unit_id', 'id');
    }

    public function saleProducts()
    {
        return $this->hasMany(Product::class, 'sale_unit_id', 'id');
    }
}
