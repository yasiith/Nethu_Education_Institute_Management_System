"use client";
import { useState } from 'react';
import Link from 'next/link';

const adminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className='bg-blue-950 text-white py-4 font-semibold'>
        <div className='container mx-auto flex justify-between'>
            <h1 className='text-4xl pl-10'><Link href="/">NEIMS</Link></h1>
            <ul className="flex items-center space-x-8 pr-10 text-xl">
                <li><Link href="/admin">Overview</Link></li>
                <li><Link href="/admin/students">Students</Link></li>
                <li><Link href="/admin/teachers">Teachers</Link></li>
                <li><Link href="/admin/announcements">Announcements</Link></li>
                
            </ul>
        </div>
    </nav>
  )
}

export default adminNav
