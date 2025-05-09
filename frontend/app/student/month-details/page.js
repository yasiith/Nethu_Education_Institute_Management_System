import Footer from "@components/footer";
import Dashboard from "@components/Student/month-details/Dashboard";
import Navbar from "@components/Student/StudentNavbar";
import React, { Suspense } from 'react';
import ClientOnly from '../../../components/ClientOnly';

// Loading component for Suspense
const Loading = () => <div className="p-4 text-center">Loading month details...</div>;

// Client component that uses useSearchParams
const MonthDetailsContent = () => {
  'use client';
  
  // Original component logic here
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Month Details</h1>
      <div className="bg-white shadow-md rounded p-4 mb-6">
        {/* Month details content would go here */}
        <h2 className="text-xl font-semibold mb-2">January 2023</h2>
        <p className="mb-2"><strong>Class:</strong> Mathematics</p>
        <p className="mb-2"><strong>Teacher:</strong> John Doe</p>
        <p className="mb-2"><strong>Attendance:</strong> 80%</p>
      </div>
    </div>
  );
};

// Server component that wraps the client component in Suspense
const MonthDetailsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientOnly>
        <MonthDetailsContent />
      </ClientOnly>
    </Suspense>
  );
};

export default MonthDetailsPage;
