<?php

namespace Database\Seeders;

use App\Models\MoreInformation;
use Illuminate\Database\Seeder;

class MoreInformationSeeder extends Seeder
{
    public function run(): void
    {
        MoreInformation::factory()->create();
    }
}