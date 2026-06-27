<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class UnitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $query = Unit::query();

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('short_name', 'like', "%{$search}%");
            });
        }

        $units = $query->orderBy('name')
            ->paginate(5);

        return Inertia::render('units/index', [
            'units' => $units,
            'filters' => $request->only(['search']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Not used as we are using a modal form on index
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:50',
            'status' => 'required|string|in:Active,Inactive',
        ]);

        Unit::create($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Unit created successfully.'),
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Unit $unit)
    {
        // Not used
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Unit $unit)
    {
        // Not used as we are using a modal form on index
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Unit $unit): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:50',
            'status' => 'required|string|in:Active,Inactive',
        ]);

        $unit->update($validated);

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Unit updated successfully.'),
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Unit $unit): RedirectResponse
    {
        if ($unit->purchaseProducts()->exists() || $unit->saleProducts()->exists()) {
            Inertia::flash('toast', [
                'type' => 'error',
                'message' => __('Cannot delete unit. It is currently associated with products.'),
            ]);

            return redirect()->back();
        }

        $unit->delete();

        Inertia::flash('toast', [
            'type' => 'success',
            'message' => __('Unit deleted successfully.'),
        ]);

        return redirect()->back();
    }
}
