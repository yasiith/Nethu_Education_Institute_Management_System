'use client';
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { HiPlusCircle } from 'react-icons/hi';

const CreateNewQuizCard = () => {
  const router = useRouter();
  const params = useParams(); // Fetch route parameters

  const toQuizCreatePage = () => {
    if (params?.classId) {
      router.push(`/teachers/classes/${params.classId}/months/${params.month}/quizzes/quiz-create`);
    } else {
      console.error('Error: classId is undefined');
      alert('Unable to navigate: Class ID is missing.');
    }
  };
  console.log(params);
  return (
    <div className="flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-500 hover:scale-105">
        {/* Card Header */}
        <div className="text-center text-white mb-6">
          <h2 className="text-3xl font-bold tracking-tight">Create a New Quiz</h2>
          <p className="text-lg mt-2 opacity-80">Easily create quizzes to assess your students' learning progress.</p>
        </div>
        
        {/* Action Button */}
        <button
          onClick={toQuizCreatePage}
          className="flex items-center justify-center w-full space-x-3 p-4 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition-transform duration-300 hover:scale-105"
        >
          <HiPlusCircle size={28} />
          <span>Create New Quiz</span>
        </button>
        
        {/* Error Message (Fallback Display) */}
        {!params?.classId && (
          <p className="text-red-500 text-center mt-4">
            ⚠️ Error: Class ID is missing. Cannot proceed to quiz creation.
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateNewQuizCard;
