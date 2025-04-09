"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const QuizeAttemptPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const quizId = searchParams.get("quizId");
  const classId = searchParams.get("classId");

  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizId) {
        setError("Quiz ID is missing.");
        return;
      }
      if (!classId) {
        setError("Class ID is missing.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/quizzes/quize/${quizId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }
        const data = await response.json();
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionId, selectedOption) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    const studentId = localStorage.getItem("StudentID");
    if (!studentId) {
      alert("Student ID is missing.");
      return;
    }

    const formattedAnswers = Object.entries(answers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    try {
      const response = await fetch("http://localhost:5000/api/quizzes/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizId, studentId, answers: formattedAnswers, classId }),
      });

      const data = await response.json();
      console.log('data', data);
      if (response.ok) {
        router.push(`/student/quizzes/quiz-result?attemptId=${data.attemptId}&QuizId=${quizId}`);
      } else {
        alert(data.error || "Failed to submit quiz.");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      alert("An error occurred while submitting the quiz.");
    }
  };

  if (loading) return <p>Loading quiz...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!quiz) return <p>No quiz found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      <p className="text-gray-600 mb-6">{quiz.description}</p>

      {quiz.questions.map((question) => (
        <div key={question._id} className="mb-4 p-4 border rounded">
          <p className="font-semibold">{question.questionText}</p>
          {question.options.map((option, index) => (
            <label key={index} className="block mt-2">
              <input
                type="radio"
                name={question._id}
                value={option}
                onChange={() => handleOptionChange(question._id, option)}
                checked={answers[question._id] === option}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizeAttemptPage;
