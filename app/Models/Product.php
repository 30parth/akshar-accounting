<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'name_slug',
        'hsn_code',
        'product_category_id',
        'purchase_unit_id',
        'sale_unit_id',
        'description',
        'purchase_price',
        'sale_price',
        'tax_percent',
        'opening_stock',
        'current_stock',
        'min_stock_level',
        'status',
    ];

    /**
     * User belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Product belongs to a purchase Unit
     */
    public function purchaseUnit()
    {
        return $this->belongsTo(Unit::class, 'purchase_unit_id', 'id');
    }

    /**
     * Product belongs to a sale Unit
     */
    public function saleUnit()
    {
        return $this->belongsTo(Unit::class, 'sale_unit_id', 'id');
    }

    /**
     * Product belongs to a Category
     */
    public function category()
    {
        return $this->belongsTo(ProductCategory::class, 'product_category_id', 'id');
    }
}
