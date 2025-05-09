import Footer from "@components/footer";
import Navbar from "@components/Student/StudentNavbar";
import React, { Suspense } from 'react';
import ClientOnly from '../../../../components/ClientOnly';

// Loading component for Suspense
const Loading = () => <div className="p-4 text-center">Loading quiz results...</div>;

// Client component that uses useSearchParams
const QuizResultContent = () => {
  'use client';
  
  // Original component logic here
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <div className="bg-white shadow-md rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Mathematics Quiz 1</h2>
        <p className="mb-2"><strong>Score:</strong> 85%</p>
        <p className="mb-2"><strong>Correct Answers:</strong> 17/20</p>
        <p className="mb-2"><strong>Time Taken:</strong> 25 minutes</p>
        
        <h3 className="text-lg font-semibold mt-4 mb-2">Question Summary</h3>
        <div className="space-y-4">
          {/* Example question summary */}
          <div className="p-3 bg-gray-50 rounded">
            <p className="font-medium">Question 1: What is 2+2?</p>
            <p className="text-green-600">Your answer: 4 (Correct)</p>
          </div>
          <div className="p-3 bg-gray-50 rounded">
            <p className="font-medium">Question 2: What is 5×6?</p>
            <p className="text-red-600">Your answer: 25 (Incorrect)</p>
            <p className="text-green-600">Correct answer: 30</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Server component that wraps the client component in Suspense
const QuizResultPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientOnly>
        <QuizResultContent />
      </ClientOnly>
    </Suspense>
  );
};

const page = () => {
  return (
    <div>
      <Navbar />
      <QuizResultPage />
      <Footer />
    </div>
  );
};

export default page;