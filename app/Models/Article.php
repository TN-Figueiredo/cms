<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Article extends Model
{

    protected $guarded = [];
    // protected $fillable = ['article_id', 'user_id', 'title', 'body'];

    // Article's Author
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Category
    public function category() {
        return $this->hasOne(Category::class);
    }
}
