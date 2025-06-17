import { Link, Head } from '@inertiajs/react';
import Dropdown from '@/Components/Dropdown';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative min-h-screen h-screen overflow-hidden"
                style={{
                    backgroundImage: "url('/images/HomepageBSW.jpeg')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat"
                }}
            >
                {/* Overlay untuk efek blur */}
                <div className="absolute inset-0 backdrop-blur-[1px] bg-black/20 z-0"></div>
                {/* Logo kiri atas */}
                <div className="absolute top-0 left-0 z-30 p-3 sm:p-6">
                    <img src="/images/logo bosowa.png" alt="Logo" className="h-8 sm:h-10 mb-2 drop-shadow-lg" />
                </div>
                {/* Header kanan atas */}
                <div className="absolute top-0 right-0 z-30 p-3 sm:p-6 flex items-center space-x-2 sm:space-x-4">
                    <img src="/images/flag indonesia.jpg" alt="Indonesia" className="h-5 sm:h-6" />
                    {auth.user ? (
                        <Link href={route('dashboard')} className="bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white px-6 py-2 rounded-md shadow transition text-sm sm:text-base">
                            Dashboard
                        </Link>
                    ) : (
                        <div className="hidden sm:flex items-center space-x-4"> {/* Tampil di desktop */}
                            <Link href={route('register')} className="bg-red-600 bg-opacity-70 hover:bg-opacity-90 text-white px-5 py-2 rounded-md shadow font-semibold transition backdrop-blur-sm text-sm sm:text-base" style={{border: '1px solid rgba(255,255,255,0.2)'}}>
                                Daftar
                            </Link>
                            <Link href={route('login')} className="bg-red-600 text-white px-6 py-2 rounded-md text-sm sm:text-base">
                                Masuk
                            </Link>
                        </div>
                    )}
                    {/* Dropdown untuk mobile */}
                    <div className="sm:hidden relative">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button type="button" className="text-white px-3 py-2 rounded-md bg-red-600 bg-opacity-70 hover:bg-opacity-90 transition">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="right" width="48" className="mt-2 p-2 bg-white rounded-md shadow-lg overflow-hidden">
                                {auth.user ? (
                                    <Dropdown.Link href={route('dashboard')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                        Dashboard
                                    </Dropdown.Link>
                                ) : (
                                    <>
                                        <Dropdown.Link href={route('register')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                            Daftar
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('login')} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                            Masuk
                                        </Dropdown.Link>
                                    </>
                                )}
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
                {/* Konten utama kiri atas, responsif */}
                <div className="absolute z-20 flex flex-col items-center md:items-start justify-center h-full p-4 sm:p-8 md:p-16 max-w-xs sm:max-w-md md:max-w-xl"
                    style={{marginTop: '20vh', marginLeft: '2vw'}}
                >
                    <h1 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg text-center md:text-left" style={{lineHeight: '1.1'}}>
                        PLTU Bosowa Energi Guestbook
                    </h1>
                    <p className="text-white text-base sm:text-xl md:text-2xl mb-6 max-w-xs sm:max-w-md drop-shadow font-semibold text-center md:text-left"
                        style={{textShadow: '0 2px 8px rgba(0,0,0,0.25)', color: '#f3f4f6'}}>
                        Mempermudah anda mengajukan jadwal bertemu dan mengunjungi perusahaan kami.
                    </p>
                    <Link href={route('login')}
                        className="bg-red-600 bg-opacity-80 hover:bg-opacity-100 text-white px-8 py-2 rounded-md text-base sm:text-lg font-semibold shadow-lg transition">
                        MULAI
                    </Link>
                </div>
            </div>
        </>
    );
}