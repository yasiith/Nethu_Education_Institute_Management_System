// QuizzesList.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CreatedQuizCard from './CreatedQuizCard';

const QuizzesList = () => {
  const params = useParams();
  const classId = params?.classId;
  
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!classId) {
        setError('Class ID is missing');
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

        const response = await fetch(`http://localhost:5000/api/quizzes/class/${classId}`, {
          method: 'GET',
          headers: {
            'x-auth-token': token
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch quizzes');
        }

        const data = await response.json();
        setQuizzes(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [classId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="text-xl text-gray-600">Loading quizzes...</div>
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {quizzes.map((quiz, index) => (
        <CreatedQuizCard
          key={quiz._id}
          quiz={quiz}
          classId={classId}
        />
      ))}
    </div>
  );
};

export default QuizzesList;