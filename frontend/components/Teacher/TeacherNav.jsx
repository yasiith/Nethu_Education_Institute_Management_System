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
    }, []);

    return (
        <>
            {/* Main Navigation Container */}
            <nav className="relative w-full bg-blue-950 shadow-lg">
                <div className="container px-4 mx-auto">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center">
                            <Link href="/" className="flex items-center">
                                <span className="text-2xl font-bold text-white transition-all duration-300 hover:text-blue-300">
                                    NEIMS
                                </span>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center md:hidden">
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                                aria-label="Toggle mobile menu"
                            >
                                {isMobileMenuOpen ? 
                                    <X className="w-6 h-6" /> : 
                                    <Menu className="w-6 h-6" />
                                }
                            </button>
                        </div>

                        {/* User dropdown menu - Desktop */}
                        <div ref={dropdownRef} className="relative hidden md:block">
                            <button
                                onClick={toggleDropdown}
                                className="flex items-center gap-2 px-3 py-2 text-white rounded-lg hover:bg-blue-900 focus:outline-none transition-all duration-200"
                                aria-label="User menu"
                            >
                                <div className="flex items-center justify-center p-1 bg-blue-800 rounded-full">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-sm font-medium">Account</span>
                                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Modern Dropdown */}
                            {isDropdownOpen && (
                                <div className="absolute right-0 z-10 mt-2 overflow-hidden bg-white rounded-lg shadow-lg w-52 transform origin-top-right transition-all duration-200 ease-out">
                                    <div className="py-1 border-b border-gray-100">
                                        <div className="px-4 py-3">
                                            <p className="text-sm font-medium text-gray-900">Account Options</p>
                                            <p className="text-xs text-gray-500 truncate">Manage your settings</p>
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

                {/* Mobile menu - with modern styling */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden bg-blue-900 border-t border-blue-800 shadow-inner">
                        <div className="px-3 py-4 space-y-1">
                            <div className="px-2 pt-2 pb-3 mb-3 border-b border-blue-800">
                                <p className="text-sm font-medium text-blue-300">ACCOUNT</p>
                            </div>
                            <button
                                onClick={toMyProfile}
                                className="flex items-center w-full px-4 py-3 text-sm font-medium text-white rounded-md hover:bg-blue-700 hover:border-l-4 hover:border-blue-300 transition-all duration-200 group"
                            >
                                <UserCircle className="w-5 h-5 mr-3 group-hover:text-blue-300 transition-colors duration-200" />
                                <span>Your Profile</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex items-center w-full px-4 py-3 text-sm font-medium text-white rounded-md hover:bg-blue-700 hover:border-l-4 hover:border-red-400 transition-all duration-200 group"
                            >
                                <LogOut className="w-5 h-5 mr-3 group-hover:text-red-300 transition-colors duration-200" />
                                <span>Log Out</span>
                            </button>
                        </div>
                    </div>
                )}
            </nav>

            {/* Add animation for dropdowns */}
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .transform {
                    animation: fadeIn 0.2s ease-out forwards;
                }
            `}</style>
        </>
    );
};

export default Navbar;