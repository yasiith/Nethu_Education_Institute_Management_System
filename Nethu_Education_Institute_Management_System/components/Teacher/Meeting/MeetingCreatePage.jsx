'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import axios from 'axios';

const MeetingCreatePage = () => {
  const pathname = usePathname();
  const [classId, setClassID] = useState('');
  const [month, setMonth] = useState('');
  const [formData, setFormData] = useState({
    topic: '',
    startTime: '',
    duration: '',
    studentsAllowed: '',
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
      
      const response = await axios.post('http://localhost:5000/api/zoom/meetings', { ...formData, classId, month }, {
        headers: {
          'x-auth-token': token,
          'Content-Type': 'application/json',
        },
      });

      setMessage(`Meeting created successfully! Join URL: ${response.data.data.joinUrl}`);
      setFormData({
        topic: '',
        startTime: '',
        duration: '',
        studentsAllowed: '',
      });
    } catch (error) {
      setMessage('Error creating meeting. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-center text-white mb-6">Create Zoom Meeting</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white text-lg font-semibold mb-2">Meeting Topic</label>
          <input
            type="text"
            name="topic"
            placeholder="Enter meeting topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        <div>
          <label className="block text-white text-lg font-semibold mb-2">Start Time</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        <div>
          <label className="block text-white text-lg font-semibold mb-2">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            placeholder="Enter meeting duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full p-3 rounded-lg border-2 border-transparent focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            required
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-700 text-white rounded-lg text-lg font-semibold hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
          >
            {loading ? 'Creating Meeting...' : 'Create Meeting'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MeetingCreatePage;
