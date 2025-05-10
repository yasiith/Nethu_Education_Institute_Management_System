import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sidebar = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const teacherID = localStorage.getItem("TeacherID");
  const classID = localStorage.getItem("ClassID"); // Assuming classID is stored in localStorage

  useEffect(() => {
    if (!teacherID || !classID) {
      setError('Teacher ID and Class ID are required.');
      setLoading(false);
      return;
    }

    // Fetch meetings by teacherId and classId
    const fetchMeetings = async () => {
      try {
        const response = await axios.get(`https://nethu-education-institute-management.onrender.com/api/meetings?teacherId=${teacherID}&classId=${classID}`);
        setMeetings(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch meetings');
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [teacherID, classID]);

  return (
    <div className="fixed top-0 right-0 z-20 h-screen text-white flex flex-col items-center p-4 transition-transform duration-300 md:translate-x-0 md:w-1/5 bg-blue-300">
      <h2 className="text-xl mb-4">Meetings</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {meetings && meetings.length > 0 ? (
        <ul className="space-y-4">
          {meetings.map((meeting) => (
            <li key={meeting._id} className="p-2 bg-white text-black rounded">
              <div className="flex justify-between">
                <span>{meeting.title}</span>
                <span>{new Date(meeting.startTime).toLocaleString()}</span>
              </div>
              <div>{meeting.description}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No upcoming meetings</p>
      )}
    </div>
  );
};

export default Sidebar;
