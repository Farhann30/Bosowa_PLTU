<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use App\Models\Asset;
use App\Models\OutgoingGood;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Menampilkan halaman dashboard admin
    public function index()
    {
        // Ambil data kunjungan yang terkait dengan user yang sedang login
        $visits = Visit::with('pic')->get();
        $assets = Asset::all();
        $goods = OutgoingGood::all();
        $users = User::all()->each->makeHidden([
            'face_photo_blob',
            'id_card_photo_blob',
            'company_id_card_photo_blob',
        ]);

        // Kirim data kunjungan ke halaman dashboard
        return Inertia::render('adminPages/AdminDashboard', [
            'visits' => $visits,
            'assets' => $assets,
            'goods' => $goods,
            'users' => $users,
        ]);
    }
}
