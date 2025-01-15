<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Post;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Supreme Student Council',
            'email' => 'superadministrator@psu.com',
        ]);

        User::factory()->create([
            'name' => 'Domain of Information Technology ',
            'email' => 'doit@psu.com',
        ]);

        User::factory()->create([
            'name' => 'Communicators Society',
            'email' => 'cs@psu.com',
        ]);


        User::factory()->create([
            'name' => 'The Prime',
            'email' => 'prime@psu.com',
        ]);


        User::factory()->create([
            'name' => 'Tagnawa',
            'email' => 'tagnawa@psu.com',
        ]);


        User::factory()->create([
            'name' => 'Sahara',
            'email' => 'sahara@psu.com',
        ]);


        User::factory()->create([
            'name' => 'Society of Young Business Administrators',
            'email' => 'syba@psu.com',
        ]);


        User::factory()->create([
            'name' => 'General Educators Guild',
            'email' => 'geg@psu.com',
        ]);
    }
}
