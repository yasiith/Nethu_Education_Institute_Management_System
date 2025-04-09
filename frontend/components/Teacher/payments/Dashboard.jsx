'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

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
      const response = await axios.get(`http://localhost:5000/api/monthly-fees/${classId}`);
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
      const response = await axios.put(`http://localhost:5000/api/monthly-fees/${classId}`, {
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl p-8">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
              Monthly Fees for Class: {classId}
            </h2>
            <div className="space-y-4">
              {Object.entries(monthlyFees).map(([month, amount]) => (
                <div
                  key={month}
                  className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <p className="text-lg font-medium text-gray-700">
                    {month}: <span className="font-semibold text-blue-600">Rs.{amount}</span>
                  </p>
                  <button
                    onClick={() => openUpdateModal(month, amount)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
                  >
                    Change
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal for updating fee */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-xl shadow-lg w-11/12 max-w-md transform transition-all duration-300 scale-95 hover:scale-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Update Fee for <span className="text-blue-600">{selectedMonth}</span>
            </h2>
            <input
              type="number"
              value={newAmount}
              onChange={(e) => setNewAmount(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new amount"
            />
            {error && <p className="text-red-500 mt-2">{error}</p>}
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePaymentsPage;