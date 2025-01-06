import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

const ViewQuizPage = () => {
  const params = useParams();
  const quizId = params?.quizId; // Extract quizId from the route

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl text-gray-600">Quiz not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-8">
        {/* Quiz Title */}
        <h1 className="text-3xl font-semibold text-left text-gray-900 mb-6">{quiz.title}</h1>

        {/* Quiz Description */}
        <p className="text-lg text-gray-700 mb-8 text-left">{quiz.description}</p>

        {/* Questions and Answers */}
        <div className="space-y-6">
          {quiz.questions.map((q, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg">
              <h2 className="text-xl font-medium text-gray-800 mb-4">{`Q${index + 1}: ${q.questionText}`}</h2>

              {/* Multiple Choice Answers */}
              <div className="space-y-4">
                {q.choices.map((choice, idx) => (
                  <div key={idx} className="flex items-center space-x-4">
                    <input 
                      type="radio" 
                      id={`q${index}-choice${idx}`} 
                      name={`q${index}`} 
                      value={choice} 
                      disabled 
                      checked={choice === q.correctAnswer} 
                      className="h-5 w-5 text-indigo-500"
                    />
                    <label 
                      htmlFor={`q${index}-choice${idx}`} 
                      className={`text-lg ${
                        choice === q.correctAnswer ? 'text-green-600 font-medium' : 'text-gray-700'
                      }`}
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
    </div>
  );
};

export default ViewQuizPage;
