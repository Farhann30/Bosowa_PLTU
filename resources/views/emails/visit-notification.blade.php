<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .content {
            background: #f9f9f9;
            padding: 20px;
            border-radius: 5px;
        }
        .footer {
            text-align: center;
            margin-top: 30px;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('images/logo-bosowa.png') }}" alt="Bosowa Logo" style="height: 50px;">
        </div>

        <div class="content">
            @if($type === 'new')
                <h2>Kunjungan Baru</h2>
                <p>Halo {{ $visit->pic->name }},</p>
                <p>Anda memiliki kunjungan baru yang perlu ditangani:</p>
            @elseif($type === 'approved')
                <h2>Kunjungan Disetujui</h2>
                <p>Halo {{ $visit->visitor_name }},</p>
                <p>Kunjungan Anda telah disetujui oleh {{ $visit->pic->name }}:</p>
            @else
                <h2>Kunjungan Ditolak</h2>
                <p>Halo {{ $visit->visitor_name }},</p>
                <p>Mohon maaf, kunjungan Anda telah ditolak oleh {{ $visit->pic->name }}:</p>
            @endif

            <div style="margin: 20px 0;">
                <p><strong>Detail Kunjungan:</strong></p>
                <ul>
                    <li>Nama: {{ $visit->visitor_name }}</li>
                    <li>Tanggal: {{ \Carbon\Carbon::parse($visit->visit_date)->format('d/m/Y') }}</li>
                    <li>Waktu: {{ $visit->visit_time }}</li>
                    <li>Agenda: {{ $visit->agenda }}</li>
                    <li>Status: {{ ucfirst($visit->status) }}</li>
                </ul>
            </div>

            @if($type === 'new' && isset($visit->pic_id))
                <div style="margin: 30px 0; text-align: center;">
                    <a href="{{ url('/pic/dashboard') }}"
                       style="background: #22c55e; color: #fff; padding: 12px 28px; border-radius: 5px; text-decoration: none; font-weight: bold;">
                        Setujui / Tolak Kunjungan
                    </a>
                </div>
            @endif
        </div>

        <div class="footer">
            <p>Email ini dikirim secara otomatis. Mohon tidak membalas email ini.</p>
            <p>&copy; {{ date('Y') }} Bosowa. All rights reserved.</p>
        </div>
    </div>
</body>
</html> 