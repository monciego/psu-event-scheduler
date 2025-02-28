<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Post extends Model
{
    protected $fillable = ["post", "author", "images"];


    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
