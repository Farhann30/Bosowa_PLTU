import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen overflow-hidden">
                {/* Video Background */}
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute top-0 left-0 w-full h-full object-cover z-0"
                >
                    <source src="/video/PLTU.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                {/* Logo kiri atas */}
                <div className="absolute top-0 left-0 z-30 p-6">
                    <img src="/images/logo bosowa.png" alt="Logo" className="h-10 mb-2 drop-shadow-lg" />
                </div>
                {/* Header kanan atas */}
                <div className="absolute top-0 right-0 z-30 p-6 flex justify-end items-center w-full">
                    <div className="flex items-center space-x-4">
                        <img src="/images/flag indonesia.jpg" alt="Indonesia" className="h-6" />
                        {auth.user ? (
                            <Link href={route('dashboard')} className="bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white px-6 py-2 rounded-md shadow transition">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('register')} className="bg-red-600 bg-opacity-70 hover:bg-opacity-90 text-white px-5 py-2 rounded-md shadow font-semibold transition backdrop-blur-sm" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                                    Daftar
                                </Link>
                                <Link href={route('login')} className="bg-red-600 text-white px-6 py-2 rounded-md">
                                    Masuk
                                </Link>
                            </>
                        )}
                    </div>
                </div>
                {/* Konten utama kiri atas */}
                <div className="absolute top-0 left-0 z-20 flex flex-col items-start justify-start h-full p-8 md:p-16 max-w-xl" style={{marginTop: '27vh'}}>
                    <h1 className="text-white text-27xl md:text-5xl font-bold mb-4 drop-shadow-lg" style={{lineHeight: '1.1'}}>PLTU Bosowa Energi Guestbook</h1>
                    <p className="text-white text-2xl md:text-3xl mb-10 max-w-md drop-shadow font-semibold" style={{textShadow: '0 2px 8px rgba(0,0,0,0.25)', color: '#f3f4f6'}}>
                        Mempermudah anda mengajukan jadwal bertemu dan mengunjungi perusahaan kami.
                    </p>
                    <Link href={route('login')} className="bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white px-8 py-3 rounded-md text-lg font-semibold shadow-lg transition">
                        MULAI
                    </Link>
                </div>
            </div>
        </>
    );
}