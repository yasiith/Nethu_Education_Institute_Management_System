'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavToDashboard = () => {
    const router = useRouter();

    const toDashboard = () => {
        router.push('/student');
    }

    return (
        <nav className='bg-gradient-to-r from-emerald-700 to-teal-600 shadow-lg w-full'>
            <div className='max-w-7xl mx-auto flex justify-between items-center h-16 px-6'>
                <div className='flex-shrink-0 flex items-center'>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-8 w-8 text-white mr-3" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                        />
                    </svg>
                    <span className='text-3xl font-bold text-white tracking-tight'>
                        <Link href='/' className='hover:text-emerald-100 transition-colors duration-200'>NEIMS</Link>
                    </span>
                </div>
                <div className='flex items-center'>
                    <button
                        onClick={toDashboard}
                        className='bg-white text-emerald-700 px-6 py-2 rounded-lg font-medium text-base shadow-md hover:bg-emerald-50 transition-all duration-200 flex items-center group'
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
                        DASHBOARD
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavToDashboard;