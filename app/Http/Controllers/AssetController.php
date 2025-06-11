<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Asset;

class AssetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $assets = auth()->user()->assets()->latest()->get();
        return Inertia::render('Guest/Asset', [
            'assets' => $assets->map->only(['id', 'name', 'category', 'code', 'location', 'description'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|in:laptop,hp,tablet',
            'code' => 'required|string|max:255|unique:assets',
            'location' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $asset = auth()->user()->assets()->create($validated);

        return redirect()->back()->with('success', 'Aset berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Asset $asset)
    {
        if ($asset->user_id !== auth()->id()) {
            abort(403);
        }

        $asset->delete();
        return redirect()->back()->with('success', 'Aset berhasil dihapus');
    }
}
