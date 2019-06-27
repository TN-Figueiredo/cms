<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    // Remove Timestamps
    public $timestamps = false;

    // Article's Category
    public function articles() {
        return $this->belongsTo(Article::class);
    }
}
