"use client";

import React, { useState, useEffect } from "react";

import JoinMeetingDialog from "@components/Live/Home/JoinMeeting/JoinMeetingDialog";
import ScheduleMeeting from "@components/Live/Home/ScheduleMeeting/ScheduleMeetingDialog ";
import RecordingsCard from "@components/Live/Home/RecordingsCard/RecordingsCard";

const HomePage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex-1 p-6 md:p-8 lg:p-10">
      <div className="rounded-2xl bg-gray-800/50 p-6 md:p-8 lg:p-10 mb-8 relative overflow-hidden min-h-[300px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: "url('/assets/images/hero-background.png')",
            zIndex: 0,
          }}
        />

        <div className="relative z-10">
          <div className="bg-gray-700/50 text-base px-6 py-3 rounded-md inline-block mb-6">
            Upcoming Meeting at: 12:30 PM
          </div>
          <div className="text-5xl md:text-7xl font-bold mb-4">
            {formatTime(currentTime)}
          </div>
          <div className="text-gray-400 text-lg md:text-xl">
            {formatDate(currentTime)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <JoinMeetingDialog />
        <ScheduleMeeting />
        <RecordingsCard />
      </div>
    </div>
  );
};

export default HomePage;