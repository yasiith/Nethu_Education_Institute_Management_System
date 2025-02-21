"use client";

import React, { useState, useEffect } from 'react';
import { Home, Calendar, Clock, Video, Users, Plus, Menu } from 'lucide-react';

const Layout = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Home');
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const navigationItems = [
    { name: 'Home', icon: <Home className="w-8 h-8" /> },
    { name: 'Upcoming', icon: <Calendar className="w-8 h-8" /> },
    { name: 'Previous', icon: <Clock className="w-8 h-8" /> },
    { name: 'Recordings', icon: <Video className="w-8 h-8" /> },
    { name: 'Personal Room', icon: <Users className="w-8 h-8" /> }
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900 text-white">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-6 bg-gray-800">
        <div className="flex items-center gap-3">
          <Video className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold">YOOM</span>
        </div>
        <button 
          onClick={() => setSidebarOpen(!isSidebarOpen)}
          className="p-3 hover:bg-gray-700 rounded-lg"
        >
          <Menu className="w-8 h-8" />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`
        ${isSidebarOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-80 bg-gray-900 p-6 
        fixed md:relative top-0 left-0 h-full z-50
        md:min-h-screen
      `}>
        <div className="hidden md:flex items-center gap-3 mb-10">
          <Video className="w-8 h-8 text-blue-500" />
          <span className="text-2xl font-bold">YOOM</span>
        </div>

        <nav className="space-y-3">
          {navigationItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                setActiveTab(item.name);
                setSidebarOpen(false);
              }}
              className={`flex items-center gap-4 w-full p-4 rounded-lg transition-colors text-lg ${
                activeTab === item.name ? 'bg-blue-500' : 'hover:bg-gray-800'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 lg:p-10">
        <div className="rounded-2xl bg-gray-800/50 p-6 md:p-8 lg:p-10 mb-8 relative overflow-hidden min-h-[300px]">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: "url('/assets/images/hero-background.png')",
              zIndex: 0
            }}
          />
          
          {/* Content with relative positioning */}
          <div className="relative z-10">
            <div className="bg-gray-700/50 text-base px-6 py-3 rounded-md inline-block mb-6">
              Upcoming Meeting at: 12:30 PM
            </div>
            <div className="text-5xl md:text-7xl font-bold mb-4">{formatTime(currentTime)}</div>
            <div className="text-gray-400 text-lg md:text-xl">{formatDate(currentTime)}</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-orange-500 rounded-xl p-6 md:p-8">
            <div className="bg-white/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Plus className="w-8 h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">New Meeting</h3>
            <p className="text-base text-white/80">Start an instant meeting</p>
          </div>

          <div className="bg-blue-500 rounded-xl p-6 md:p-8">
            <div className="bg-white/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Join Meeting</h3>
            <p className="text-base text-white/80">via invitation link</p>
          </div>

          <div className="bg-purple-500 rounded-xl p-6 md:p-8">
            <div className="bg-white/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">Schedule Meeting</h3>
            <p className="text-base text-white/80">Plan your meeting</p>
          </div>

          <div className="bg-yellow-500 rounded-xl p-6 md:p-8">
            <div className="bg-white/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
              <Video className="w-8 h-8" />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold mb-3">View Recordings</h3>
            <p className="text-base text-white/80">Meeting Recordings</p>
          </div>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;