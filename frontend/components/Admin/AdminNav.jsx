"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RiDashboardLine, RiUserLine, RiTeamLine, RiWalletLine, RiNotification3Line, RiMenuLine, RiCloseLine } from 'react-icons/ri';

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  
  // Close mobile menu when changing routes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { path: '/admin', label: 'Overview', icon: <RiDashboardLine className="mr-2" /> },
    { path: '/admin/students', label: 'Students', icon: <RiUserLine className="mr-2" /> },
    { path: '/admin/teachers', label: 'Teachers', icon: <RiTeamLine className="mr-2" /> },
    { path: '/admin/payments/allClasses', label: 'Payments', icon: <RiWalletLine className="mr-2" /> },
    { path: '/admin/announcements', label: 'Announcements', icon: <RiNotification3Line className="mr-2" /> },
  ];

  return (
    <nav className="py-4 font-semibold text-white bg-blue-950 sticky top-0 z-50 shadow-lg">
      <div className="container flex items-center justify-between px-4 mx-auto md:px-10">
        <Link href="/" className="text-4xl font-bold tracking-tighter transition-transform hover:scale-105">
          NEIMS
        </Link>
        
        <div className="md:hidden">
          <button 
            onClick={toggleMenu} 
            className="p-2 text-2xl rounded-full hover:bg-blue-800 transition-colors"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <RiCloseLine /> : <RiMenuLine />}
          </button>
        </div>
        
        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-2 text-lg">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link 
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-md transition-all duration-200 hover:bg-blue-800 hover:shadow-md ${
                  pathname === item.path 
                    ? 'bg-blue-800 shadow-md' 
                    : ''
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <ul className="px-4 py-2 space-y-1">
              {navItems.map((item) => (
                <motion.li 
                  key={item.path}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    href={item.path}
                    className={`flex items-center p-3 rounded-md transition-all duration-200 hover:bg-blue-800 ${
                      pathname === item.path 
                        ? 'bg-blue-800' 
                        : ''
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AdminNav;