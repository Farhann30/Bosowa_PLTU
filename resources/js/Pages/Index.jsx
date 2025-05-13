import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen bg-cover bg-center overflow-hidden" style={{ backgroundImage: "url('/images/bg bosowa.png')" }}>
                {/* Overlay gelap */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                
                {/* Header */}
                <div className="relative z-10 p-6 flex justify-end items-center">
                    <div className="flex items-center space-x-4">
                        <img src="/images/flag indonesia.jpg    " alt="Indonesia" className="h-6" />
                        {auth.user ? (
                            <Link href={route('dashboard')} className="bg-red-600 text-white px-6 py-2 rounded-md">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('register')} className="text-white hover:underline">
                                    Daftar
                                </Link>
                                <Link href={route('login')} className="bg-red-600 text-white px-6 py-2 rounded-md">
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
                    <img src="/images/logo bosowa BG.png"  alt="BSW Logo" className="w-41 mb-10" />
                    <h1 className="text-white text-4xl font-bold mb-2">PLTU Bosowa Energi</h1>
                    <h2 className="text-white text-3xl font-bold mb-6">Guest Book</h2>
                    <p className="text-white text-center max-w-2xl mb-8">
                        Mempermudah anda mengajukan jadwal bertemu dan mengunjungi perusahaan kami.
                    </p>
                    <Link href={route('login')} className="bg-red-600 text-white px-8 py-3 rounded-md text-lg font-semibold">
                        MULAI
                    </Link>
                </div>
            </div>
        </>
    );
}