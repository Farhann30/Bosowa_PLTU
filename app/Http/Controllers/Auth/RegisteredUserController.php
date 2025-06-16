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

        // Handle file uploads
        $facePhotoPath = $request->file('face_photo')->store('verification/face_photos', 'public');
        $idCardPhotoPath = $request->file('id_card_photo')->store('verification/id_cards', 'public');
        $companyIdCardPhotoPath = $request->file('company_id_card_photo')->store('verification/company_cards', 'public');

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'company_name' => $request->company_name,
            'company_id_card' => $request->company_id_card,
            'face_photo' => $facePhotoPath,
            'id_card_photo' => $idCardPhotoPath,
            'company_id_card_photo' => $companyIdCardPhotoPath,
            'verification_status' => 'pending'
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(RouteServiceProvider::HOME);
    }
}
