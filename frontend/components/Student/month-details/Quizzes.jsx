import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Quizzes = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const classId = searchParams.get("classid");
  const month = searchParams.get("month");

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState(localStorage.getItem("StudentID"));

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!classId || !month) return;

      try {
        const response = await fetch(
          `http://localhost:5000/api/quizzes/class/${classId}/${month}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch quizzes");
        }
        const data = await response.json();
        setQuizzes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [classId, month]);

  const handleQuizAttempt = async (quizId) => {
    if (!studentId) {
      alert("Student ID is missing");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/quizzes/check-attempt?studentId=${studentId}&quizId=${quizId}`
      );
      const data = await response.json();

      if (data.message === "Quiz already attempted") {
        alert("You have already attempted this quiz.");
      } else {
        router.push(`/student/quizzes?classId=${classId}&quizId=${quizId}`);
      }
    } catch (err) {
      alert("Error checking quiz attempt: " + err.message);
    }
  };

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (quizzes.length === 0) return <p>No quizzes available for this month.</p>;

  return (
    <div>
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="mb-4 p-4 border border-gray-300 rounded">
          <h2 className="text-xl font-bold">{quiz.title}</h2>
          <p className="text-gray-700">{quiz.description}</p>
          <button
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleQuizAttempt(quiz._id)}
          >
            Attempt Now
          </button>
        </div>
      ))}
    </div>
  );
};

export default Quizzes;
