import { Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Homepage() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Beranda - Buku Tamu Digital" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-6">
                                Selamat Datang di Buku Tamu Digital
                            </h1>
                            
                            {/* Quick Stats */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-blue-800">Total Kunjungan</h3>
                                    <p className="text-3xl font-bold text-blue-600">0</p>
                                </div>
                                <div className="bg-green-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-green-800">Kunjungan Hari Ini</h3>
                                    <p className="text-3xl font-bold text-green-600">0</p>
                                </div>
                                <div className="bg-purple-50 p-6 rounded-lg">
                                    <h3 className="text-lg font-semibold text-purple-800">Tamu Terdaftar</h3>
                                    <p className="text-3xl font-bold text-purple-600">0</p>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Aksi Cepat</h2>
                                    <div className="space-y-4">
                                        <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                            Tambah Kunjungan Baru
                                        </button>
                                        <button className="w-full bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                                            Lihat Daftar Kunjungan
                                        </button>
                                    </div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold mb-4">Kunjungan Terbaru</h2>
                                    <div className="space-y-4">
                                        <p className="text-gray-500 italic">Belum ada kunjungan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
