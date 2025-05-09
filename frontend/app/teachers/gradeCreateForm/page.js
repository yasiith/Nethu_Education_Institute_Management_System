import React from 'react';
import ClientOnly from '../../../components/ClientOnly';
import TeacherNav from "@components/Teacher/TeacherNav";
import GradeCreateForm from "@components/Teacher/gradeCreateForm";
import Footer from "@components/footer";

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
      <p className="text-lg font-semibold">Loading form...</p>
    </div>
  </div>
);

// Client component with localStorage access
const GradeCreateFormContent = () => {
  'use client';
  
  // Original component code that uses localStorage
  // ...

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Grade</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Form fields would go here */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="studentName">
            Student Name
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="studentName" 
            type="text" 
            placeholder="Student Name"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
            Subject
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="subject" 
            type="text" 
            placeholder="Subject"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="grade">
            Grade
          </label>
          <input 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="grade" 
            type="text" 
            placeholder="Grade"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="button"
          >
            Submit Grade
          </button>
        </div>
      </form>
    </div>
  );
};

// Server component that safely renders the client component
const GradeCreateFormPage = () => {
  return (
    <ClientOnly fallback={<LoadingFallback />}>
      <GradeCreateFormContent />
    </ClientOnly>
  );
};

export default GradeCreateFormPage;
