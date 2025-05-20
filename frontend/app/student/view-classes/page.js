import Footer from "@components/footer";
import Navbar from "@components/Student/StudentNavbar";
import React, { Suspense } from 'react';
import ClientOnly from '../../../components/ClientOnly';

// Loading component for Suspense
const Loading = () => <div className="p-4 text-center">Loading classes...</div>;

// Client component that uses useSearchParams
const ViewClassesContent = () => {
  'use client';
  
  // Original component logic here
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Classes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Class cards would go here */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-2">Mathematics</h2>
          <p className="mb-2"><strong>Teacher:</strong> John Doe</p>
          <p className="mb-2"><strong>Schedule:</strong> Monday, 4:00 PM</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">View Details</button>
        </div>
        {/* More class cards */}
      </div>
    </div>
  );
};

// Server component that wraps the client component in Suspense
const ViewClassesPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ClientOnly>
        <ViewClassesContent />
      </ClientOnly>
    </Suspense>
  );
};

const page = () => {
  return (
    <div>
      <Navbar />
      <ViewClassesPage />
      <Footer />
    </div>
  );
};

export default page;
