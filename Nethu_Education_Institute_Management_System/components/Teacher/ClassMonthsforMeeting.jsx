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

const ClassMonths = () => {
  const { classId } = useParams();
  const router = useRouter();
  const pathname = usePathname();

  const [classID, setClassID] = useState('');
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const teacherID = localStorage.getItem('TeacherID');

  const navigateToQuizzes = (month) => {
    router.push(`/teachers/classes/${classId}/months-meetings/${month}/meetings`);
  };

  const openZoomMeeting = (joinUrl) => {
    window.open(joinUrl, '_blank');
  };

  useEffect(() => {
    const pathSegments = pathname.split('/');
    const classIDFromURL = pathSegments[pathSegments.indexOf('classes') + 1];
    if (classIDFromURL) {
      setClassID(classIDFromURL);
    }
  }, [pathname]);

  useEffect(() => {
    if (!classID) return;

    const fetchMeetings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/meetings/teacher?teacherId=${teacherID}&classId=${classID}`
        );
        setMeetings(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [teacherID, classID]);

  const deleteMeeting = async (meetingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this meeting?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/meeting/${meetingId}`);
      setMeetings(meetings.filter(meeting => meeting._id !== meetingId));
    } catch (error) {
      console.error('Error deleting meeting:', error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 p-8 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 pr-0 md:pr-80 pl-64">
        {months.map((month, index) => (
          <div
            key={index}
            className="relative group bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl p-4"
            onClick={() => navigateToQuizzes(month)}
          >
            <h2 className="text-2xl font-semibold text-white text-center group-hover:text-yellow-300 transition-all duration-200">{month}</h2>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 rounded-xl transition-all duration-300"></div>
          </div>
        ))}
      </div>

      <div className="fixed top-0 right-0 z-20 w-80 bg-blue-800 text-white rounded-l-xl shadow-xl p-6 space-y-6 transform md:translate-x-0 md:w-1/4 transition-transform duration-300 h-full overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Meetings</h2>
        
        {loading && <p className="text-lg text-center text-yellow-300">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {meetings && meetings.length > 0 ? (
          <ul className="space-y-4">
            {meetings.map((meeting) => (
              <li
                key={meeting._id}
                className="p-4 bg-white text-black rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition-all duration-300"
              >
                <div className="flex justify-between items-center">
                  <div onClick={() => openZoomMeeting(meeting.joinUrl)} className="cursor-pointer">
                    <span className="font-semibold">{meeting.topic}</span>
                    <span className="block text-sm text-gray-500">
                      {new Date(meeting.startTime).toLocaleString()}
                    </span>
                  </div>
                  <button
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-800"
                    onClick={() => deleteMeeting(meeting._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-300">No upcoming meetings</p>
        )}
      </div>
    </div>
  );
};

export default ClassMonths;
