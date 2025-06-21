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
    public function index(Request $request)
    {
        // Ambil data kunjungan yang terkait dengan user yang sedang login
        $visits = Visit::with('pic')->get();
        $assets = Asset::all();
        $goods = OutgoingGood::all();
        // Hanya ambil data user yg esensial untuk list, tanpa blob
        $users = User::all(['id', 'name', 'email']);

        $selectedUser = null;
        if ($request->has('user_id')) {
            $selectedUser = User::find($request->user_id);
            if ($selectedUser) {
                // Konversi blob ke base64 agar bisa ditampilkan di frontend
                $selectedUser->face_photo_blob = $selectedUser->face_photo_blob ? 'data:image/jpeg;base64,' . base64_encode($selectedUser->face_photo_blob) : null;
                $selectedUser->id_card_photo_blob = $selectedUser->id_card_photo_blob ? 'data:image/jpeg;base64,' . base64_encode($selectedUser->id_card_photo_blob) : null;
                $selectedUser->company_id_card_photo_blob = $selectedUser->company_id_card_photo_blob ? 'data:image/jpeg;base64,' . base64_encode($selectedUser->company_id_card_photo_blob) : null;
            }
        }

        // Kirim data kunjungan ke halaman dashboard
        return Inertia::render('adminPages/AdminDashboard', [
            'visits' => $visits,
            'assets' => $assets,
            'goods' => $goods,
            'users' => $users,
            'selectedUser' => $selectedUser,
        ]);
    }
}
