"use client";

import React from 'react';
import { Video, Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <div className="md:hidden flex items-center justify-between p-6 bg-gray-800">
      <div className="flex items-center gap-3">
        <Video className="w-8 h-8 text-blue-500" />
        <span className="text-2xl font-bold">NETHU</span>
      </div>
      <button 
        onClick={toggleSidebar}
        className="p-3 hover:bg-gray-700 rounded-lg"
      >
        <Menu className="w-8 h-8" />
      </button>
    </div>
  );
};

export default Header;