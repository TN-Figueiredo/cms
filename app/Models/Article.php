<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{

    protected $fillable = ['article_id', 'user_id', 'title', 'body'];

    // Article's Author
    public function user() {
        return $this->belongsTo(User::class);
    }
}
