"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter for Next.js 13+

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(null);
  const [classCount, setClassCount] = useState(null);
  const [teacherCount, setTeacherCount] = useState(null);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Clear all locally stored values, including email and password
      localStorage.clear();

      // Navigate to the login page
      router.push("/Login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [students, classes, teachers] = await Promise.all([
          axios.get("http://localhost:5000/api/student-count"),
          axios.get("http://localhost:5000/api/class-count"),
          axios.get("http://localhost:5000/api/teacher-count")
        ]);

        setStudentCount(students.data.studentCount);
        setClassCount(classes.data.classCount);
        setTeacherCount(teachers.data.teacherCount);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center pt-5">
        <div className="bg-gray-300 rounded-[35px] flex justify-center pt-5 pb-5 w-full md:w-1/2">
          <h1 className="text-2xl font-bold text-center md:text-4xl">
            WELCOME TO ADMIN DASHBOARD
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-5 py-5 md:flex-row">
        <div className="bg-teal-600 rounded-[35px] text-white text-center p-5 w-full md:w-1/4">
          <h3 className="text-xl font-semibold leading-none md:text-2xl">REGISTERED</h3>
          <h3 className="text-2xl font-semibold leading-none md:text-3xl">STUDENTS</h3>
          <p className="text-4xl font-semibold leading-none md:text-6xl">
            {studentCount !== null ? studentCount : "Loading..."}
          </p>
        </div>
        <div className="bg-gray-400 rounded-[35px]  text-white text-center p-5 w-full md:w-1/4">
          <h3 className="mb-4 text-2xl font-semibold leading-none md:text-3xl md:mt-5 md:mb-3">CLASSES</h3>
          <h1 className="text-4xl font-semibold leading-none md:text-6xl">
            {classCount !== null ? classCount : "Loading..."}
          </h1>
        </div>
      </div>
      <div className="flex flex-col items-start justify-center gap-5 pb-5 md:flex-row">
        
        <div className="bg-gray-300 rounded-[35px] p-5 text-center w-full md:w-1/4">
          <p className="text-4xl font-bold leading-none md:text-6xl">
            {teacherCount !== null ? teacherCount : "Loading..."}
          </p>
          <p className="text-xl font-semibold md:text-2xl">TEACHERS</p>
          <p className="text-xl font-semibold md:text-2xl">REGISTERED</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white text-center rounded-[25px] p-5 w-full md:w-1/4 text-2xl font-bold md:text-4xl">
            <h1 className="text-2xl font-bold md:text-4xl">Log Out</h1>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;