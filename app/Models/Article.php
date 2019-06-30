<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Article extends Model
{

    protected $guarded = [];
    // protected $fillable = ['article_id', 'user_id', 'title', 'body'];

    /* Scopes */
    
    public function scopeActive($query) {
        return $query->where('isActive', 1);
    }
    
    public function scopeInactive($query) {
        return $query->where('isActive', 0);
    }

    /* End of Scopes */

    /* Getters and Setter */

    public function getIsActiveAttribute($attribute) {
        return [
            0 => true,
            1 => false
        ][$attribute];
    }

    /* End of Getters and Setter */

    /* Relationships */

    // Article's Author
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Category
    public function category() {
        return $this->hasOne(Category::class);
    }

    /* End of Relationships */
}
