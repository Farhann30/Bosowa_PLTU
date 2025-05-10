<?php

namespace App\Mail;

use App\Models\Visit;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class VisitNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $visit;
    public $type;

    public function __construct(Visit $visit, $type)
    {
        $this->visit = $visit;
        $this->type = $type; // 'new', 'approved', 'rejected'
    }

    public function build()
    {
        $subject = match($this->type) {
            'new' => 'Kunjungan Baru - ' . $this->visit->visitor_name,
            'approved' => 'Kunjungan Disetujui - ' . $this->visit->visitor_name,
            'rejected' => 'Kunjungan Ditolak - ' . $this->visit->visitor_name,
            default => 'Notifikasi Kunjungan'
        };

        return $this->subject($subject)
                    ->view('emails.visit-notification');
    }
} 