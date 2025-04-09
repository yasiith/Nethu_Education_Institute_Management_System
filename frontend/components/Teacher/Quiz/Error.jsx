import React from 'react';

const ErrorCard = ({ message }) => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div className="max-w-md w-full bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow-md">
        <h3 className="text-lg font-semibold">Error</h3>
        <p className="mt-2">{message || 'An unexpected error occurred.'}</p>
      </div>
    </div>
  );
};

export default ErrorCard;
