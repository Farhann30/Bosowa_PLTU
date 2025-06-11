<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OutgoingGood extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'quantity',
        'receiver',
        'date',
        'status',
    ];
} 