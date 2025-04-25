<?php

namespace App\Http\Controllers;

use App\Models\Visit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class VisitController extends Controller
{
    public function create()
    {
        return Inertia::render('Visit/Create');
    }

    public function index()
    {
        $visits = Visit::where('user_id', auth()->id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($visit) {
                // Format ID Tiket
                $formattedId = sprintf(
                    "VISIT/EXT/%s/MAKASSAR/%s",
                    $visit->created_at->format('Ymd'),
                    str_pad($visit->id, 6, '0', STR_PAD_LEFT)
                );

                return [
                    'id' => $formattedId,
                    'meet_with' => $visit->meet_with,
                    'visit_date' => $visit->visit_date,
                    'visit_time_start' => $visit->visit_time_start,
                    'visit_time_end' => $visit->visit_time_end,
                    'status' => $visit->status,
                ];
            });

        return Inertia::render('Visit/List', [
            'visits' => $visits
        ]);
    }

    public function store(Request $request)
    {
        Log::info('Received visit data:', $request->all());

        try {
            $messages = [
                'required' => ':attribute harus diisi.',
                'date' => ':attribute harus berupa tanggal yang valid.',
                'email' => ':attribute harus berupa alamat email yang valid.',
                'accepted' => ':attribute harus disetujui.',
            ];

            $attributes = [
                'visit_date' => 'Tanggal kunjungan',
                'visit_time_start' => 'Waktu mulai',
                'visit_time_end' => 'Waktu selesai',
                'building_type' => 'Jenis gedung',
                'building_category' => 'Kategori gedung',
                'agenda' => 'Agenda',
                'meet_with' => 'PIC',
                'phone' => 'Nomor telepon',
                'email' => 'Email',
                'agreement' => 'Persetujuan'
            ];

            $validated = $request->validate([
                'visit_date' => 'required|date',
                'visit_time_start' => 'required',
                'visit_time_end' => 'required',
                'building_type' => 'required|string',
                'building_category' => 'required|string',
                'agenda' => 'required|string',
                'meet_with' => 'required|string',
                'notes' => 'nullable|string',
                'phone' => 'required|string',
                'email' => 'required|email',
                'agreement' => 'required|accepted'
            ], $messages, $attributes);

            Log::info('Validated data:', $validated);

            // Hapus agreement dari data yang akan disimpan
            unset($validated['agreement']);
            
            // Tambahkan user_id dan status
            $validated['user_id'] = auth()->id();
            $validated['status'] = 'pending';

            $visit = Visit::create($validated);
            Log::info('Visit created:', $visit->toArray());

            return redirect()->route('visits.index')
                ->with('success', 'Kunjungan berhasil dibuat!');

        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation error:', $e->errors());
            throw $e;
        } catch (\Exception $e) {
            Log::error('Error creating visit:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return back()
                ->withErrors(['error' => 'Terjadi kesalahan: ' . $e->getMessage()])
                ->withInput();
        }
    }
}
