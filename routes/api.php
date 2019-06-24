<?php

Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('payload', 'AuthController@payload');
});

// List Articles
Route::get('articles', 'Articles\ArticleController@index');

// List Single Article
Route::get('article/{id}', 'Articles\ArticleController@show');

// Create New Article
Route::post('article', 'Articles\ArticleController@store');

// Update Article
Route::put('article', 'Articles\ArticleController@store');

// Delete Article
Route::delete('article/{id}', 'Articles\ArticleController@destroy');