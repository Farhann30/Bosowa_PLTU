<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VisitController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\PicController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\EsikController;
use App\Http\Controllers\OutgoingGoodController;

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

    // Asset routes
    Route::controller(AssetController::class)->group(function () {
        Route::get('/assets', 'index')->name('assets.index');
        Route::post('/assets', 'store')->name('assets.store');
        Route::delete('/assets/{asset}', 'destroy')->name('assets.destroy');
    });

    // Route untuk halaman aset user
    Route::get('/guest/asset', [AssetController::class, 'index'])->name('guest.asset');

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

    // New route for guest help
    Route::get('/guest/help', function() {
        return inertia('Guest/Help');
    })->middleware(['auth'])->name('guest.help');

    // New route for SOC guest
    Route::get('/guest/soc', function() {
        return inertia('Guest/Soc');
    })->middleware(['auth'])->name('guest.soc');

    // Route untuk barang keluar
    Route::get('/guest/outgoing-goods', [OutgoingGoodController::class, 'index'])->name('guest.outgoing-goods');
    Route::post('/guest/outgoing-goods', [OutgoingGoodController::class, 'store'])->name('guest.outgoing-goods.store');
});

Route::middleware(['auth', 'admin'])->group(function () {
    Route::delete('/visits/{id}', [VisitController::class, 'destroy'])->name('visits.destroy');
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');
});

require __DIR__.'/auth.php';
