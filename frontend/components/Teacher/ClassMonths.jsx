'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Sidebar Component - Kept unchanged as requested
const Sidebar = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const classIdFromParams = params?.classId;
  const [selectedClass, setSelectedClass] = useState(classIdFromParams || null);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const fetchClasses = async () => {
    const teacherID = localStorage.getItem("TeacherID");
    if (!teacherID) {
      alert("TeacherID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `http://143.110.187.69:5000/api/classes/getClassesByTeacher?teacherId=${teacherID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Error fetching classes");
      }

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error loading classes:", error);
      alert("Error loading classes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassClick = (classId) => {
    setSelectedClass(classId);
    window.location.href = `/teachers/classes/${classId}`;
  };

  const handleClickBack = () => { 
    window.location.href = '/teachers';
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed z-30 p-2 text-white bg-blue-600 rounded-md top-4 left-4 md:hidden"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`fixed top-0 left-0 z-20 h-screen bg-[#03045E] text-white flex flex-col items-center p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full bg"
        } md:translate-x-0 md:w-1/5`}
      >
        <h1 className="mb-6 text-4xl font-semibold">NEIMS</h1>

        {/* Display Teacher's Classes */}
        <div className="flex flex-col w-full overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#03045E] [&::-webkit-scrollbar-thumb]:bg-[#03045E] [&::-webkit-scrollbar-thumb]:rounded-full">
          <h2 className="mb-3 text-lg font-semibold text-center text-teal-400">
            Your Classes
          </h2>

          {loading ? (
            <div className="text-center text-gray-300">Loading classes...</div>
          ) : (
            <div className="flex flex-col w-full gap-4 mt-3">
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <div
                    key={classItem._id}
                    onClick={() => handleClassClick(classItem.classid)}
                    className={`flex flex-col items-center w-full p-4 transition duration-300 rounded-md shadow-md cursor-pointer ${
                      selectedClass === classItem.classid
                        ? "bg-teal-500" // Highlight selected class
                        : "bg-teal-800 hover:bg-teal-600"
                    }`}
                  >
                    <h2 className="font-bold text-center text-white text-md">
                      {classItem.year}
                    </h2>
                    <h2 className="font-bold text-center text-white text-md">
                      Grade {classItem.grade}
                    </h2>
                    <p className="font-bold text-center text-white text-md">
                      {classItem.subject}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No classes available.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Buttons */}
        <div className="w-full mt-auto">
          <button
            onClick={handleClickBack}
            className="w-full py-2 my-2 bg-[#0077B6] text-white text-sm font-medium rounded-md hover:bg-[#0096C7] transition-all">
            DASHBOARD
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 text-sm font-medium text-white transition-all bg-red-600 rounded-md hover:bg-red-700"
          >
            LOG OUT
          </button>
        </div>
      </div>

      {/* Dim Background for Open Sidebar */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
        />
      )}
    </>
  );
};

// Main Class Months Component
const ClassMonths = () => {
  const { classId } = useParams(); // Fetch dynamic route param
  const router = useRouter();
  const [hoverMonth, setHoverMonth] = useState(null);

  const navigateToQuizzes = (month) => {
    router.push(`/teachers/classes/${classId}/months/${month}/quizzes`);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gradient-to-r from-green-50 to-teal-50 p-6 md:ml-[20%]">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-10 mt-6">
            <h1 className="text-3xl font-bold text-green-800">Monthly Quizzes</h1>
            <p className="text-teal-600 mt-2">Select a month to manage quizzes for Class ID: {classId}</p>
          </div>
          
          {/* Months Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {months.map((month, index) => (
              <div 
                key={index}
                className="relative group"
                onMouseEnter={() => setHoverMonth(month)}
                onMouseLeave={() => setHoverMonth(null)}
                onClick={() => navigateToQuizzes(month)}
              >
                <div className={`
                  bg-gradient-to-r from-green-500 to-teal-600 
                  rounded-xl shadow-lg overflow-hidden
                  transition-all duration-300 transform
                  ${hoverMonth === month ? 'scale-105 shadow-xl' : ''}
                  h-48 flex items-center justify-center p-6
                `}>
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white opacity-10 rounded-full"></div>
                  
                  <div className="relative z-10 text-center">
                    <h2 className="text-2xl font-bold text-white group-hover:text-green-100 transition-colors duration-300">
                      {month}
                    </h2>
                    
                    <div className={`
                      mt-3 w-0 h-1 bg-white mx-auto transition-all duration-300
                      ${hoverMonth === month ? 'w-16' : ''}
                    `}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassMonths;