'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios from 'axios';

const MeetingCreatePage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [classId, setClassID] = useState('');
  const [month, setMonth] = useState('');
  const [formData, setFormData] = useState({
    topic: '',
    startTime: '',
    duration: '',
    studentsAllowed: '',
    hostEmail: '',
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const classIdFromURL = pathSegments[pathSegments.indexOf('classes') + 1];
    const monthFromURL = pathSegments[pathSegments.indexOf('months-meetings') + 1];
    if (classIdFromURL) {
      setClassID(classIdFromURL);
    }
    if (monthFromURL) {
      setMonth(monthFromURL);
    }
  }, [pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://nethu-education-institute-management.onrender.com/api/zoom/meetings', { ...formData, classId, month }, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      setMessage(`Meeting created successfully!`);
      setFormData({
        topic: '',
        startTime: '',
        duration: '',
        studentsAllowed: '',
        hostEmail: '',
      });

      // Redirect to months meetings page after a short delay
      setTimeout(() => {
        router.push(`/teachers/classes/${classId}/months-meetings`);
      }, 1500);
      
    } catch (error) {
      setMessage('Error creating meeting. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50 p-6 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-teal-600 p-8">
          <h2 className="text-3xl font-bold text-white text-center">Create Zoom Meeting</h2>
          <p className="text-green-100 text-center mt-2">
            {month && `For ${month}`} {classId && `- Class ID: ${classId}`}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          {message && (
            <div className="mb-6 p-4 rounded-lg bg-green-100 border-l-4 border-green-500 text-green-700 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p>{message}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="block text-gray-700 text-sm font-medium">Meeting Topic</label>
              <input
                type="text"
                name="topic"
                placeholder="Enter meeting topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700 text-sm font-medium">Start Time</label>
              <input
                type="datetime-local"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700 text-sm font-medium">Duration (minutes)</label>
              <input
                type="number"
                name="duration"
                placeholder="Enter meeting duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block text-gray-700 text-sm font-medium">Host Email Address</label>
              <input
                type="email"
                name="hostEmail"
                placeholder="Enter Host Email Address"
                value={formData.hostEmail}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full p-4 bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-lg text-lg font-medium hover:from-green-700 hover:to-teal-700 focus:ring-4 focus:ring-green-300 transition-all duration-300 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Meeting...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create Meeting
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Back button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => router.push(`/teachers/classes/${classId}/months-meetings`)}
              className="text-teal-600 hover:text-teal-800 inline-flex items-center transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              Back to Meetings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingCreatePage;