<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'phone' => 'required|string|max:20',
            'company_name' => 'required|string|max:255',
            'company_id_card' => 'required|string|max:255',
            'face_photo' => 'required|image|max:2048',
            'id_card_photo' => 'required|image|max:2048',
            'company_id_card_photo' => 'required|image|max:2048',
        ]);

        // Simpan file ke kolom BLOB
        $facePhotoBlob = file_get_contents($request->file('face_photo')->getRealPath());
        $idCardPhotoBlob = file_get_contents($request->file('id_card_photo')->getRealPath());
        $companyIdCardPhotoBlob = file_get_contents($request->file('company_id_card_photo')->getRealPath());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'company_name' => $request->company_name,
            'company_id_card' => $request->company_id_card,
            'face_photo_blob' => $facePhotoBlob,
            'id_card_photo_blob' => $idCardPhotoBlob,
            'company_id_card_photo_blob' => $companyIdCardPhotoBlob,
            'verification_status' => 'pending'
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
