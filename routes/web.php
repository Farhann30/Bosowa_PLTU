<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PicController;

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
        Route::delete('/visits/{id}', 'destroy')->name('visits.destroy');
    });

    // Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // PIC Routes
    Route::middleware(['auth', 'role:pic'])->group(function () {
        Route::get('/pic/dashboard', [PicController::class, 'dashboard'])->name('pic.dashboard');
        Route::post('/api/visits/{visit}/approve', [PicController::class, 'approve'])->name('visits.approve');
        Route::post('/api/visits/{visit}/reject', [PicController::class, 'reject'])->name('visits.reject');
    });
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::delete('/visits/{id}', [VisitController::class, 'destroy'])->name('visits.destroy');
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
});

require __DIR__.'/auth.php';
