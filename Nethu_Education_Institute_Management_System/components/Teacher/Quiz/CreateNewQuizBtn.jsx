'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { HiPlusCircle } from 'react-icons/hi'; // Importing an icon from react-icons

const CreateNewQuizCard = () => {

    const router = useRouter();
    const toQuizCreatePage = () => {
        router.push('/teachers/quiz/quiz-create');
    };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
        {/* Card Content */}
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight">Create a New Quiz</h2>
            <p className="text-lg mt-2 opacity-80">Easily create quizzes to assess your students' learning progress.</p>
          </div>
          
          {/* Button as part of the card */}
          <button
            onClick={toQuizCreatePage}
            className="flex items-center space-x-4 w-full justify-center p-4 bg-white text-blue-600 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <HiPlusCircle size={24} />
            <span className="text-lg font-semibold">Create New Quiz</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateNewQuizCard
