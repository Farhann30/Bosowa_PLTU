import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';

export default function Help({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Terima kasih atas masukan Anda!');
        reset('message');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Bantuan" />
            <div className="py-12 px-4 min-h-screen bg-gray-50">
                <div className="max-w-5xl mx-auto space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold text-center mb-2">Bantuan & Pusat Informasi</h1>
                        <p className="text-center text-gray-600">Temukan jawaban, panduan, dan dukungan terkait sistem kunjungan</p>
                    </div>

                    {/* FAQ */}
                    <Card className="shadow-sm rounded-2xl">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold">FAQ (Pertanyaan yang Sering Ditanyakan)</h2>
                            <ul className="space-y-3 text-gray-700">
                                <li><strong>Bagaimana cara membuat kunjungan baru?</strong><br />Klik menu "Buat Kunjungan Baru", isi formulir, lalu submit.</li>
                                <li><strong>Bagaimana cara melihat status kunjungan saya?</strong><br />Pilih menu "Daftar Kunjungan Saya" untuk melihat status dan riwayat.</li>
                                <li><strong>Bagaimana jika kunjungan ditolak?</strong><br />Ajukan ulang kunjungan atau hubungi PIC.</li>
                                <li><strong>Apa yang dilakukan saat tiba di kantor?</strong><br />Tunjukkan QR code kepada petugas.</li>
                                <li><strong>Bagaimana cara menghubungi PIC?</strong><br />Kontak PIC tersedia di detail kunjungan.</li>
                                <li><strong>Bagaimana cara membatalkan kunjungan?</strong><br />Klik "Batalkan" pada kunjungan yang belum disetujui.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Panduan Penggunaan */}
                    <Card className="shadow-sm rounded-2xl">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Panduan Penggunaan Website</h2>
                            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                                <li>Buat akun dan login ke sistem.</li>
                                <li>Gunakan menu "Buat Kunjungan Baru".</li>
                                <li>Isi formulir kunjungan dengan lengkap.</li>
                                <li>Cek status kunjungan secara berkala.</li>
                                <li>Jika disetujui, simpan QR code Anda.</li>
                                <li>Tunjukkan QR code saat datang ke kantor.</li>
                                <li>Edit profil di menu "Profil Saya" jika diperlukan.</li>
                            </ol>
                        </CardContent>
                    </Card>

                    {/* Kontak Admin */}
                    <Card className="shadow-sm rounded-2xl">
                        <CardContent className="p-6 space-y-2 text-gray-700">
                            <h2 className="text-xl font-semibold mb-2">Kontak Admin & Bantuan Langsung</h2>
                            <p><strong>Telepon:</strong> (0411) 123-4567</p>
                            <p><strong>Email:</strong> admin@pltu-bosowa.co.id</p>
                            <p><strong>Jam Operasional:</strong> Senin - Jumat, 08.00 - 17.00 WITA</p>
                        </CardContent>
                    </Card>

                    {/* Tata Tertib */}
                    <Card className="shadow-sm rounded-2xl">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Tata Tertib & Prosedur Kunjungan</h2>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                <li>Pakai pakaian sopan dan rapi.</li>
                                <li>Datang tepat waktu.</li>
                                <li>Tunjukkan QR code ke petugas.</li>
                                <li>Ikuti aturan di area kantor.</li>
                                <li>Dilarang membawa barang terlarang.</li>
                                <li>Jaga kebersihan dan ketertiban.</li>
                                <li>Patuhi protokol kesehatan.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Lokasi */}
                    <Card className="shadow-sm rounded-2xl">
                        <CardContent className="p-6 space-y-2 text-gray-700">
                            <h2 className="text-xl font-semibold mb-2">Peta & Lokasi Kantor</h2>
                            <p><strong>Alamat:</strong> Punagaya, Bangkala, Kabupaten Jeneponto, Sulawesi Selatan 92352</p>
                            <a
                                href="https://maps.app.goo.gl/x9rWBJaX7Nzh3VVn8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 underline"
                            >
                                Lihat di Google Maps
                            </a>
                        </CardContent>
                    </Card>

                    {/* Form Pengaduan */}
                    <Card className="shadow-sm rounded-2xl">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-xl font-semibold">Formulir Pengaduan / Saran</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-700 mb-1">Nama</label>
                                    <Input
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Email</label>
                                    <Input
                                        type="email"
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-gray-700 mb-1">Pesan / Saran / Pengaduan</label>
                                    <textarea
                                        className="w-full border border-gray-300 rounded-lg p-2"
                                        value={data.message}
                                        onChange={e => setData('message', e.target.value)}
                                        rows={4}
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={processing}>Kirim</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
