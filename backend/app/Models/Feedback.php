<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Throwable;

class Feedback extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'content',
        'role',
    ];

}