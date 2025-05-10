<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pic extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'position',
        'department'
    ];

    public function visits()
    {
        return $this->hasMany(Visit::class);
    }
}
