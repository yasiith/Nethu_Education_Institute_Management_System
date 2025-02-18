'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { HiTrash } from 'react-icons/hi'; // Importing a trash icon from react-icons

const DeleteQuizCard = ({classId, quizzes}) => {
  const [quizTitle, setQuizTitle] = useState('');
  const [error, setError] = useState('');
  const [isInputVisible, setIsInputVisible] = useState(false); // New state for toggling the input visibility
  const router = useRouter();

  // Handle quiz title input change
  const handleInputChange = (e) => {
    setQuizTitle(e.target.value);
    setError('');
  };

  // Handle delete quiz action
  const handleDeleteQuiz = () => {
    if (isInputVisible) {
      // Check if quiz title exists in the list of quizzes
      const quizToDelete = quizzes.find(quiz => quiz.title === quizTitle);
      
      if (quizToDelete) {
        // Redirect to the delete confirmation page for the specific quiz
        router.push(`/teachers/classes/${classId}/quizzes/${quizToDelete.id}/delete`);
      } else {
        // Show an error if the title does not match
        setError('Quiz not found. Please check the title and try again.');
      }
    } else {
      // Toggle input visibility
      setIsInputVisible(true);
    }
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="max-w-lg w-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
        {/* Card Content */}
        <div className="flex flex-col items-center space-y-6">
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold tracking-tight">Delete Quiz</h2>
            <p className="text-lg mt-2 opacity-80">Delete finished quizzes:</p>
          </div>
          
          {/* Conditionally render input field */}
          {isInputVisible && (
            <div className="w-full">
              <input
                type="text"
                value={quizTitle}
                onChange={handleInputChange}
                placeholder="Enter quiz title"
                className="w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          )}

          {/* Button to toggle input visibility or trigger quiz deletion */}
          <button
            onClick={handleDeleteQuiz}
            className="flex items-center space-x-4 w-full justify-center p-4 bg-white text-red-600 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            <HiTrash size={24} />
            <span className="text-lg font-semibold">{isInputVisible ? 'Delete Quiz' : 'Delete Quiz'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteQuizCard;
