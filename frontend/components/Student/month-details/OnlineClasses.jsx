import React, { useEffect, useState } from 'react';
import { useSearchParams } from "next/navigation";

const OnlineClasses = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const classId = searchParams.get("classid");
  const month = searchParams.get("month");

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/meetings?classId=${classId}&month=${month}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch meetings');
        }
        const data = await response.json();
        setMeetings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (classId && month) {
      fetchMeetings();
    }
  }, [classId, month]);

  if (loading) return <p>Loading online classes...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {meetings.length > 0 ? (
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.meetingId}>
              <strong>{meeting.topic}</strong> - {new Date(meeting.startTime).toLocaleString()}<br />
              <a 
                href={meeting.joinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 15px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Join Meeting
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No online classes scheduled for this month.</p>
      )}
    </div>
  );
};

export default OnlineClasses;
