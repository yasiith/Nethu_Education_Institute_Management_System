"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Add this import
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // Get current path

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Function to determine if a link is active
  const isLinkActive = (path) => {
    return pathname === path ? 'bg-blue-800' : '';
  };

  return (
    <nav className='py-4 font-semibold text-white bg-blue-950'>
      <div className='container flex items-center justify-between px-4 mx-auto md:px-10'>
        <h1 className='text-4xl'><Link href="/">NEIMS</Link></h1>
        <div className='md:hidden'>
          <button onClick={toggleMenu} className='text-2xl'>
            {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
        <ul className={`md:flex items-center space-x-8 text-xl ${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-blue-950 md:bg-transparent`}>
          <li className={`p-4 border-b border-gray-700 md:p-2 md:border-b-0 ${isLinkActive('/admin')} rounded-md transition-colors duration-200`}>
            <Link href="/admin">Overview</Link>
          </li>
          <li className={`p-4 border-b border-gray-700 md:p-2 md:border-b-0 ${isLinkActive('/admin/students')} rounded-md transition-colors duration-200`}>
            <Link href="/admin/students">Students</Link>
          </li>
          <li className={`p-4 border-b border-gray-700 md:p-2 md:border-b-0 ${isLinkActive('/admin/teachers')} rounded-md transition-colors duration-200`}>
            <Link href="/admin/teachers">Teachers</Link>
          </li>
          <li className={`p-4 md:p-2 ${isLinkActive('/admin/announcements')} rounded-md transition-colors duration-200`}>
            <Link href="/admin/announcements">Announcements</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminNav;