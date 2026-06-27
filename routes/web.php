<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\UnitController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::get('/accounts', [AccountController::class, 'index'])->name('accounts.index');
    Route::resource('product-categories', ProductCategoryController::class);

    Route::prefix('unit')->name('unit.')->group(function () {
        Route::get('/', [UnitController::class, 'index'])->name('index');
        Route::post('/', [UnitController::class, 'store'])->name('store');
        Route::put('/{unit}', [UnitController::class, 'update'])->name('update');
        Route::delete('/{unit}', [UnitController::class, 'destroy'])->name('destroy');
    });

});

require __DIR__.'/settings.php';
