<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Visit extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'pic_id',
        'visit_date',
        'visit_time_start',
        'visit_time_end',
        'building_type',
        'building_category',
        'agenda',
        'notes',
        'phone',
        'email',
        'status'
    ];

    protected $casts = [
        'visit_date' => 'date',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function pic()
    {
        return $this->belongsTo(Pic::class);
    }
}
