<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Fungsi untuk login dan mendapatkan token.
     */
    public function login(Request $request)
    {
        // Validasi input email dan password
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            // Jika autentikasi berhasil, buat token
            $user = Auth::user();
            $token = $user->createToken('YourAppName')->plainTextToken;

            // Kirim token sebagai respons JSON
            return response()->json(['token' => $token]);
        }

        // Jika login gagal, kembalikan error
        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
