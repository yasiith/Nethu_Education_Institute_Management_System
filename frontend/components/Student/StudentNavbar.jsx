'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { User, LogOut, UserCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const router = useRouter();
    
    const toMyProfile = () => {
        router.push('/student/my-profile');
        setIsDropdownOpen(false);
    }

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
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
    }, []);

    return (
        <nav className='w-full shadow-md bg-blue-950'>
            <div className='w-full mx-auto'>
                <div className='flex items-center justify-between h-16 px-4 md:px-6 lg:px-8'>
                    {/* Logo */}
                    <div className='flex-shrink-0'>
                        <span className='text-3xl font-semibold text-white'>
                            <Link href='/' className='hover:text-blue-300 transition-colors duration-200'>NEIMS</Link>
                        </span>
                    </div>
                    
                    {/* User Dropdown */}
                    <div ref={dropdownRef} className='relative'>
                        <button
                            onClick={toggleDropdown}
                            className='flex items-center p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 focus:ring-offset-blue-900 transition-colors duration-200'
                            aria-label='User menu'
                        >
                            <User className='w-7 h-7 text-white' />
                        </button>
                        
                        {/* Dropdown menu */}
                        {isDropdownOpen && (
                            <div className='absolute right-0 z-10 mt-2 overflow-hidden bg-white rounded-lg shadow-lg w-52 transform origin-top-right transition-all duration-200 ease-out'>
                                <div className="py-1 border-b border-gray-100">
                                    <div className="px-4 py-3">
                                        <p className="text-sm font-medium text-gray-900">Student Options</p>
                                        <p className="text-xs text-gray-500 truncate">Manage your account</p>
                                    </div>
                                </div>
                                <div className="py-1">
                                    <button 
                                        onClick={toMyProfile}
                                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 group transition-colors duration-200"
                                    >
                                        <UserCircle className="w-4 h-4 mr-3 group-hover:text-blue-600 transition-colors duration-200" />
                                        <span className="group-hover:font-medium">Your Profile</span>
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 group transition-colors duration-200"
                                    >
                                        <LogOut className="w-4 h-4 mr-3 group-hover:text-red-600 transition-colors duration-200" />
                                        <span className="group-hover:font-medium">Log Out</span>
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