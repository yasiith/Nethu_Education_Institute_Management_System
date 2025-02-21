"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Calendar, Clock, Video, X } from "lucide-react";

const navigationItems = [
  {
    name: "Home",
    icon: <Home className="w-7 h-7" />,
    path: "/",
  },
  {
    name: "Upcoming",
    icon: <Calendar className="w-6 h-6" />,
    path: "/Live/upcoming",
  },
  {
    name: "Previous",
    icon: <Clock className="w-6 h-6" />,
    path: "/Live/previous",
  },
  {
    name: "Recordings",
    icon: <Video className="w-6 h-6" />,
    path: "/Live/recordings",
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
    setIsOpen(false);
  };

  const isActiveRoute = (path) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-96 bg-gray-900 transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:sticky md:top-0
        `}
      >
        {/* Header with Logo and Close Button */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <Video className="w-8 h-8 text-blue-500" />
            <span className="text-xl font-bold text-white">NETHU</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        {/* Navigation Items Container */}
        <div className="h-[calc(100vh-88px)] overflow-y-auto">
          <nav className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`
                  flex items-center w-full p-4 rounded-xl transition-colors
                  ${
                    isActiveRoute(item.path)
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }
                `}
              >
                <span className="w-8">{item.icon}</span>
                <span className="ml-3 text-base font-medium">{item.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;