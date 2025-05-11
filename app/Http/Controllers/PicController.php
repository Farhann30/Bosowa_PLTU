<?php

namespace App\Http\Controllers;

use App\Models\Pic;
use Illuminate\Http\Request;
use App\Models\Visit;
use Inertia\Inertia;
use App\Mail\VisitNotification;
use Illuminate\Support\Facades\Mail;

class PicController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $query = Pic::query();
        if ($search) {
            $query->where('nama', 'like', "%$search%");
        }
        return response()->json($query->limit(10)->get());
    }

    public function dashboard()
    {
        $user = auth()->user();
        $pic = \App\Models\Pic::where('email', $user->email)->first();

        $visits = [];
        if ($pic) {
            $visits = \App\Models\Visit::where('pic_id', $pic->id)
                ->orderBy('created_at', 'desc')
                ->get();
        }

        return Inertia::render('picPages/PicDashboard', [
            'visits' => $visits
        ]);
    }

    public function approve(Visit $visit)
    {
        $user = auth()->user();
        $pic = Pic::where('email', $user->email)->first();

        if (!$pic || $visit->pic_id !== $pic->id) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $visit->update([
            'status' => 'approved'
        ]);

        Mail::to($visit->email)->send(new VisitNotification($visit, 'approved'));

        return response()->json([
            'success' => true,
            'message' => 'Kunjungan berhasil disetujui'
        ]);
    }

    public function reject(Visit $visit)
    {
        // Pastikan PIC yang login adalah PIC yang ditunjuk
        if ($visit->pic_id !== auth()->id()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 403);
        }

        $visit->update([
            'status' => 'rejected'
        ]);

        // Kirim email ke pengunjung
        Mail::to($visit->email)->send(new VisitNotification($visit, 'rejected'));

        return response()->json([
            'success' => true,
            'message' => 'Kunjungan berhasil ditolak'
        ]);
    }
}
