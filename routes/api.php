<?php

Route::group([

    'prefix' => 'auth'

], function () {

    Route::post('login', 'AuthController@login');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('payload', 'AuthController@payload');
});

// List Articles
Route::get('articles', 'ArticleController@index');

// List Single Article
Route::get('article/{id}', 'ArticleController@show');

// Create New Article
Route::post('article', 'ArticleController@store');

// Update Article
Route::put('article', 'ArticleController@store');

// Delete Article
Route::delete('article/{id}', 'ArticleController@destroy');