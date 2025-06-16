<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();

        // Ambil field satu per satu
        $user->name = $request->input('name');
        $user->email = $request->input('email');

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Simpan foto wajah ke blob jika ada
        if ($request->hasFile('face_photo_blob')) {
            $user->face_photo_blob = file_get_contents($request->file('face_photo_blob'));
        }
        // Simpan foto KTP jika ada
        if ($request->hasFile('id_card_photo')) {
            $user->id_card_photo = $request->file('id_card_photo')->store('verification/id_cards', 'public');
        }
        // Simpan foto kartu perusahaan jika ada
        if ($request->hasFile('company_id_card_photo')) {
            $user->company_id_card_photo = $request->file('company_id_card_photo')->store('verification/company_cards', 'public');
        }

        $user->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
