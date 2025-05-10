import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

export default function PicLayout({ user, children }) {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <Link href="/pic/dashboard">
                                <img
                                    src="/images/logo-bosowa.png"
                                    alt="Bosowa Logo"
                                    className="h-8 w-auto"
                                />
                            </Link>
                        </div>

                        <div className="flex items-center">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                        <span className="sr-only">Buka menu profil</span>
                                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                            <span className="text-sm font-medium text-gray-600">
                                                {user.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link href={route('logout')} method="post" as="button" className="w-full text-left">
                                            Keluar
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main>{children}</main>
        </div>
    );
} 