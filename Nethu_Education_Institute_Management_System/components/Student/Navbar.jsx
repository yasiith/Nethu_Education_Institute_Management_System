'use client'
import React from 'react';
import { useState,useEffect, useRef } from 'react';
import {User} from 'lucide-react';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) =>{
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)){
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
        <div className='max-w-7xl'>
            <div className='flex p-10 justify-between items-center h-16'>
                <div className='flex-shrink-0'>
                    <span className='text-5xl font-semibold text-white'>NEIMS</span>
                </div>
                <div ref={dropdownRef} className='absolute right-8'>
                    <button
                        onClick={toggleDropdown}
                        className='items-center p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-offset-2 focus:ring-blue-200'
                    >
                        <User className='h-8 w-8 text-white' />
                    </button>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className='origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-black ring-opacity-5'>
                            <div className='py-1'>
                                <a 
                                    href="#profile"
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                
                                >
                                    Your Profile
                                </a>
                                <a 
                                    href="#logout"
                                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                >
                                    Log Out
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
