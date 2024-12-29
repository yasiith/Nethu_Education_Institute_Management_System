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
        const res = await fetch(`http://localhost:5000/api/auth/getstudentinfo/${studentID}`, {
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
          setMessage("Student information retrieved successfully.");
          setMessageType('success');
        } else {
          setMessage(data.error || "Student not found.");
          setMessageType('error');
        }
      } catch (error) {
        console.error("Error fetching student information:", error);
        setMessage("An error occurred while retrieving the student information.");
        setMessageType('error');
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
        const res = await fetch(`http://localhost:5000/api/auth/updatestudent/${studentID}`, {
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
           setNewFullName("");
           setNewEmail("");
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
      <div className="bg-gray-100">
        <div className="container px-4 py-6 mx-auto">
          {/* Header */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-300 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 text-center py-4 rounded-[35px]">
              <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">STUDENT MANAGEMENT</h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col items-start justify-center max-w-6xl gap-6 mx-auto lg:flex-row">
            {/* Left Section */}
            <div className="flex flex-col items-center w-full gap-6 sm:w-auto">
              <div className="bg-teal-500 w-full sm:w-[400px] h-[300px] rounded-[35px] 
                           flex items-center justify-center hover:bg-teal-600 transition-colors">
                <div className="flex flex-col text-center text-white">
                  <p className="text-4xl sm:text-[50px] font-semibold">UPDATE</p>
                  <p className="text-5xl sm:text-[75px] font-bold leading-none">STUDENT</p>
                </div>
              </div>
              
              <button 
                onClick={toStudentDashboard}
                className="bg-red-500 w-full sm:w-[400px] py-4 rounded-[30px] 
                         text-white font-bold text-3xl sm:text-[50px] 
                         hover:bg-red-600 transition-colors">
                BACK
              </button>
            </div>

            {/* Right Section - Form */}
            <div className="bg-gray-400 w-full sm:w-[400px] p-6 sm:p-8 rounded-[40px] 
                         flex flex-col gap-4">
              <div className="space-y-4">
                {/* Student ID Input */}
                <div className="form-group">
                  <label className="block mb-2 text-lg font-bold text-white">
                    Enter Student ID
                  </label>
                  <input
                    type="text"
                    value={studentID}
                    onChange={(e) => setStudentID(e.target.value)}
                    placeholder="Student ID"
                    className="w-full p-3 rounded-[30px] border-none 
                             focus:ring-2 focus:ring-teal-500 outline-none"
                  />
                </div>

                <button 
                  onClick={handleFindStudent}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-[30px] text-white font-bold text-lg
                           ${isLoading ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'}
                           transition-colors`}>
                  {isLoading ? 'Searching...' : 'SEARCH'}
                </button>

                {/* Current Info Display */}
                <div className="mt-4 space-y-4">
                  <div className="form-group">
                    <label className="block mb-2 text-lg font-bold text-white">
                      Current Full Name
                    </label>
                    <input
                      type="text"
                      value={FullName}
                      readOnly
                      placeholder="Full Name"
                      className="w-full p-3 rounded-[30px] bg-gray-100"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block mb-2 text-lg font-bold text-white">
                      Current Email
                    </label>
                    <input
                      type="email"
                      value={Email}
                      readOnly
                      placeholder="Email"
                      className="w-full p-3 rounded-[30px] bg-gray-100"
                    />
                  </div>
                </div>

                {/* New Info Inputs */}
                <div className="mt-4 space-y-4">
                  <div className="form-group">
                    <label className="block mb-2 text-lg font-bold text-white">
                      New Full Name
                    </label>
                    <input
                      type="text"
                      value={newFullName}
                      onChange={(e) => setNewFullName(e.target.value)}
                      placeholder="New Full Name"
                      className="w-full p-3 rounded-[30px] border-none 
                               focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>

                  <div className="form-group">
                    <label className="block mb-2 text-lg font-bold text-white">
                      New Email
                    </label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="New Email"
                      className="w-full p-3 rounded-[30px] border-none 
                               focus:ring-2 focus:ring-teal-500 outline-none"
                    />
                  </div>
                </div>

                <button 
                  onClick={handleUpdateStudent}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-[30px] text-white font-bold text-lg
                           ${isLoading ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'}
                           transition-colors mt-4`}>
                  {isLoading ? 'Updating...' : 'UPDATE STUDENT'}
                </button>

                {message && (
                  <div className={`mt-4 p-3 rounded-lg text-center font-medium
                               ${messageType === 'success' 
                                 ? 'bg-green-100 text-green-800' 
                                 : 'bg-red-100 text-red-800'}`}>
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Update;