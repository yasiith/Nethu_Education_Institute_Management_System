'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { User, LogOut, ChevronDown, Menu, X, UserCircle, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const toMyProfile = () => {
        router.push('/teachers/my-profile');
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    }

    const handleLogout = async () => {
        try {
            // Clear all locally stored values, including email and password
            localStorage.clear();

            // Navigate to the login page
            router.push("/Login");
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <nav className='relative w-full bg-blue-950 shadow-lg'>
            <div className='container px-4 mx-auto'>
                <div className='flex items-center justify-between h-16'>
                    {/* Logo */}
                    <div className='flex items-center'>
                        <Link href='/' className='flex items-center'>
                            <span className='text-2xl font-bold text-white transition-all duration-200 hover:text-blue-300'>NEIMS</span>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className='flex items-center md:hidden'>
                        <button
                            onClick={toggleMobileMenu}
                            className='p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20'
                            aria-label='Toggle mobile menu'
                        >
                            {isMobileMenuOpen ? 
                                <X className='w-6 h-6' /> : 
                                <Menu className='w-6 h-6' />
                            }
                        </button>
                    </div>

                    {/* User dropdown menu */}
                    <div ref={dropdownRef} className='relative hidden md:block'>
                        <button
                            onClick={toggleDropdown}
                            className='flex items-center gap-2 px-3 py-2 text-white transition-all duration-200 rounded-lg hover:bg-blue-900 focus:outline-none'
                            aria-label='User menu'
                        >
                            <div className='flex items-center justify-center p-1 bg-blue-800 rounded-full'>
                                <User className='w-5 h-5 text-white' />
                            </div>
                            <span className='text-sm font-medium'>Account</span>
                            <ChevronDown className='w-4 h-4' />
                        </button>

                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className='absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-all duration-200 transform scale-100 opacity-100'>
                                <div className='py-1'>
                                    <button
                                        onClick={toMyProfile}
                                        className='flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-950'
                                    >
                                        <UserCircle className='w-4 h-4 mr-2' />
                                        Your Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className='flex items-center w-full px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-950'
                                    >
                                        <LogOut className='w-4 h-4 mr-2' />
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu dropdown */}
            {isMobileMenuOpen && (
                <div className='sm:hidden bg-blue-900 border-t border-blue-800'>
                    <div className='px-2 pt-2 pb-3 space-y-1'>
                        <hr className='my-2 border-blue-800' />
                        <button
                            onClick={toMyProfile}
                            className='flex items-center w-full px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-800'
                        >
                            <UserCircle className='w-5 h-5 mr-2' />
                            Your Profile
                        </button>
                        <button
                            onClick={handleLogout}
                            className='flex items-center w-full px-3 py-2 text-base font-medium text-white rounded-md hover:bg-blue-800'
                        >
                            <LogOut className='w-5 h-5 mr-2' />
                            Log Out
                        </button>
                    </div>
                </div>
            )}

            {/* Add animation for dropdowns */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </nav>
    )
}

export default Navbar