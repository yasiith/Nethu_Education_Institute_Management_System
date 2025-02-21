"use client";

import React, { useState, useEffect } from "react";
import { Calendar, X } from "lucide-react";

const ScheduleMeetingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [dateTime, setDateTime] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    setDescription('');
    setDateTime('');
  };

  // Format the current date and time as default value for the input
  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    setDateTime(`${year}-${month}-${day}T${hours}:${minutes}`);
  }, []);

  return (
    <>
      <div 
        className="bg-purple-500 rounded-xl p-6 md:p-8 cursor-pointer hover:bg-purple-600 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-white/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
          <Calendar className="w-8 h-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-3">Schedule Meeting</h3>
        <p className="text-base text-white/80">Plan your meeting</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B1E2E] rounded-xl w-full max-w-md p-8 relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Create Meeting</h2>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-white text-base">Add a description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Meeting description..."
                  className="w-full bg-[#272B3B] text-white placeholder-gray-400 p-4 rounded-lg focus:outline-none min-h-[120px] resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-white text-base">Select Date and Time</label>
                <input
                  type="datetime-local"
                  value={dateTime}
                  onChange={(e) => setDateTime(e.target.value)}
                  className="w-full bg-[#272B3B] text-white h-12 px-4 rounded-lg focus:outline-none"
                />
              </div>
              <button 
                onClick={() => {
                  if (description && dateTime) {
                    // Handle schedule meeting logic here
                    console.log('Scheduling meeting:', { description, dateTime });
                    handleClose();
                  }
                }}
                disabled={!description || !dateTime}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white h-12 rounded-lg text-base font-semibold transition-colors"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ScheduleMeetingDialog;