'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NavToDashboard = () => {
    const router = useRouter();

    const toDashboard = () => {
        router.push('/teachers');
    }

    return (
        <nav className='bg-blue-950 shadow-md w-full'>
            <div className='max-w-7xl mx-auto flex justify-between items-center h-16 px-6'>
                <div className='flex-shrink-0'>
                    <span className='text-3xl font-semibold text-white'>
                        <Link href='/'>NEIMS</Link>
                    </span>
                </div>
                <div>
                    <button
                        onClick={toDashboard}
                        className='bg-orange-500 text-white px-6 py-1 rounded-xl font-semibold text-xl shadow-sm hover:bg-orange-700'
                    >
                        BACK
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default NavToDashboard;