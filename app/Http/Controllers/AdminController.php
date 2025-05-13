<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Menampilkan halaman dashboard admin
    public function index()
    {
        // Ambil data kunjungan yang terkait dengan user yang sedang login
        $visits = Visit::with('pic')->get();

        // Kirim data kunjungan ke halaman dashboard
        return Inertia::render('adminPages/AdminDashboard', [
            'visits' => $visits
        ]);
    }
}
