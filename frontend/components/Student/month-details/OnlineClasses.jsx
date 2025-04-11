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

  // Format date into readable format
  const formatDate = (dateString) => {
    const options = { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate time remaining until meeting
  const getTimeStatus = (startTime) => {
    const now = new Date();
    const meetingTime = new Date(startTime);
    const diffTime = meetingTime - now;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
    
    if (diffTime < 0) {
      // Meeting has passed
      return { status: "ended", text: "Meeting has ended" };
    } else if (diffTime < 30 * 60 * 1000) {
      // Less than 30 minutes
      return { status: "soon", text: "Starting soon" };
    } else if (diffDays > 0) {
      // Days remaining
      return { status: "upcoming", text: `In ${diffDays} day${diffDays > 1 ? 's' : ''}` };
    } else {
      // Hours remaining
      return { status: "upcoming", text: `In ${diffHours}h ${diffMinutes}m` };
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {meetings.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {meetings.map((meeting) => {
            const timeStatus = getTimeStatus(meeting.startTime);
            
            return (
              <div key={meeting.meetingId} className="bg-white border border-emerald-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="border-l-4 border-emerald-500">
                  <div className="p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-emerald-800">{meeting.topic}</h3>
                        <div className="flex items-center mt-2 text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{formatDate(meeting.startTime)}</span>
                        </div>
                        
                        {meeting.agenda && (
                          <p className="mt-2 text-gray-600">{meeting.agenda}</p>
                        )}
                      </div>
                      
                      <div className="mt-4 md:mt-0 flex flex-col items-start md:items-end">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium 
                          ${timeStatus.status === 'soon' 
                            ? 'bg-green-100 text-green-800' 
                            : timeStatus.status === 'upcoming' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : 'bg-gray-100 text-gray-800'
                          } mb-3`}>
                          {timeStatus.text}
                        </div>
                        
                        <a 
                          href={meeting.joinUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white transition-colors duration-200
                            ${timeStatus.status === 'ended'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : timeStatus.status === 'soon'
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                                : 'bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
                            }`}
                          disabled={timeStatus.status === 'ended'}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          {timeStatus.status === 'soon' ? 'Join Now' : 
                           timeStatus.status === 'ended' ? 'Meeting Ended' : 'Join Meeting'}
                        </a>
                      </div>
                    </div>
                    
                    {meeting.duration && (
                      <div className="mt-4 bg-emerald-50 rounded-md p-3">
                        <div className="flex items-center text-emerald-700 text-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>Duration: {meeting.duration} minutes</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <h3 className="text-lg font-medium text-emerald-800 mb-2">No Online Classes Scheduled</h3>
          <p className="text-emerald-600">There are no online classes scheduled for this month.</p>
        </div>
      )}
    </div>
  );
};

export default OnlineClasses;