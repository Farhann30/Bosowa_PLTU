<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;

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
            'user' => auth()->user(),
        ],
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Guest/Homepage');
    })->middleware(['verified'])->name('dashboard');

    // Visit routes
    Route::controller(VisitController::class)->group(function () {
        Route::get('/visits', 'index')->name('visits.index');
        Route::get('/visits/create', 'create')->name('visits.create');
        Route::post('/visits', 'store')->name('visits.store');
    });

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'admin'])->get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');


require __DIR__.'/auth.php';
