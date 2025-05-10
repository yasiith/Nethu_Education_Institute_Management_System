'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import axios from 'axios';

// Sidebar Component
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

// Main Component
const ManagePaymentsPage = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [classId, setClassID] = useState('');
  const [monthlyFees, setMonthlyFees] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [localFees, setLocalFees] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState('');
  const [newAmount, setNewAmount] = useState('');

  useEffect(() => {
    // Extract classId from the URL
    const pathSegments = pathname.split('/');
    const classIdFromURL = pathSegments[pathSegments.indexOf('classes') + 1];
    if (classIdFromURL) {
      setClassID(classIdFromURL);
    }
  }, [pathname]);

  useEffect(() => {
    if (classId) {
      fetchMonthlyFees();
    }
  }, [classId]);

  // Fetch monthly fees from the backend API
  const fetchMonthlyFees = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://143.110.187.69:5000/api/monthly-fees/${classId}`);
      setMonthlyFees(response.data.monthlyFees);
      setLocalFees(response.data.monthlyFees); // Initializing local state for editing
    } catch (err) {
      setError('Failed to fetch monthly fees');
    } finally {
      setLoading(false);
    }
  };

  // Open the modal to update a fee
  const openUpdateModal = (month, amount) => {
    setSelectedMonth(month);
    setNewAmount(amount);
    setShowModal(true);
  };

  // Handle closing the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedMonth('');
    setNewAmount('');
  };

  // Handle submitting the new amount
  const handleSubmit = async () => {
    if (!newAmount) {
      setError('Amount is required');
      return;
    }

    try {
      const response = await axios.put(`http://143.110.187.69:5000/api/monthly-fees/${classId}`, {
        month: selectedMonth,
        amount: newAmount,
      });
      setMonthlyFees(response.data.monthlyFees);
      setLocalFees(response.data.monthlyFees);
      closeModal(); // Close the modal after updating
    } catch (err) {
      setError('Failed to update monthly fees');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 min-h-screen bg-gradient-to-r from-green-50 to-teal-50 p-6 md:p-8 md:ml-[20%]">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-500 to-teal-600 p-6">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">
              Monthly Fees
            </h2>
            <p className="text-green-100 text-center font-medium">
              Class ID: {classId}
            </p>
          </div>

          {/* Content Section */}
          <div className="p-6 md:p-8">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <p className="text-red-700">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {Object.entries(monthlyFees).map(([month, amount]) => (
                  <div
                    key={month}
                    className="flex justify-between items-center p-5 bg-white rounded-xl border border-green-100 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <div>
                      <h3 className="text-lg font-medium text-gray-700">
                        {month}
                      </h3>
                      <p className="text-2xl font-bold text-teal-600">
                        Rs.{amount}
                      </p>
                    </div>
                    <button
                      onClick={() => openUpdateModal(month, amount)}
                      className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      Update
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal for updating fee */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-md transform transition-all duration-300 scale-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Update Fee for <span className="text-teal-600">{selectedMonth}</span>
              </h2>
              <div className="mb-6">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                  New Amount (Rs.)
                </label>
                <input
                  id="amount"
                  type="number"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter new amount"
                />
                {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePaymentsPage;