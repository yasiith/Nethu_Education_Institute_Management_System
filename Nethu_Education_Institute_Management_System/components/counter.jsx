"use client";
import React, { useRef } from "react";
import CountUp from "react-countup";

const ScrollInCounter = () => {
  const counterRef = useRef(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4 md:gap-[20px] pt-4 pl-20 pr-20 bg-white">
      {/* First Block */}
      <div className="z-10 flex flex-col items-center justify-center p-4">
        <div
          ref={counterRef}
          className="text-[40px] text-gray-600 font-semibold hover:text-orange-500 text-center"
        >
          <CountUp start={0} end={5000} prefix="[ " suffix="+ ]" />
        </div>
        <h6 className="mt-2 text-center text-gray-500">STUDENTS</h6>
      </div>

      {/* Second Block */}
      <div className="flex flex-col items-center justify-center p-4">
        <div
          ref={counterRef}
          className="text-[40px] text-gray-600 font-semibold hover:text-orange-500 text-center"
        >
          <CountUp start={0} end={10} prefix="[ " suffix="+ ]" />
        </div>
        <h6 className="mt-2 text-center text-gray-500">YEARS OF EXPERIENCE</h6>
      </div>
    </div>
  );
};

export default ScrollInCounter;