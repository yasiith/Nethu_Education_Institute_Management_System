'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const ClassDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize router for redirection
  const classId = searchParams.get('classid');
  const subject = searchParams.get('subject');
  const grade = searchParams.get('grade');
  const teacher = searchParams.get('teacher');

  const [enrollMessage, setEnrollMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to enroll in a class.');
    }
  }, []);

  const handleEnroll = async () => {
    const confirmEnroll = window.confirm(`Do you want to enroll in the class "${subject}" taught by ${teacher || 'N/A'}?`);
    if (!confirmEnroll) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('You must be logged in to enroll in a class.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/student/enroll/${classId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token
        }
      });

      const data = await response.json();

      if (response.ok) {
        setEnrollMessage(data.message);
        setError('');
        setTimeout(() => router.push('/student'), 2000); // Redirect to /student after 2 seconds
      } else {
        setError(data.message || 'Error enrolling in class.');
        setEnrollMessage('');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Class Details</h1>
      <div className="bg-blue-200 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Subject: {subject}</h2>
        <p className="text-lg">Grade: {grade}</p>
        <p className="text-lg">Teacher: {teacher || 'N/A'}</p>
        <p className="text-lg">Class ID: {classId}</p>
      </div>
      <button
        onClick={handleEnroll}
        className="mt-5 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
      >
        Enroll
      </button>
      {enrollMessage && <p className="mt-4 text-green-600">{enrollMessage}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default ClassDetails;
