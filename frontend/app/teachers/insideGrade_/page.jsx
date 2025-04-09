"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import LeftTeacherNav from "@components/Teacher/TeacherNavLeft";

export default function InsideGradePage() {
  const [date, setDate] = useState(new Date());
  

  return (
    <div className="flex flex-col h-screen md:flex-row">   
      <LeftTeacherNav/>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 p-4 space-y-2 text-center bg-gray-100">
        <div className="w-4/5 py-6 text-lg font-semibold bg-gray-300 rounded-lg">
          DESCRIPTION
        </div>
        <div className="w-4/5 py-6 text-lg font-semibold bg-gray-300 rounded-lg">
          STUDY MATERIAL
        </div>
        <div className="w-4/5 py-6 text-lg font-semibold bg-gray-300 rounded-lg">
          QUIZ
        </div>
        <div className="w-4/5 py-6 text-lg font-semibold bg-gray-300 rounded-lg">
          LIVE
        </div>

        {/* Calendar (Centered in Blue Box) */}
        <div className="flex justify-center items-center w-4/5 md:w-3/5 bg-[#03045E] text-gray-700 rounded-lg p-6 mt-6">
          <Calendar onChange={setDate} value={date} className="rounded-lg" />
        </div>
      </div>

      {/* Right Column (Smaller Size) */}
      
    </div>
  );
}
