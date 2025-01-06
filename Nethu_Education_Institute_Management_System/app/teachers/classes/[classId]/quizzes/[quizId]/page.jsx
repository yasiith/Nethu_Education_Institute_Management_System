'use client'; // Ensures client-side rendering

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

const ViewQuizPage = () => {
  const { classId, quizId } = useParams();
  const router = useRouter(); // Router for redirection after actions

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId || !classId) return;

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const response = await fetch(
            `http://localhost:5000/api/quizzes/class/${classId}/quizzes/${quizId}`,
            {
              method: 'GET',
              headers: {
                'x-auth-token': token,
              },
            }
          );

        if (!response.ok) {
          throw new Error('Failed to fetch quiz data');
        }

        const data = await response.json();
        setQuiz(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, classId]);

  const handleDeleteQuiz = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Authentication required');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this quiz?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/quizzes/class/${classId}/quizzes/${quizId}`,
        {
          method: 'DELETE',
          headers: {
            'x-auth-token': token,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete quiz');
      }

      router.push(`/classes/${classId}/quizzes`); // Redirect to quiz list page after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditQuiz = () => {
    // Redirect to an edit page where users can modify the quiz
    router.push(`/classes/${classId}/quizzes/edit/${quizId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-xl text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-xl text-gray-600">Quiz not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-6 bg-white">
      {/* Header and Action Buttons */}
      <div className="w-full bg-white p-6 rounded-b-xl shadow-lg">
        <h1 className="text-4xl font-semibold text-center text-gray-900 mb-6">{quiz.title}</h1>
        <p className="text-lg text-gray-700 mb-8 text-center italic">{quiz.description}</p>

        <div className="flex justify-center items-center space-x-6 mb-8">
          <button
            onClick={handleEditQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Edit Quiz
          </button>
          <button
            onClick={handleDeleteQuiz}
            className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300"
          >
            Delete Quiz
          </button>
        </div>
      </div>

      {/* Questions and Answers */}
      <div className="w-full flex-grow overflow-y-auto p-6">
        {quiz.questions.map((q, index) => (
          <div key={index} className="p-6 mb-4 border-2 border-indigo-600 rounded-lg shadow-md hover:bg-indigo-50 transition duration-300">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">{`Q${index + 1}: ${q.questionText}`}</h2>

            {/* Multiple Choice Answers */}
            <div className="space-y-4">
              {q.options.map((choice, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <input 
                    type="radio" 
                    id={`q${index}-choice${idx}`} 
                    name={`q${index}`} 
                    value={choice} 
                    disabled 
                    checked={choice === q.correctAnswer} 
                    className="h-5 w-5 text-indigo-500 focus:ring-indigo-500"
                  />
                  <label 
                    htmlFor={`q${index}-choice${idx}`} 
                    className={`text-lg transition duration-300 ${choice === q.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-700'}`}
                  >
                    {choice}
                  </label>
                </div>
              ))}
            </div>

            {/* Correct Answer Highlight */}
            <p className="mt-4 text-green-600 font-medium">Correct Answer: {q.correctAnswer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewQuizPage;
