'use client'
import React from 'react';
import { useState,useEffect, useRef } from 'react';
import {User} from 'lucide-react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const router = useRouter();
    const toMyProfile = () => {
        router.push('/student/my-profile');
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
    <nav className='w-full shadow-md bg-blue-950'>
        <div className='max-w-7xl'>
            <div className='flex items-center justify-between h-16 p-10'>
                <div className='flex-shrink-0 p-5'>
                    <span className='text-3xl font-semibold text-white'><Link href='/'>NEIMS</Link></span>
                </div>
                <div ref={dropdownRef} className='absolute right-8'>
                    <button
                        onClick={toggleDropdown}
                        className='items-center p-2 rounded-full hover:bg-blue-800 focus:outline-none focus:ring-offset-2 focus:ring-blue-200'
                    >
                        <User className='w-8 h-8 text-white' />
                    </button>
                    {/* Dropdown menu */}
                    {isDropdownOpen && (
                        <div className='absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-black ring-opacity-5'>
                            <div className="">
                                <button 
                                    onClick = {toMyProfile}
                                    className='w-full p-3 font-bold text-white bg-blue-950 hover:bg-gray-200 hover:text-blue-950'
                                
                                >
                                    Your Profile
                                  </button>
                                  <button
                                    onClick={handleLogout}
                                  className='w-full p-3 font-bold text-white bg-blue-950 hover:bg-gray-200 hover:text-blue-950'>
                                      Log Out
                                  </button>
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
