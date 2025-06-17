import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function Homepage({ auth }) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Homepage" />

            <div
                className="py-12 min-h-screen flex justify-center relative overflow-hidden"
                style={{
                    backgroundImage: "url('/images/HomePage.jpg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Overlay gelap tanpa blur */}
                <div className="absolute inset-0 bg-black/0 z-0"></div>
                <div className="relative z-10 w-full">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 mt-4">
                        <div className="bg-white/80 overflow-hidden shadow-sm sm:rounded-lg p-6 pt-12">
                            <h1 className="text-2xl font-bold mb-6 mt-0">Welcome to PLTU Bosowa Guestbook, {auth.user.name}!</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Buat Kunjungan */}
                                <Link href={route('visits.create')} className="block p-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold">Buat kunjungan baru</h2>
                                    <p className="mt-2 text-sm text-white/80">Make new visit</p>
                                </Link>

                                {/* Daftar Kunjungan */}
                                <Link href={route('visits.index')} className="block p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold">Daftar kunjungan saya</h2>
                                    <p className="mt-2 text-sm text-white/80">My visit list</p>
                                </Link>

                                {/* Aset Saya */}
                                <Link href="/guest/asset" className="block p-6 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold">Aset Saya</h2>
                                    <p className="mt-2 text-sm text-white/80">My asset</p>
                                </Link>

                                {/* SOC */}
                                <Link href="/guest/soc" className="block p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold">SOC</h2>
                                    <p className="mt-2 text-sm text-white/80">SOC</p>
                                </Link>

                                {/* Barang Keluar */}
                                <Link href="/guest/outgoing-goods" className="block p-6 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold">Barang Keluar</h2>
                                    <p className="mt-2 text-sm text-white/80">Outgoing Goods</p>
                                </Link>

                                 {/* Bantuan */}
                                <Link href="/guest/help" className="block p-6 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition">
                                    <div className="flex items-center mb-4">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 14v.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-xl font-semibold">Bantuan</h2>
                                    <p className="mt-2 text-sm text-white/80">Help & FAQ</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}