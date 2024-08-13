"use client";
import React, { useRef } from "react";
import CountUp from "react-countup";

const ScrollInCounter = () => {
  const counterRef = useRef(null);

  return (
    <>
      <div className="grid place-items-center grid-cols-2 gap-4 pt-4 bg-white ">
        {/* First Block */}
        <div className="z-10 ml-[300px]  p-4 flex flex-col items-center justify-center  ">
          <div
            ref={counterRef}
            className=" text-[40px] text-gray-600 font-semibold  hover:text-orange-500 bl text-center"
          >
            <CountUp start={0} end={5000} prefix="[ " suffix="+ ]" />
          </div>
          <h6 className="mt-2 text-gray-500 text-center">STUDENTS</h6>
        </div>

        {/* Second Block */}
        <div className="mr-[300px] p-4 flex flex-col items-center justify-center ">
          <div
            ref={counterRef}
            className="text-[40px] text-gray-600 font-semibold  hover:text-orange-500 text-center"
          >
            <CountUp start={0} end={10} prefix="[ "  suffix="+ ]" />
          </div>
          <h6 className="mt-2 text-gray-500 text-center">
            YEARS OF EXPERIENCE
          </h6>
        </div>
      </div>
    </>
  );
};

export default ScrollInCounter;