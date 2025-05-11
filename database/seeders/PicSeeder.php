<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Pic;

class PicSeeder extends Seeder
{
    public function run(): void
    {
        $pics = [
            [
                'nama' => 'Farhan',
                'email' => 'faan553@gmail.com',
                'jabatan' => 'Manager',
            ],
            [
                'nama' => 'Jane Smith',
                'email' => 'jane.smith@bosowa.com',
                'jabatan' => 'Supervisor',
            ],
            [
                'nama' => 'Ahmad Rizki',
                'email' => 'ahmad.rizki@bosowa.com',
                'jabatan' => 'Engineer',
            ],
            [
                'nama' => 'Siti Nur',
                'email' => 'siti.nur@bosowa.com',
                'jabatan' => 'Coordinator',
            ],
            [
                'nama' => 'Budi Santoso',
                'email' => 'budi.santoso@bosowa.com',
                'jabatan' => 'Manager',
            ],
        ];

        foreach ($pics as $pic) {
            Pic::create($pic);
        }
    }
} 