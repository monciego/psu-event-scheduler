<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Event extends Model
{
    protected $fillable = [
        "name",
        "description",
        "image",
        "date",
        "start_time",
        "end_time",
    ];


    public function user():BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
