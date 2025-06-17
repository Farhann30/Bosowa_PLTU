<?php

namespace App\Http\Controllers;

use App\Models\OutgoingGood;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OutgoingGoodController extends Controller
{
    public function index()
    {
        $goods = OutgoingGood::where('user_id', auth()->id())->latest()->get();
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
            'keterangan' => 'required|string',
        ]);
        $validated['user_id'] = auth()->id();
        OutgoingGood::create($validated);
        return redirect()->back()->with('success', 'Barang keluar berhasil ditambahkan');
    }
} 