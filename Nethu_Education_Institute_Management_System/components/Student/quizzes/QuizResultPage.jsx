"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const QuizResultPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const attemptId = searchParams.get("attemptId");
  const quizId = searchParams.get("quizId");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      if (!attemptId) {
        setError("Attempt ID is missing.");
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/quizzes/attempt/${attemptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch quiz results");
        }
        const data = await response.json();
        setResult(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [attemptId]);

  if (loading) return <p>Loading results...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!result) return <p>No results found.</p>;
  console.log('result', result);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{result.quizId.title} - Results</h1>
      <p className="text-gray-600 mb-4">Your Score: {result.score} / {result.answers.length}</p>

      <button
        onClick={() => router.push("/student")}
        className="px-6 py-2 bg-blue-500 text-white rounded"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default QuizResultPage;
