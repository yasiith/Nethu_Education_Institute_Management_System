"use client"; // Add this line at the top

import React, { useState } from "react";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import calendar styles

const Calander_Page = () => {
  const [date, setDate] = useState(new Date()); // State to hold selected date

  return (
    <div className="h-[380px] w-1/4 max-w-[430px] items-center bg-blue-900 flex flex-col rounded-[28px] p-4 md:p-6 lg:h-[350px] lg:w-[430px]">
      {/* Calendar Section */}
      <div className="flex-grow flex items-center justify-center w-full">
        <Calendar
          onChange={setDate}
          value={date}
          className="rounded-[20px] shadow-md p-2 bg-white w-1 "
        />
      </div>
    </div>
  );
};

export default Calander_Page;
