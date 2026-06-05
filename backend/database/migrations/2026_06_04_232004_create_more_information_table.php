<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('more_information', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->string('numero_turma', 5);
            $table->string('dias');
            $table->string('inicio');
            $table->string('encerramento');
            $table->string('local');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('more_information');
    }
};