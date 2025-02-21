import React from 'react';

// Dummy data to simulate the meetings (you would typically fetch this from an API)
const meetings = [
  {
    id: 1,
    title: 'Instant Meeting',
    date: '2/19/2025',
    time: '12:44:51 PM',
    participants: [
      { id: 1, avatar: '/avatar1.png' },
      { id: 2, avatar: '/avatar2.png' },
      { id: 3, avatar: '/avatar3.png' },
      { id: 4, avatar: '/avatar4.png' },
      { id: 5, avatar: '/avatar5.png' },
      { id: 6, avatar: '/avatar6.png' }
    ]
  },
  {
    id: 2,
    title: 'Instant Meeting',
    date: '2/15/2025',
    time: '10:00:00 AM',
    participants: [
      { id: 1, avatar: '/avatar1.png' },
      { id: 2, avatar: '/avatar2.png' },
      { id: 3, avatar: '/avatar3.png' },
      { id: 4, avatar: '/avatar4.png' },
      { id: 5, avatar: '/avatar5.png' },
      { id: 6, avatar: '/avatar6.png' }
    ]
  },
  {
    id: 3,
    title: 'Instant Meeting',
    date: '2/15/2025',
    time: '9:43:23 AM',
    participants: [
      { id: 1, avatar: '/avatar1.png' },
      { id: 2, avatar: '/avatar2.png' },
      { id: 3, avatar: '/avatar3.png' },
      { id: 4, avatar: '/avatar4.png' },
      { id: 5, avatar: '/avatar5.png' },
      { id: 6, avatar: '/avatar6.png' }
    ]
  }
];

const PreviousCalls = () => {
  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <h1 className="text-white text-2xl font-semibold mb-6">Previous Calls</h1>
      
      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div 
            key={meeting.id} 
            className="bg-gray-800 rounded-lg p-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center">
              <div className="mr-4">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h2 className="text-white font-medium">{meeting.title}</h2>
                <p className="text-gray-400 text-sm">{meeting.date}, {meeting.time}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-4">
                {meeting.participants.slice(0, 5).map((participant, index) => (
                  <img
                    key={participant.id}
                    className="w-8 h-8 rounded-full border-2 border-gray-800"
                    src={participant.avatar}
                    alt={`Participant ${index + 1}`}
                  />
                ))}
                {meeting.participants.length > 5 && (
                  <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-bold">
                    +{meeting.participants.length - 5}
                  </div>
                )}
              </div>
              
              <button className="text-blue-500 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousCalls;