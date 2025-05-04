"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiImage, FiBookOpen, FiUsers, FiMail, FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    if (loggedInStatus) {
      const userType = localStorage.getItem("role");
      if (userType === "admin") setDashboardPath("/admin");
      else if (userType === "teacher") setDashboardPath("/teachers");
      else if (userType === "student") setDashboardPath("/student");
    }
    
    // Add scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loginHandler = () => {
    router.push("/Login");
  };

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { href: "#home_section", label: "Home", icon: <FiHome className="mr-2" /> },
    { href: "/", label: "Gallery", icon: <FiImage className="mr-2" /> },
    { href: "#classes_section", label: "Classes", icon: <FiBookOpen className="mr-2" /> },
    { href: "#teachers_section", label: "Teachers", icon: <FiUsers className="mr-2" /> },
    { href: "#contact_section", label: "Contact", icon: <FiMail className="mr-2" /> }
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 z-20 w-full border-b bg-blue-950 backdrop-blur-sm transition-all duration-300 ${
        scrolled ? "shadow-lg py-1" : "py-2"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl px-4 py-2 mx-auto">
        <Link href="/">
          <span className="self-center text-xl font-bold text-white whitespace-nowrap hover:text-blue-300 transition-colors duration-300">
            NEIMS
          </span>
        </Link>
        
        <div className="flex items-center space-x-3 md:order-2">
          {isLoggedIn && dashboardPath ? (
            <Link href={dashboardPath}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="px-4 py-1 text-sm font-medium text-center text-white bg-green-500 hover:bg-green-600 rounded-full shadow-md transition-all duration-300"
              >
                Dashboard
              </motion.button>
            </Link>
          ) : null}
          
          {isLoggedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={logoutHandler}
              type="button"
              className="px-4 py-1 text-sm font-medium text-center text-white bg-red-500 hover:bg-red-600 rounded-full shadow-md transition-all duration-300"
            >
              Logout
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loginHandler}
              type="button"
              className="px-4 py-1 text-sm font-medium text-center text-white bg-orange-500 hover:bg-orange-600 rounded-full shadow-md transition-all duration-300"
            >
              Login
            </motion.button>
          )}
          
          <button
            type="button"
            className="inline-flex items-center justify-center p-1 text-white rounded-lg md:hidden hover:bg-blue-800 focus:outline-none transition-colors duration-300"
            onClick={toggleMenu}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
        
        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex md:w-auto md:order-1">
          <ul className="flex items-center space-x-8">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>
                  <span className="group relative flex items-center text-white font-medium text-sm hover:text-blue-300 transition-colors duration-300">
                    {item.label}
                    <motion.span 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"
                      layout
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full md:hidden order-3 overflow-hidden"
            >
              <ul className="flex flex-col space-y-4 p-4 mt-2 bg-blue-900 rounded-lg">
                {navItems.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center px-3 py-2 text-white rounded-lg hover:bg-blue-800 transition-colors duration-300"
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
      </div>
    </motion.nav>
  );
};

export default Navbar;