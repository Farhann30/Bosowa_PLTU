import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    // Dummy role, ganti sesuai implementasi role user jika ada
    const role = user.role || (user.email === 'admin@admin.com' ? 'Admin' : 'User');

    return (
        <div className={'min-h-screen bg-gray-100'}>
            <nav className={'bg-white border-b border-gray-100'}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <div className="flex items-center space-x-8">
                            {/* Logo dengan efek hover */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src="/images/logo bosowa.png" className="h-8 transition-transform duration-200 hover:scale-110 hover:drop-shadow-lg" alt="Logo" />
                                </Link>
                            </div>
                            <div className="flex space-x-4">
                                <NavLink 
                                    href={route('dashboard')} 
                                    active={route().current('dashboard')}
                                    className={({ isActive }) => 
                                        (isActive
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-base font-bold leading-5 text-red-700 bg-red-50 rounded-t transition duration-150 ease-in-out shadow-sm'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out')
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink 
                                    href={route('visits.index')} 
                                    active={route().current('visits.index')}
                                    className={({ isActive }) => 
                                        (isActive
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-base font-bold leading-5 text-red-700 bg-red-50 rounded-t transition duration-150 ease-in-out shadow-sm'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out')
                                    }
                                >
                                    Visit List
                                </NavLink>
                                <NavLink 
                                    href={route('assets.index')} 
                                    active={route().current('assets.index')}
                                    className={({ isActive }) => 
                                        (isActive
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-base font-bold leading-5 text-red-700 bg-red-50 rounded-t transition duration-150 ease-in-out shadow-sm'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out')
                                    }
                                >
                                    Asset
                                </NavLink>
                                <NavLink 
                                    href={route('guest.help')} 
                                    active={route().current('guest.help')}
                                    className={({ isActive }) => 
                                        (isActive
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-base font-bold leading-5 text-red-700 bg-red-50 rounded-t transition duration-150 ease-in-out shadow-sm'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out')
                                    }
                                >
                                    Bantuan
                                </NavLink>
                                <NavLink 
                                    href={route('guest.soc')} 
                                    active={route().current('guest.soc')}
                                    className={({ isActive }) => 
                                        (isActive
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-base font-bold leading-5 text-red-700 bg-red-50 rounded-t transition duration-150 ease-in-out shadow-sm'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out')
                                    }
                                >
                                    SOC
                                </NavLink>
                                <NavLink 
                                    href={route('guest.outgoing-goods')} 
                                    active={route().current('guest.outgoing-goods')}
                                    className={({ isActive }) => 
                                        (isActive
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-base font-bold leading-5 text-red-700 bg-red-50 rounded-t transition duration-150 ease-in-out shadow-sm'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-base font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out')
                                    }
                                >
                                    Barang Keluar
                                </NavLink>
                            </div>
                        </div>
                        {/* Greeting dan profile */}
                        <div className="flex items-center gap-6">
                            <span className="hidden md:inline text-base font-semibold text-gray-700 animate-fade-in">Hai, <span className="text-red-600">{user.name}</span>!</span>
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900 group">
                                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center border-2 border-gray-300 group-hover:border-red-500 transition-transform duration-200 group-hover:scale-110 shadow-md">
                                                <span className="text-lg font-bold">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="font-medium hidden sm:inline">{user.name}</span>
                                            {/* Badge role */}
                                            <span className={`ml-2 px-2 py-0.5 rounded text-xs font-bold ${role === 'Admin' ? 'bg-red-100 text-red-700 border border-red-400' : 'bg-blue-100 text-blue-700 border border-blue-400'}`}>{role}</span>
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content className="animate-fade-in-down origin-top-right">
                                        <Dropdown.Link href={route('profile.edit')} className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button" className="flex items-center gap-2 w-full text-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className={'bg-white shadow'}>
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}
            <main>{children}</main>
        </div>
    );
}
