<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;  // Pastikan ini ada

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Index', [
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
});

Route::get('/login', function () {
    return Inertia::render('Auth/Login');
})->name('login');

Route::middleware('auth')->group(function () {
    // Guest Book Routes
    Route::get('/dashboard', function () {
        return Inertia::render('Guest/Homepage');
    })->name('dashboard');

    Route::get('/visits', function () {
        return Inertia::render('Guest/ListVisit');
    })->name('visits.index');

    Route::get('/visits/create', function () {
        return Inertia::render('Guest/AddVisit');
    })->name('visits.create');

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
