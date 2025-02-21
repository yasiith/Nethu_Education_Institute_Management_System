"use client";

import React from 'react';
import { Calendar, Link, Play } from 'lucide-react';

const UpcomingMeeting = () => {
  const participants = [
    { id: 1, avatar: '/api/placeholder/32/32' },
    { id: 2, avatar: '/api/placeholder/32/32' },
    { id: 6, avatar: '/api/placeholder/32/32' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Upcoming Meeting</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 max-w-2xl">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-6 h-6" />
          <h2 className="text-2xl font-semibold">Instant Meeting</h2>
        </div>
        
        <p className="text-gray-400 mb-6">2/20/2025, 12:00:00 AM</p>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex -space-x-2">
            {participants.slice(0, 5).map((participant) => (
              <img
                key={participant.id}
                src={participant.avatar}
                alt={`Participant ${participant.id}`}
                className="w-8 h-8 rounded-full border-2 border-gray-800"
              />
            ))}
            {participants.length > 5 && (
              <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-800 flex items-center justify-center text-sm">
                +{participants.length - 5}
              </div>
            )}
          </div>
          
          <div className="flex gap-4">
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2 transition-colors">
              <Play className="w-4 h-4" />
              Start
            </button>
            
            <button className="border border-gray-600 hover:border-gray-500 px-6 py-2 rounded-md flex items-center gap-2 transition-colors">
              <Link className="w-4 h-4" />
              Copy Link
            </button>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default UpcomingMeeting;