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
    <div className="max-w-4xl mx-auto mt-10 p-6">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {months.map((month, index) => (
          <div 
            key={index} 
            className="bg-white p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer"
            onClick={() => navigateToQuizzes(month)}
          >
            <h2 className="text-xl font-semibold text-center">{month}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassMonths;
