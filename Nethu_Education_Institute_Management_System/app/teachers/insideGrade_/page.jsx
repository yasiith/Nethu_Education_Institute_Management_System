"use client";

import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function InsideGradePage() {
  const [date, setDate] = useState(new Date());
  const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle navbar

  return (
    <div className="flex flex-col h-screen md:flex-row">
      {/* Sidebar (Navigation) */}
      <div
        className={`${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 z-20 w-3/4 md:w-1/5 bg-[#03045E] text-white flex flex-col items-center p-4 transition-transform duration-300 h-screen md:static md:translate-x-0`}
      >
        <h1 className="mb-6 text-2xl font-bold">NEIMS</h1>
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 mb-2 bg-gray-400 rounded-full"></div>
          <p>MR. Yasith</p>
        </div>
        <button className="w-full py-2 my-2 bg-[#0077B6] rounded-md hover:bg-[#0096C7]">
          CLASSES
        </button>
        <button className="w-full py-2 my-2 bg-[#0077B6] rounded-md hover:bg-[#0096C7]">
          CLASSES
        </button>
        <button className="w-full py-2 my-2 bg-[#0077B6] rounded-md hover:bg-[#0096C7]">
          CLASSES
        </button>
         <button className="w-full py-2 mt-auto bg-teal-500 rounded-lg shadow-md hover:bg-teal-600">
          CREATE
        </button>
        <button className="w-full py-2 my-2 bg-[#0077B6] rounded-md hover:bg-[#0096C7]">
          BACK
        </button>
        <button className="w-full py-2 my-2 bg-red-600 rounded-md hover:bg-red-700">
          LOG OUT
        </button>
      </div>

      {/* Toggle Button for Navbar */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="md:hidden p-2 bg-[#03045E] text-white fixed top-4 left-4 z-30 rounded-full"
      >
        {isNavOpen ? "Close" : "Menu"}
      </button>

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
