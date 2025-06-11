import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { useForm } from '@inertiajs/react';

export default function Help({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        message: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Sementara, hanya alert. Nanti bisa dihubungkan ke backend.
        alert('Terima kasih atas masukan Anda!');
        reset('message');
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Bantuan" />
            <div className="py-12 min-h-screen flex justify-center bg-gray-50">
                <div className="max-w-4xl w-full mx-auto space-y-8">
                    <h1 className="text-3xl font-bold mb-4 text-center">Bantuan & Pusat Informasi</h1>

                    {/* FAQ */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">FAQ (Pertanyaan yang Sering Ditanyakan)</h2>
                            <ul className="space-y-3 text-gray-700">
                                <li><b>Bagaimana cara membuat kunjungan baru?</b><br />Klik menu "Buat Kunjungan Baru" di homepage, isi formulir, lalu submit.</li>
                                <li><b>Bagaimana cara melihat status kunjungan saya?</b><br />Pilih menu "Daftar Kunjungan Saya" untuk melihat status dan riwayat kunjungan.</li>
                                <li><b>Bagaimana jika kunjungan saya ditolak?</b><br />Anda bisa mengajukan kunjungan baru atau menghubungi PIC terkait.</li>
                                <li><b>Apa yang harus dilakukan saat tiba di kantor?</b><br />Tunjukkan bukti kunjungan/QR code ke petugas resepsionis.</li>
                                <li><b>Bagaimana cara menghubungi PIC?</b><br />Kontak PIC tertera di detail kunjungan Anda.</li>
                                <li><b>Bagaimana cara membatalkan kunjungan?</b><br />Pada daftar kunjungan, klik tombol "Batalkan" pada kunjungan yang masih menunggu persetujuan.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Panduan Penggunaan */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Panduan Penggunaan Website</h2>
                            <ol className="list-decimal ml-6 space-y-2 text-gray-700">
                                <li>Buat akun dan login ke sistem.</li>
                                <li>Pilih menu "Buat Kunjungan Baru" untuk mengajukan kunjungan.</li>
                                <li>Isi data kunjungan dengan lengkap dan benar.</li>
                                <li>Cek status kunjungan secara berkala di menu "Daftar Kunjungan Saya".</li>
                                <li>Jika kunjungan disetujui, cetak atau simpan QR code sebagai bukti kunjungan.</li>
                                <li>Tunjukkan QR code ke petugas saat tiba di kantor.</li>
                                <li>Edit profil Anda di menu "Profil Saya" jika ada perubahan data diri.</li>
                            </ol>
                        </CardContent>
                    </Card>

                    {/* Kontak Admin */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Kontak Admin & Bantuan Langsung</h2>
                            <ul className="space-y-2 text-gray-700">
                                <li><b>Telepon:</b> (0411) 123-4567</li>
                                <li><b>Email:</b> admin@pltu-bosowa.co.id</li>
                                <li><b>Jam Operasional:</b> Senin - Jumat, 08.00 - 17.00 WITA</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Tata Tertib */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Tata Tertib & Prosedur Kunjungan</h2>
                            <ul className="list-disc ml-6 space-y-2 text-gray-700">
                                <li>Gunakan pakaian sopan dan rapi saat berkunjung.</li>
                                <li>Tiba tepat waktu sesuai jadwal kunjungan.</li>
                                <li>Tunjukkan bukti kunjungan/QR code ke petugas.</li>
                                <li>Ikuti arahan dan peraturan yang berlaku di area kantor.</li>
                                <li>Tidak diperkenankan membawa barang terlarang.</li>
                                <li>Jaga kebersihan dan ketertiban selama di area kantor.</li>
                                <li>Patuhi protokol kesehatan yang berlaku.</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Peta Lokasi */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Peta & Lokasi Kantor</h2>
                            <div className="mb-2 text-gray-700">
                                <b>Alamat:</b> Jl. Poros Makassar - Maros KM. 25, Kabupaten Maros, Sulawesi Selatan
                            </div>
                            <a href="https://goo.gl/maps/xxxxxxx" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Lihat di Google Maps</a>
                        </CardContent>
                    </Card>

                    {/* Form Pengaduan/Saran */}
                    <Card>
                        <CardContent className="p-6">
                            <h2 className="text-xl font-semibold mb-4">Formulir Pengaduan / Saran</h2>
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
                                        className="w-full border rounded p-2"
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