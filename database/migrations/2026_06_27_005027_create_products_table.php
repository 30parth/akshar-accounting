<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('name_slug');                   // Product / Item code
            $table->string('hsn_code')->nullable();             // HSN code for GST
            $table->foreignId('product_category_id')->constrained('product_categories')->onDelete('restrict');
            $table->foreignId('purchase_unit_id')->nullable()->constrained('units')->onDelete('restrict');
            $table->foreignId('sale_unit_id')->nullable()->constrained('units')->onDelete('restrict');
            $table->text('description')->nullable();
            $table->decimal('purchase_price', 12, 2)->default(0);  // Cost price
            $table->decimal('sale_price', 12, 2)->default(0);      // Selling price
            $table->decimal('tax_percent', 5, 2)->default(0);      // GST %
            $table->decimal('opening_stock', 12, 3)->default(0);   // Stock qty at start
            $table->decimal('current_stock', 12, 3)->default(0);   // Live stock qty
            $table->decimal('min_stock_level', 12, 3)->default(0); // Alert below this
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
