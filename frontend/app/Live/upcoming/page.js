"use client";

import React, { useState } from 'react';
import Header from '@components/Live/Header';
import Sidebar from '@components/Live/Sidebar';
import Upcoming from '@components/Live/Upcoming/page';


const Layout = () => {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Sidebar 
        isOpen={isSidebarOpen}
        setIsOpen={setSidebarOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Upcoming />
    </div>
  );
};

export default Layout;