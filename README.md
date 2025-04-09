# Aplikasi Buku Tamu Digital

Aplikasi buku tamu digital menggunakan Laravel 10, React, dan MySQL.

## Persyaratan Sistem

Pastikan komputer Anda telah memiliki:
- PHP >= 8.1
- Composer
- Node.js >= 16
- MySQL >= 5.7
- Git

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

### 1. Clone Repository
```bash
git clone https://github.com/Farhann30/Bosowa_PLTU.git
cd guestbook
```

### 2. Install Dependencies Backend
```bash
composer install
```

### 3. Install Dependencies Frontend
```bash
npm install
```

### 4. Setup Environment
```bash
# Copy file environment
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 5. Setup Database

#### Menggunakan XAMPP:
1. Buka XAMPP Control Panel
2. Start Apache dan MySQL
3. Buka phpMyAdmin (http://localhost/phpmyadmin)
4. Buat database baru bernama `guestbook`
5. Edit file `.env`:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=guestbook
   DB_USERNAME=root
   DB_PASSWORD=
   ```

#### Menggunakan MySQL Command Line:
```bash
# Login ke MySQL
mysql -u root -p

# Di dalam MySQL CLI:
CREATE DATABASE guestbook;
CREATE USER 'guestbook_team'@'localhost' IDENTIFIED BY 'password_anda';
GRANT ALL PRIVILEGES ON guestbook.* TO 'guestbook_team'@'localhost';
FLUSH PRIVILEGES;
```

Kemudian edit file `.env`:
```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=guestbook
DB_USERNAME=guestbook_team
DB_PASSWORD=password_anda
```

### 6. Jalankan Migrasi Database
```bash
php artisan migrate
```

### 7. Build Assets
```bash
# Untuk development
npm run dev

# Untuk production
npm run build
```

### 8. Jalankan Aplikasi
```bash
# Jalankan server Laravel
php artisan serve

# Dalam terminal terpisah, jalankan Vite (jika dalam mode development)
npm run dev
```

Aplikasi akan tersedia di:
- Frontend (development): http://localhost:5173
- Backend: http://localhost:8000

## Troubleshooting

### 1. Masalah Database
Jika terjadi error "Connection refused":
- Pastikan MySQL sudah running
- Cek kredensial di file `.env`
- Pastikan database sudah dibuat
- Cek firewall tidak memblokir port 3306

### 2. Masalah Frontend
Jika halaman blank/putih:
```bash
# Hapus node_modules dan reinstall
rm -rf node_modules
npm install

# Build ulang assets
npm run build
```

### 3. Cache Laravel
Jika ada masalah dengan route atau config:
```bash
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
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

## Struktur Folder Penting

```
resources/js/Pages/
├── Auth/                    # Halaman-halaman autentikasi
│   ├── Login.jsx           # Halaman login
│   └── Register.jsx        # Halaman registrasi
│
├── Guest/                   # Halaman-halaman buku tamu
│   ├── Homepage.jsx        # Dashboard/Beranda
│   ├── ListVisit.jsx       # Daftar kunjungan
│   └── AddVisit.jsx        # Form tambah kunjungan
│
└── Profile/                # Halaman-halaman profil
    └── Edit.jsx           # Edit profil pengguna
```

## Lisensi

[Tipe Lisensi]
