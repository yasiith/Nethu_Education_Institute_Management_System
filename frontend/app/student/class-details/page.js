import React, { Suspense } from 'react';
import Navbar from "@components/Student/StudentNavbar";
import Footer from "@components/footer";
import ClientOnly from '../../../components/ClientOnly';

// Loading component for Suspense
const Loading = () => <div className="p-4 text-center">Loading class details...</div>;

// Client component that uses useSearchParams
const ClassDetailsClient = () => {
  'use client';
  // Your existing implementation with useSearchParams
  // ...existing code...
  
  return (
    <div>
      {/* Your existing component JSX */}
    </div>
  );
};

// Server component that wraps the client component in Suspense
const ClassDetailsPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientOnly>
        <Navbar />
        <ClassDetailsClient /> {/* Reusable ClassDetails component */}
        <Footer />
      </ClientOnly>
    </Suspense>
  );
};

export default ClassDetailsPage;
