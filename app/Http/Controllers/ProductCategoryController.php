<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = ProductCategory::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%");
        }

        $categories = $query->orderBy('name')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('product-categories/index', [
            'categories' => $categories,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('product-categories/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name',
            'status' => 'required|string|in:Active,Inactive',
        ]);

        $validated['name_slug'] = Str::slug($validated['name']);

        ProductCategory::create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Category created successfully.'),
        ]);

        return redirect()->route('product-categories.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductCategory $productCategory)
    {
        // Not used
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductCategory $productCategory): Response
    {
        return Inertia::render('product-categories/edit', [
            'category' => $productCategory,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductCategory $productCategory): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:product_categories,name,' . $productCategory->id,
            'status' => 'required|string|in:Active,Inactive',
        ]);

        $validated['name_slug'] = Str::slug($validated['name']);

        $productCategory->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Category updated successfully.'),
        ]);

        return redirect()->route('product-categories.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductCategory $productCategory): RedirectResponse
    {
        if ($productCategory->products()->exists()) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => __('Cannot delete category. It is currently associated with products.'),
            ]);

            return redirect()->back();
        }

        $productCategory->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Category deleted successfully.'),
        ]);

        return redirect()->route('product-categories.index');
    }
}
