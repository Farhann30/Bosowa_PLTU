# Aplikasi Buku Tamu Digital

Aplikasi buku tamu digital menggunakan Laravel 10, React, dan MySQL.

## Teknologi yang Digunakan

- Backend: Laravel 10
- Frontend: React + Inertia.js
- Database: MySQL
- Styling: Tailwind CSS

## Struktur Branch

- `main` - Branch produksi, hanya untuk kode yang sudah siap production
- `development` - Branch utama untuk pengembangan
- `feature/*` - Branch untuk fitur baru (contoh: `feature/login-page`)
- `bugfix/*` - Branch untuk perbaikan bug
- `[nama-developer]` - Branch personal untuk masing-masing developer

## Setup Proyek

1. Clone repository
```bash
git clone [URL_REPOSITORY]
cd guestbook
```

2. Install dependencies
```bash
composer install
npm install
```

3. Setup environment
```bash
cp .env.example .env
php artisan key:generate
```

4. Setup database
- Buat database MySQL baru
- Update file .env dengan kredensial database

5. Jalankan migrasi
```bash
php artisan migrate
```

6. Jalankan aplikasi
```bash
php artisan serve
npm run dev
```

## Panduan Kontribusi

1. Buat branch baru dari `development`
```bash
git checkout development
git pull origin development
git checkout -b [nama-developer]/[fitur]
```

2. Lakukan perubahan dan commit
```bash
git add .
git commit -m "Deskripsi perubahan"
```

3. Push ke repository
```bash
git push origin [nama-branch]
```

4. Buat Pull Request ke branch `development`

## Tim Pengembang

- [Nama Anda]
- [Nama Anggota Tim 1]
- [Nama Anggota Tim 2]
- dst.

## Lisensi

[Tipe Lisensi]
