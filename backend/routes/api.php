<?php

use App\Http\Controllers\BannerController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Symfony\Component\HttpFoundation\Response;

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/profile', function (Request $request) {
        return response()->json(Auth::user(), Response::HTTP_OK);
    });
});

Route::middleware(['auth:sanctum', 'can:admin'])->group(function () {
    Route::apiResource('/users', UserController::class);
    Route::apiResource('/banners', BannerController::class)->except('index', 'show');
});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/banners', [BannerController::class, 'index'] );
Route::get('/banners/{id}', [BannerController::class, 'show'] );

require __DIR__.'/auth.php';
