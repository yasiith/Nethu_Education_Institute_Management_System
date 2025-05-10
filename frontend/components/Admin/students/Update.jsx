"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Update = () => {
    const router = useRouter();
    const [studentID, setStudentID] = useState('');
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messageType, setMessageType] = useState('');
    const [studentFound, setStudentFound] = useState(false);

    const toStudentDashboard = () => {
        router.push('/admin/students');
    };

    const handleFindStudent = async () => {
      if (!studentID) {
        setMessage("Please enter a Student ID");
        setMessageType('error');
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`https://nethu-education-institute-management.onrender.com/api/auth/getstudentinfo/${studentID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (res.ok) {
          setFullName(data.data.name);
          setEmail(data.data.email);
          setNewFullName(data.data.name);
          setNewEmail(data.data.email);
          setMessage("Student information retrieved successfully.");
          setMessageType('success');
          setStudentFound(true);
        } else {
          setFullName('');
          setEmail('');
          setNewFullName('');
          setNewEmail('');
          setMessage(data.error || "Student not found.");
          setMessageType('error');
          setStudentFound(false);
        }
      } catch (error) {
        console.error("Error fetching student information:", error);
        setMessage("An error occurred while retrieving the student information.");
        setMessageType('error');
        setStudentFound(false);
      } finally {
        setIsLoading(false);
      }
    };

    const handleUpdateStudent = async () => {
      if (!newFullName || !newEmail) {
        setMessage("Please enter the new full name and email.");
        setMessageType('error');
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`https://nethu-education-institute-management.onrender.com/api/auth/updatestudent/${studentID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ name: newFullName, email: newEmail }),
        });

        const data = await res.json();

        if (res.ok) {
           setFullName(data.data.name);
           setEmail(data.data.email);
           setMessage("Student updated successfully!");
           setMessageType('success');
        } else {
          setMessage(data.error || "Failed to update student.");
          setMessageType('error');
        }
      } catch (error) {
        console.error("Error updating student information:", error);
        setMessage("An error occurred while updating the student information.");
        setMessageType('error');
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
                Student Management
              </span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-blue-600 sm:text-lg md:mt-5">
              Update student information
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="md:flex">
              {/* Left Section - Design Panel */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-700 md:w-2/5 p-8 flex flex-col justify-between">
                <div className="text-white">
                  <h2 className="text-3xl font-bold mb-4">Update Student</h2>
                  <p className="opacity-80 mb-6">
                    Modify existing student information in your institution's database.
                  </p>
                  
                  <div className="hidden md:block mt-8">
                  <svg className="w-24 h-24 mx-auto text-white opacity-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                  
                </div>
                
                <button
                  onClick={toStudentDashboard}
                  className="mt-6 group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-blue-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-150"
                >
                  ← Back to Dashboard
                </button>
              </div>

              {/* Right Section - Form */}
              <div className="md:w-3/5 p-8">
                <div className="space-y-6">
                  {/* Search Section */}
                  <div className="bg-blue-50 p-6 rounded-xl">
                    <h3 className="text-lg font-medium text-blue-800 mb-4">Find Student</h3>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={studentID}
                        onChange={(e) => setStudentID(e.target.value)}
                        placeholder="Enter Student ID"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <button 
                        onClick={handleFindStudent}
                        disabled={isLoading}
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        {isLoading ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Searching
                          </span>
                        ) : "Search"}
                      </button>
                    </div>
                  </div>

                  {/* Message Display */}
                  {message && (
                    <div className={`p-4 rounded-lg ${messageType === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                      <div className="flex">
                        <div className="flex-shrink-0">
                          {messageType === 'success' ? (
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium">{message}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Student Information */}
                  {studentFound && (
                    <div className="space-y-6">
                      {/* Current Info Display */}
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Current Information</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <div className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg">{FullName}</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="px-3 py-2 bg-gray-100 text-gray-800 rounded-lg">{Email}</div>
                          </div>
                        </div>
                      </div>

                      {/* New Info Inputs */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4">Update Information</h3>
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="newFullName" className="block text-sm font-medium text-gray-700">
                              New Full Name
                            </label>
                            <input
                              id="newFullName"
                              type="text"
                              value={newFullName}
                              onChange={(e) => setNewFullName(e.target.value)}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="newEmail" className="block text-sm font-medium text-gray-700">
                              New Email
                            </label>
                            <input
                              id="newEmail"
                              type="email"
                              value={newEmail}
                              onChange={(e) => setNewEmail(e.target.value)}
                              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Update Button */}
                      <div>
                        <button
                          onClick={handleUpdateStudent}
                          disabled={isLoading}
                          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Updating
                            </span>
                          ) : "Update Student"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Update;