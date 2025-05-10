'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        `https://nethu-education-institute-management.onrender.com/api/classes/getClassesByTeacher?teacherId=${teacherID}`,
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
  const { classId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [classID, setClassID] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teacherID, setTeacherID] = useState('');
  const [showMeetingsPanel, setShowMeetingsPanel] = useState(false);

  const navigateToQuizzes = (month) => {
    router.push(`/teachers/classes/${classId}/months-meetings/${month}/meetings`);
  };

  const openZoomMeeting = (joinUrl) => {
    window.open(joinUrl, '_blank');
  };

  useEffect(() => {
    // Get teacher ID from localStorage safely (client-side only)
    if (typeof window !== 'undefined') {
      setTeacherID(localStorage.getItem('TeacherID') || '');
    }

    const pathSegments = pathname.split('/');
    const classIDFromURL = pathSegments[pathSegments.indexOf('classes') + 1];
    if (classIDFromURL) {
      setClassID(classIDFromURL);
    }
  }, [pathname]);

  useEffect(() => {
    if (!classID || !teacherID) return;

    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          `https://nethu-education-institute-management.onrender.com/api/meetings/teacher?teacherId=${teacherID}&classId=${classID}`
        );
        setMeetings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch meetings');
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [teacherID, classID]);

  const deleteMeeting = async (meetingId, e) => {
    e.stopPropagation(); // Prevent card click event
    const confirmDelete = window.confirm('Are you sure you want to delete this meeting?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://nethu-education-institute-management.onrender.com/api/meeting/${meetingId}`);
      setMeetings(meetings.filter(meeting => meeting._id !== meetingId));
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  // Function to toggle meetings panel
  const toggleMeetingsPanel = () => {
    setShowMeetingsPanel(!showMeetingsPanel);
  };

  // Function to close the meetings panel (for clicking outside)
  const closeMeetingsPanel = (e) => {
    if (showMeetingsPanel) {
      setShowMeetingsPanel(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 min-h-screen pt-6 md:pt-12 md:ml-[20%]">
        {/* Page Header */}
        <div className="px-6 mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Monthly Meetings</h1>
            <p className="text-teal-600">Class ID: {classID}</p>
          </div>
          
          {/* Upcoming Meetings Toggle Button */}
          <button 
            onClick={toggleMeetingsPanel}
            className={`px-4 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center space-x-2 ${
              showMeetingsPanel 
                ? 'bg-teal-600 text-white' 
                : 'bg-green-100 text-green-800 hover:bg-green-200'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Upcoming Meetings</span>
          </button>
        </div>
        
        {/* Months Grid */}
        <div className="px-6" onClick={closeMeetingsPanel}>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {months.map((month, index) => (
              <div
                key={index}
                className="group"
                onClick={() => navigateToQuizzes(month)}
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-102 hover:shadow-xl p-6 cursor-pointer h-40 flex items-center justify-center">
                  <h2 className="text-2xl font-bold text-white text-center group-hover:text-yellow-100 transition-all duration-200">
                    {month}
                  </h2>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 bg-white opacity-10 rounded-full"></div>
                  <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-white opacity-10 rounded-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Meetings Panel - with toggle functionality */}
        <div 
          className={`fixed top-0 right-0 z-20 w-80 bg-green-800 bg-opacity-95 text-white rounded-l-xl shadow-xl p-6 space-y-6 transform transition-transform duration-300 h-full overflow-y-auto ${
            showMeetingsPanel ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Upcoming Meetings</h2>
            <button 
              onClick={toggleMeetingsPanel}
              className="text-white hover:text-green-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {loading && 
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-white"></div>
            </div>
          }
          
          {error && 
            <div className="bg-red-800 bg-opacity-50 p-4 rounded-lg">
              <p className="text-white text-center">{error}</p>
            </div>
          }

          {!loading && !error && meetings && meetings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 space-y-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-200 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-center text-green-100 opacity-70">No upcoming meetings</p>
            </div>
          )}

          {meetings && meetings.length > 0 && (
            <ul className="space-y-4">
              {meetings.map((meeting) => (
                <li
                  key={meeting._id}
                  className="p-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg shadow-md transition-all duration-300 hover:bg-opacity-20"
                  onClick={() => openZoomMeeting(meeting.joinUrl)}
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-lg">{meeting.topic}</span>
                      <button
                        className="bg-red-600 text-white text-xs px-2 py-1 rounded-md hover:bg-red-700 transition-colors"
                        onClick={(e) => deleteMeeting(meeting._id, e)}
                      >
                        Delete
                      </button>
                    </div>
                    <span className="text-sm text-green-100 mt-2">
                      {new Date(meeting.startTime).toLocaleString()}
                    </span>
                    <div className="mt-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs text-green-300">Click to join meeting</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Overlay to detect clicks outside the panel */}
        {showMeetingsPanel && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-20 z-10 md:hidden"
            onClick={toggleMeetingsPanel}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ClassMonths;