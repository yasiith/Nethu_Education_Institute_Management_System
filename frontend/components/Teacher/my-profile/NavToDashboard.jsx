'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();

    const toDashboard = () => {
        router.push('/teachers');
    }

    return (
        <nav className='relative w-full bg-blue-950 shadow-lg'>
            <div className='w-full flex justify-between items-center h-16 px-4 md:px-6 lg:px-8'>
                {/* Logo - Using the NEIMS text only */}
                <div className='flex-shrink-0 ml-0'>
                    <span className='text-2xl font-bold text-white'>
                        <Link href='/' className='hover:text-blue-300 transition-colors duration-200'>NEIMS</Link>
                    </span>
                </div>
                
                {/* Dashboard Button - preserving original styling */}
                <div className='flex-shrink-0 mr-0'>
                    <button
                        onClick={toDashboard}
                        className='bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-lg font-medium text-base shadow-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center group'
                    >
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                            />
                        </svg>
                        Dashboard
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;