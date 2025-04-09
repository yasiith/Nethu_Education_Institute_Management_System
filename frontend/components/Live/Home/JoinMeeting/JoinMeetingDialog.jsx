"use client";

import React, { useState } from "react";
import { Users, X } from "lucide-react";

const JoinMeetingDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [meetingLink, setMeetingLink] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    setMeetingLink('');
  };

  return (
    <>
      <div 
        className="bg-blue-500 rounded-xl p-6 md:p-8 cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <div className="bg-white/20 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
          <Users className="w-8 h-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-semibold mb-3">Join Meeting</h3>
        <p className="text-base text-white/80">via invitation link</p>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#1B1E2E] rounded-xl w-full max-w-md p-8 relative">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Type the link here</h2>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="space-y-6">
              <input
                type="text"
                value={meetingLink}
                onChange={(e) => setMeetingLink(e.target.value)}
                placeholder="Meeting link"
                className="w-full bg-[#272B3B] text-white placeholder-gray-400 h-12 px-4 rounded-lg focus:outline-none"
              />
              <button 
                onClick={() => {
                  if (meetingLink) {
                    // Handle join meeting logic here
                    console.log('Joining meeting:', meetingLink);
                    handleClose();
                  }
                }}
                disabled={!meetingLink}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white h-12 rounded-lg text-base font-semibold transition-colors"
              >
                Join Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JoinMeetingDialog;