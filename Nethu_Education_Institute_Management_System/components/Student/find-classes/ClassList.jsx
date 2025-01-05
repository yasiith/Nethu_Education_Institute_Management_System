import React from 'react';

const ClassList = ({ classes, onClassClick }) => {
  return (
    <div className="mt-8">
      {classes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {classes.map((cls, index) => (
            <button
              key={index}
              onClick={() => onClassClick(cls)}
              className="p-4 border rounded-md shadow-md text-left bg-blue-200 hover:bg-blue-300 transition-colors"
            >
              <h2 className="text-xl font-bold text-black">{cls.subject}</h2>
              <p className="text-black">Grade: {cls.grade}</p>
              <p className="text-black">Teacher: {cls.teacher || 'Unknown Teacher'}</p>
            </button>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No classes found.</p>
      )}
    </div>
  );
};

export default ClassList;
