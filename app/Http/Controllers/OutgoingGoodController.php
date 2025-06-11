<?php

namespace App\Http\Controllers;

use App\Models\OutgoingGood;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutgoingGoodController extends Controller
{
    public function index()
    {
        $goods = OutgoingGood::latest()->get();
        return Inertia::render('Guest/OutgoingGoods', [
            'goods' => $goods
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'quantity' => 'required|integer|min:1',
            'receiver' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|string',
        ]);
        OutgoingGood::create($validated);
        return redirect()->back()->with('success', 'Barang keluar berhasil ditambahkan');
    }
} 