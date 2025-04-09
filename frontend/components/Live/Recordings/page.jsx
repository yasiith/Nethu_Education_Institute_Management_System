import React from 'react';

const RecordingsPage = () => {
  return (
    <div className="min-h-screen p-6 text-white bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Recordings</h1>
        
        <div className="bg-gray-800 rounded-lg p-8 shadow-lg">
          <div className="flex flex-col items-center justify-center text-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-24 w-24 text-gray-600 mb-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1} 
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" 
              />
            </svg>
            
            <h2 className="text-xl font-medium mb-2">No Recordings</h2>
            <p className="text-gray-400 mb-6">
              Your meeting recordings will appear here once they are available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingsPage;