<?php

/* @var $factory \Illuminate\Database\Eloquent\Factory */

use App\Models\Article;
use Faker\Generator as Faker;

$factory->define(Article::class, function (Faker $faker) {
    return [
        'user_id' => 1,
        'category_id' => $faker->numberBetween(1,15),
        'title' => $faker->text(50),
        'body' => $faker->text(200),
        'image' => "",
        'posted_at' => "2019-06-22"
    ];
});
