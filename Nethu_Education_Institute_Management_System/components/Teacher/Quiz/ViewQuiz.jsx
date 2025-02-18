import React, { useEffect, useState } from 'react';
import { Loader2, AlertCircle, BookOpen } from 'lucide-react';

const ViewQuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  // Get quizId from URL params
  const quizId = window.location.pathname.split('/').pop();

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        setError('Quiz ID is missing');
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

        const response = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
          method: 'GET',
          headers: {
            'x-auth-token': token,
          },
        });

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
  }, [quizId]);

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
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <BookOpen className="w-12 h-12 text-gray-400" />
        <p className="mt-4 text-lg text-gray-600">Quiz not found</p>
      </div>
    );
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto">
        {/* Quiz Header */}
        <div className="p-6 mb-8 bg-white rounded-lg shadow-lg">
          <h1 className="mb-4 text-3xl font-bold text-gray-900">{quiz.title}</h1>
          <p className="text-lg text-gray-600">{quiz.description}</p>
          <div className="flex items-center mt-4 text-sm text-gray-500">
            <span className="mr-4">Questions: {quiz.questions.length}</span>
            <span>Current: {currentQuestion + 1}/{quiz.questions.length}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="p-8 bg-white rounded-lg shadow-lg">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 mb-4 text-sm font-medium text-blue-800 bg-blue-100 rounded-full">
              Question {currentQuestion + 1}
            </span>
            <h2 className="text-2xl font-semibold text-gray-800">
              {quiz.questions[currentQuestion].questionText}
            </h2>
          </div>

          {/* Choices */}
          <div className="space-y-4">
            {quiz.questions[currentQuestion].choices.map((choice, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border-2 transition-all ${
                  choice === quiz.questions[currentQuestion].correctAnswer
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                    choice === quiz.questions[currentQuestion].correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className={`text-lg ${
                    choice === quiz.questions[currentQuestion].correctAnswer
                      ? 'text-green-700 font-medium'
                      : 'text-gray-700'
                  }`}>
                    {choice}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === quiz.questions.length - 1}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                currentQuestion === quiz.questions.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewQuizPage;