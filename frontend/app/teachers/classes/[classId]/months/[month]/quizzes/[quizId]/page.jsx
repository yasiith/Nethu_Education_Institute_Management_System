'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, BookOpen, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

const ViewQuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const params = useParams();
  const router = useRouter();
  const { classId, quizId, month } = params;

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId || !classId || !month) {
        setError('Quiz ID or Class ID or month is missing in the URL');
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication required');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://nethu-education-institute-management.onrender.com/api/quizzes/class/${classId}/quizzes/${quizId}`,
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
  }, [quizId, classId, month]);

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
        `https://nethu-education-institute-management.onrender.com/api/quizzes/class/${classId}/quizzes/${quizId}`,
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

      router.push(`/teachers/classes/${classId}/quizzes`);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditQuiz = () => {
    router.push(`/teachers/classes/${classId}/quizzes/edit/${quizId}`);
  };

  const handleBackToQuizzes = () => {
    router.push(`/teachers/classes/${classId}/months`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <AlertCircle className="w-12 h-12 text-red-600" />
        <p className="mt-4 text-lg text-red-600">{error}</p>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <BookOpen className="w-12 h-12 text-gray-400" />
        <p className="mt-4 text-lg text-gray-600">Quiz not found</p>
        <button 
          onClick={() => router.back()}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Top Navigation Bar */}
      <nav className='relative w-full bg-blue-950 shadow-lg'>
        <div className='w-full flex justify-between items-center h-16 px-4 md:px-6 lg:px-8'>
          {/* Logo */}
          <div className='flex-shrink-0 ml-0'>
            <span className='text-2xl font-bold text-white'>
              <button onClick={handleBackToQuizzes} className='hover:text-blue-300 transition-colors duration-200 flex items-center'>
                <ArrowLeft className="w-5 h-5 mr-2" />
                NEIMS
              </button>
            </span>
          </div>
          
          {/* Action Buttons */}
          <div className='flex space-x-3'>
            <button
              onClick={handleEditQuiz}
              className='bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-lg font-medium text-base shadow-md hover:from-emerald-600 hover:to-teal-600 transition-all duration-200 flex items-center'
            >
              <Edit2 className="w-4 h-4 mr-2" />
              Edit Quiz
            </button>
            <button
              onClick={handleDeleteQuiz}
              className='bg-gradient-to-r from-red-500 to-rose-500 text-white px-4 py-2 rounded-lg font-medium text-base shadow-md hover:from-red-600 hover:to-rose-600 transition-all duration-200 flex items-center'
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Quiz
            </button>
          </div>
        </div>
      </nav>

      {/* Quiz Content */}
      <div className="max-w-4xl px-4 py-8 mx-auto">
        {/* Quiz Header */}
        <div className="p-6 mb-8 bg-white shadow-lg rounded-xl">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="text-lg italic text-gray-600">{quiz.description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Total Questions: {quiz.questions.length}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-6">
          {quiz.questions.map((question, index) => (
            <div key={index} className="p-6 transition-all bg-white shadow-lg rounded-xl hover:shadow-xl">
              <div className="flex items-start">
                <span className="flex items-center justify-center flex-shrink-0 w-8 h-8 font-semibold text-blue-800 bg-blue-100 rounded-full">
                  {index + 1}
                </span>
                <div className="flex-grow ml-4">
                  <h2 className="mb-4 text-xl font-semibold text-gray-800">
                    {question.questionText}
                  </h2>
                  <div className="space-y-3">
                    {question.options.map((option, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          option === question.correctAnswer
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                            option === question.correctAnswer
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200'
                          }`}>
                            {String.fromCharCode(65 + idx)}
                          </div>
                          <span className={`${
                            option === question.correctAnswer
                              ? 'text-green-700 font-medium'
                              : 'text-gray-700'
                          }`}>
                            {option}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 mt-4 border-t border-gray-100">
                    <p className="font-medium text-green-600">
                      Correct Answer: {question.correctAnswer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewQuizPage;