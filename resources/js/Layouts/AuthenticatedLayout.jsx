import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-8">
                            {/* Logo */}
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <img src="/images/logo bosowa.png" className="h-8" alt="Logo" />
                                </Link>
                            </div>

                            {/* Menu Links - mirip Telkomsel */}
                            <div className="flex space-x-4">
                                <NavLink 
                                    href={route('dashboard')} 
                                    active={route().current('dashboard')}
                                    className={({ isActive }) => 
                                        isActive 
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                                    }
                                >
                                    Home
                                </NavLink>
                                <NavLink 
                                    href={route('visits.index')} 
                                    active={route().current('visits.index')}
                                    className={({ isActive }) => 
                                        isActive 
                                            ? 'inline-flex items-center px-1 pt-1 border-b-2 border-red-500 text-sm font-medium leading-5 text-gray-900 focus:outline-none transition duration-150 ease-in-out'
                                            : 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                                    }
                                >
                                    Visit List
                                </NavLink>
                                <NavLink 
                                    href="#" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Asset
                                </NavLink>
                                <NavLink 
                                    href="#" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    E-SIK
                                </NavLink>
                                <NavLink 
                                    href="#" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    SOC
                                </NavLink>
                                <NavLink 
                                    href="#" 
                                    className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out"
                                >
                                    Outgoing Goods
                                </NavLink>
                            </div>
                        </div>

                        {/* Profile - mirip Telkomsel */}
                        <div className="flex items-center">
                            <div className="relative">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button type="button" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:text-gray-900">
                                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                <span className="text-sm font-medium">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                            <span className="font-medium">{user.name}</span>
                                            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
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
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
