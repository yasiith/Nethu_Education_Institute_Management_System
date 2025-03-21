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

  return (
    <div className="max-w-7xl mx-auto mt-12 p-8 relative">
      <h1 className="text-5xl font-bold text-center text-gray-900 mb-8">Select a Month</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pr-0 md:pr-80">
        {months.map((month, index) => (
          <div
            key={index}
            className="relative group bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl shadow-lg cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            onClick={() => navigateToQuizzes(month)}
          >
            <h2 className="text-2xl font-semibold text-white text-center group-hover:text-yellow-300 transition-all duration-200">{month}</h2>
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-25 rounded-xl transition-all duration-300"></div>
          </div>
        ))}
      </div>

      <div className="fixed top-0 right-0 z-20 w-80 bg-blue-800 text-white rounded-l-xl shadow-xl p-6 space-y-6 transform md:translate-x-0 md:w-1/4 transition-transform duration-300 h-full overflow-y-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Upcoming Meetings</h2>
        
        {loading && <p className="text-lg text-center text-yellow-300">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {meetings && meetings.length > 0 ? (
          <ul className="space-y-4">
            {meetings.map((meeting) => (
              <li
                key={meeting._id}
                className="p-4 bg-white text-black rounded-lg shadow-md cursor-pointer hover:bg-blue-200 transition-all duration-300"
                onClick={() => openZoomMeeting(meeting.joinUrl)}
              >
                <div className="flex justify-between">
                  <span className="font-semibold">{meeting.topic}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(meeting.startTime).toLocaleString()}
                  </span>
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
