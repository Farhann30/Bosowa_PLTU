<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'visit_date',
        'visit_time_start',
        'visit_time_end',
        'building_type',
        'building_category',
        'agenda',
        'meet_with',
        'notes',
        'phone',
        'email',
        'user_id',
        'status'
    ];

    protected $casts = [
        'visit_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
