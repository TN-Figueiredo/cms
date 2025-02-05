<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => "Thiago Figueiredo",
            'username' => "tnFigueiredo",
            'email' => "thiago@tnfigueiredo.com.br",
            'password' => Hash::make("123456"),
        ]);
    }
}
