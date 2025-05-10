"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  // To see which page links are defined
  console.log("Navigation routes available: /Login, /Students, /Teachers");
  const [studentCount, setStudentCount] = useState(null);
  const [classCount, setClassCount] = useState(null);
  const [teacherCount, setTeacherCount] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      localStorage.clear();
      router.push("/Login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [students, classes, teachers] = await Promise.all([
          axios.get("http://143.110.187.69:5000/api/student-count"),
          axios.get("http://143.110.187.69:5000/api/class-count"),
          axios.get("http://143.110.187.69:5000/api/teacher-count")
        ]);

        setStudentCount(students.data.studentCount);
        setClassCount(classes.data.classCount);
        setTeacherCount(teachers.data.teacherCount);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse bg-gray-200 rounded-lg h-24 w-full"></div>
  );

  return (
    <div className="bg-white py-8">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-10">
          <div className="bg-white shadow-sm rounded-2xl p-6 transition-all">
            <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
              ADMIN DASHBOARD
            </h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Students Card */}
          <div className="bg-blue-50 overflow-hidden shadow-lg rounded-2xl transition-all hover:shadow-xl h-64 relative">
            <div className="p-8 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-700">Students</h3>
                <div className="p-4 bg-blue-500 bg-opacity-10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <div className="flex items-baseline mt-4">
                  <span className="text-5xl md:text-6xl font-bold text-blue-600">
                    {studentCount}
                  </span>
                  <span className="ml-3 text-lg font-medium text-gray-500">registered</span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-blue-600 h-2"></div>
          </div>

          {/* Classes Card */}
          <div className="bg-green-50  overflow-hidden shadow-lg rounded-2xl transition-all hover:shadow-xl h-64 relative">
            <div className="p-8 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-700">Classes</h3>
                <div className="p-4 bg-green-500  bg-opacity-10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
              </div>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <div className="flex items-baseline mt-4">
                  <span className="text-5xl md:text-6xl font-bold text-green-500">
                    {classCount}
                  </span>
                  <span className="ml-3 text-lg font-medium text-gray-500">active</span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-green-500 h-2"></div>
          </div>

          {/* Teachers Card */}
          <div className="bg-purple-50 overflow-hidden shadow-lg rounded-2xl transition-all hover:shadow-xl h-64 relative">
            <div className="p-8 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-gray-700">Teachers</h3>
                <div className="p-4 bg-purple-500 bg-opacity-10 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998a12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
              </div>
              {loading ? (
                <LoadingSkeleton />
              ) : (
                <div className="flex items-baseline mt-4">
                  <span className="text-5xl md:text-6xl font-bold text-purple-500">
                    {teacherCount}
                  </span>
                  <span className="ml-3 text-lg font-medium text-gray-500">registered</span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-purple-500 h-2"></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <button
            onClick={handleLogout}
            className="bg-white overflow-hidden shadow-lg rounded-2xl transition-all hover:shadow-xl hover:bg-red-50 group h-16 relative"
          >
            <div className="p-4 flex items-center justify-between h-full">
              <span className="text-lg font-medium text-gray-700 group-hover:text-red-600">Log Out</span>
              <div className="p-2 bg-red-500 bg-opacity-10 rounded-full group-hover:bg-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-red-500 h-1"></div>
          </button>
          
          {/* Manage Students button with navigation */}
          <button 
            onClick={() => router.push("/admin/students")}
            className="bg-white overflow-hidden shadow-lg rounded-2xl transition-all hover:shadow-xl hover:bg-blue-50 group h-16 relative"
          >
            <div className="p-4 flex items-center justify-between h-full">
              <span className="text-lg font-medium text-gray-700 group-hover:text-blue-600">Manage Students</span>
              <div className="p-2 bg-blue-500 bg-opacity-10 rounded-full group-hover:bg-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-blue-600 h-1"></div>
          </button>
          
          {/* Manage Teachers button with navigation */}
          <button
            onClick={() => router.push("/admin/teachers")}
            className="bg-white overflow-hidden shadow-lg rounded-2xl transition-all hover:shadow-xl hover:bg-purple-50 group h-16 relative"
          >
            <div className="p-4 flex items-center justify-between h-full">
              <span className="text-lg font-medium text-gray-700 group-hover:text-purple-600">Manage Teachers</span>
              <div className="p-2 bg-purple-500 bg-opacity-10 rounded-full group-hover:bg-purple-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-purple-500 h-1"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;