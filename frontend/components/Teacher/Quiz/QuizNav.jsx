'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Menu, User, LogOut, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    const toMyProfile = () => {
        router.push('/teachers/my-profile');
        setIsDropdownOpen(false);
    }

    const toDashboard = () => {
        router.push('/teachers');
        setIsDropdownOpen(false);
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

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

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
        <nav className='bg-blue-950 shadow-md w-full'>
            <div className='w-full mx-auto px-4 md:px-6'>
                <div className='flex justify-between items-center h-16'>
                    {/* NEIMS text - right aligned */}
                    <div className='mr-auto'>
                        <span className='text-3xl font-semibold text-white'>
                            <Link href='/' className='hover:text-blue-300 transition-colors duration-200'>NEIMS</Link>
                        </span>
                    </div>
                    
                    {/* Menu dropdown - right aligned */}
                    <div ref={dropdownRef} className='relative'>
                        <button
                            onClick={toggleDropdown}
                            className='flex items-center p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-blue-900 transition-colors duration-200'
                            aria-label='Menu'
                        >
                            <Menu className='h-6 w-6 text-white' />
                        </button>
                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-200 z-10'>
                                <div className='py-1 rounded-md overflow-hidden'>
                                    <div className='px-4 py-3 border-b border-gray-100'>
                                        <p className='text-sm font-medium text-gray-900'>Teacher Options</p>
                                    </div>
                                    <button 
                                        onClick={toDashboard}
                                        className='flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 group transition-colors duration-200'
                                    >
                                        <span className='group-hover:font-medium'>Dashboard</span>
                                        <ChevronRight className='h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200' />
                                    </button>
                                    <button 
                                        onClick={toMyProfile}
                                        className='flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 group transition-colors duration-200'
                                    >
                                        <span className='group-hover:font-medium'>My Profile</span>
                                        <User className='h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-200' />
                                    </button>
                                    <button 
                                        onClick={handleLogout}
                                        className='flex items-center justify-between w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 group transition-colors duration-200'
                                    >
                                        <span className='group-hover:font-medium'>Log Out</span>
                                        <LogOut className='h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors duration-200' />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Animation for dropdown */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .transition-all {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </nav>
    )
}

export default Navbar