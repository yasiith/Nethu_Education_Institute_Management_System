import Footer from "@components/footer";
import QuizeAttemptPage from "@components/Student/quizzes/QuizeAttemptPage";
import Navbar from "@components/Student/StudentNavbar";
import React, { Suspense } from 'react';
import ClientOnly from '../../../components/ClientOnly';

// Loading component for Suspense
const Loading = () => <div className="p-4 text-center">Loading quizzes...</div>;

// Client component that uses useSearchParams
const QuizzesContent = () => {
  'use client';
  
  // Original component logic here
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Quiz items would go here */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Mathematics Quiz 1</h2>
          <p className="mb-2">Topic: Algebra</p>
          <p className="mb-4">Duration: 30 minutes</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Start Quiz</button>
        </div>
        {/* More quiz items */}
      </div>
    </div>
  );
};

// Server component that wraps the client component in Suspense
const QuizzesPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientOnly>
        <QuizzesContent />
      </ClientOnly>
    </Suspense>
  );
};

export default QuizzesPage;