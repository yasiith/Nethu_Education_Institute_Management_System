'use client';

import { useParams } from 'next/navigation';


const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Quize = () => {

    const { classId, month } = useParams(); // Fetch dynamic route param

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">{month} Quize</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      </div>
    </div>
  );
};

export default Quize;