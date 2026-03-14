<?php

use App\Http\Controllers\UserController;
use App\Models\Service;
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
    Route::apiResource('/services', Service::class)->except('index', 'show');
    Route::apiResource('/users', UserController::class);

});

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});
Route::get('/services', [Service::class, 'index'] );
Route::get('/services/{id}', [Service::class, 'show'] );


require __DIR__.'/auth.php';
