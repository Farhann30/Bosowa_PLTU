<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use App\Mail\VisitNotification;
use Illuminate\Support\Facades\Mail;
use App\Models\Pic;

class VisitController extends Controller
{
    // Halaman untuk menampilkan form create
    public function create()
    {
        $assets = auth()->user()->assets()->latest()->get()->map->only(['id', 'name', 'category', 'code', 'location', 'description']);
        return Inertia::render('Visit/Create', [
            'assets' => $assets
        ]);
    }

    // Halaman untuk menampilkan daftar kunjungan
    public function index()
    {
        // Ambil data visit beserta relasi PIC dan User
        $visits = Visit::with(['pic', 'user']) // Memuat relasi 'pic' dan 'user'
            ->where('user_id', auth()->id()) // Hanya mengambil data untuk pengguna yang sedang login
            ->orderBy('created_at', 'desc') // Mengurutkan berdasarkan tanggal dibuat
            ->get()
            ->map(function ($visit) {
                // Format ID kunjungan
                $formattedId = sprintf(
                    "VISIT/EXT/%s/MAKASSAR/%s",
                    $visit->created_at->format('Ymd'),
                    str_pad($visit->id, 6, '0', STR_PAD_LEFT)
                );

                // Kembalikan data kunjungan dan tambahkan nama pengguna
                return [
                    'id' => $formattedId,
                    'pic' => $visit->pic ? $visit->pic->nama : '-', // Menampilkan nama PIC
                    'user_name' => $visit->user->name, // Menambahkan nama pengguna
                    'visit_date' => $visit->visit_date,
                    'visit_time_start' => $visit->visit_time_start,
                    'visit_time_end' => $visit->visit_time_end,
                    'status' => $visit->status,
                ];
            });

        // Kirim data visit ke Inertia view
        return Inertia::render('Visit/List', [
            'visits' => $visits
        ]);
    }


    // Menyimpan kunjungan baru
    public function store(Request $request)
    {
        Log::info('Received visit data:', $request->all());

        try {
            // Pesan kesalahan
            $messages = [
                'required' => ':attribute harus diisi.',
                'date' => ':attribute harus berupa tanggal yang valid.',
                'email' => ':attribute harus berupa alamat email yang valid.',
                'accepted' => ':attribute harus disetujui.',
            ];

            // Nama atribut untuk kesalahan
            $attributes = [
                'visit_date' => 'Tanggal kunjungan',
                'visit_time_start' => 'Waktu mulai',
                'visit_time_end' => 'Waktu selesai',
                'building_type' => 'Jenis gedung',
                'building_category' => 'Kategori gedung',
                'agenda' => 'Agenda',
                'pic_id' => 'PIC',
                'phone' => 'Nomor telepon',
                'email' => 'Email',
                'agreement' => 'Persetujuan'
            ];

            // Validasi data kunjungan
            $validated = $request->validate([
                'visit_date' => 'required|date',
                'visit_time_start' => 'required',
                'visit_time_end' => 'required',
                'building_type' => 'required|string',
                'building_category' => 'required|string',
                'agenda' => 'required|string',
                'pic_id' => 'required|exists:pics,id',
                'notes' => 'nullable|string',
                'phone' => 'required|string',
                'email' => 'required|email',
                'agreement' => 'required|accepted'
            ], $messages, $attributes);

            // Hapus 'agreement' dari data yang akan disimpan
            unset($validated['agreement']);

            // Menambahkan user_id dan status
            $validated['user_id'] = auth()->id();
            $validated['status'] = 'pending';

            // Menyimpan kunjungan baru
            $visit = Visit::create($validated);
            Log::info('Visit created:', $visit->toArray());

            try {
                // Kirim email ke PIC
                $pic = Pic::findOrFail($validated['pic_id']);
                if ($pic && $pic->email) {
                    Mail::to($pic->email)->send(new VisitNotification($visit, 'new'));
                    Log::info('Email notification sent to PIC:', ['pic_email' => $pic->email]);
                } else {
                    Log::warning('PIC email not found:', ['pic_id' => $validated['pic_id']]);
                }
            } catch (\Exception $e) {
                Log::error('Failed to send email notification:', [
                    'error' => $e->getMessage(),
                    'pic_id' => $validated['pic_id']
                ]);
                // Lanjutkan proses meskipun email gagal terkirim
            }

            // Redirect ke halaman daftar kunjungan dengan pesan sukses
            return redirect()->route('visits.index')
                ->with('success', 'Kunjungan berhasil dibuat!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Jika validasi gagal
            Log::error('Validation error:', $e->errors());
            throw $e;
        } catch (\Exception $e) {
            // Jika terjadi kesalahan saat menyimpan
            Log::error('Error creating visit:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            // Kembali dengan pesan kesalahan
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()])
                ->withInput();
        }
    }

    public function destroy(Request $request, $id)
    {
        $visit = Visit::findOrFail($id);
        $visit->delete();

        if ($request->inertia()) {
            // Inertia redirect
            return Inertia::location(route('admin.dashboard'));
        }

        return redirect()->route('admin.dashboard')->with('success', 'Data kunjungan berhasil dihapus.');
    }
}
