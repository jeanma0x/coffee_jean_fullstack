<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Registramos todos los seeders que queremos ejecutar
        $this->call([
            CategoriaSeeder::class, // Seeder de categorías
            ProductoSeeder::class,  // ✅ Nuevo seeder agregado
        ]);
    }
}
