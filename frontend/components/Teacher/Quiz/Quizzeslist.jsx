import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import CreatedQuizCard from './CreatedQuizCard';
import ErrorCard from './Error'; // Import the ErrorCard component

const QuizzesList = () => {
  const params = useParams();
  const classId = params?.classId;
  const month = params?.month;
  
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

        const response = await fetch(`https://nethu-education-institute-management.onrender.com/api/quizzes/class/${classId}/${month}`, {
          method: 'GET',
          headers: {
            'x-auth-token': token
          }
        });
        

        if (!response.ok) {
          throw new Error('No quizzes for this month yet!!!');
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
    return <ErrorCard message={error} />; // Use the ErrorCard component
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
