<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MoreInformation extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'numero_turma',
        'dias',
        'inicio',
        'encerramento',
        'local',
    ];
}
