import React from 'react';
import { useRouter } from 'next/navigation';
import { HiOutlineEye } from 'react-icons/hi'; // Importing an icon

const QuizCard = ({ quiz = {}, index, classId }) => {
  const router = useRouter();

  const toViewQuiz = () => {
    router.push(`/teachers/classes/${classId}/quizzes/${quiz.id}`);
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center text-white">
            <h2 className="text-2xl font-bold tracking-tight">{quiz.title || 'Untitled Quiz'}</h2>
            <p className="text-lg mt-2 opacity-80">{quiz.description || 'No description available.'}</p>
          </div>
          <button
            onClick={toViewQuiz}
            className="flex items-center space-x-4 w-full justify-center p-4 bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <HiOutlineEye size={24} />
            <span className="text-lg font-semibold">View Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizCard;
