'use client';

import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const ClassMonths = () => {
  const { classId } = useParams(); // Fetch dynamic route param
  const router = useRouter();

  const navigateToQuizzes = (month) => {
    router.push(`/teachers/classes/${classId}/months/${month}/quizzes`);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-10">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {months.map((month, index) => (
          <div 
            key={index} 
            className="bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => navigateToQuizzes(month)}
          >
            <h2 className="text-2xl font-bold text-center">{month}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassMonths;
