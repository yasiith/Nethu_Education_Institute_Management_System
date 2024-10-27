"use client";

import TeacherNavLeft from "@components/Teacher/TeacherNavLeft";
import InsideGradeFrom from "@components/Teacher/insideGrade";
import Calendar from "@components/Teacher/Calander"; // Assuming Calendar is a functional component
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  return (
    <div className="h-screen flex bg-gray-100">
      {/* Left Column */}
      <div className="w-1/4 pt-8 p-6">
        <TeacherNavLeft />
      </div>

      {/* Middle Column */}
      <div className="w-2/4  m-8 mr-12 flex flex-col justify-around bg-gray-100">
        {/* Buttons */}
        <button className="bg-gray-300 w-full text-2xl py-4 mb-4 rounded-lg font-bold">
          DESCRIPTION
        </button>
        <button className="bg-gray-300 w-full text-2xl py-4 mb-4 rounded-lg font-bold">
          STUDY MATERIAL
        </button>
        <button className="bg-gray-300 w-full text-2xl py-4 mb-4 rounded-lg font-bold">
          QUIZ
        </button>
        <button className="bg-gray-300 w-full text-2xl py-4 mb-4 rounded-lg font-bold">
          LIVE
        </button>
      </div>

      {/* Right Column with 3 Rows */}
      <div className="w-1/4 p-4 flex flex-col justify-between">
        {/* Row 1: Back Button */}
        <div className="h-1/3 flex items-center justify-center mb-4">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded-lg font-semibold"
            onClick={() => router.back()}
          >
            BACK
          </button>
        </div>

        {/* Row 2: Calendar Component */}
        <div className="h-1/3 bg-white shadow-md p-4 rounded-lg mb-4 flex items-center justify-center">
          <Calendar />
        </div>

        {/* Row 3: Empty or Customizable */}
        <div className="h-1/3shadow-md p-4 rounded-lg flex items-center justify-center">
          Row 3 Content
        </div>
      </div>
    </div>
  );
};

export default Page;
