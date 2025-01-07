'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, Shield, BookText, FileText, ListChecks } from 'lucide-react';
import Sidebar from '@components/Teacher/Sidebar';
import Calendar1 from '@components/Teacher/Calander';

const ClassDetailPage = () => {
  const { classId } = useParams(); // Fetch dynamic route param
  const router = useRouter();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (classId) {
      const fetchClassDetails = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/api/classes/${classId}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch class details');
          }
          const data = await response.json();
          setClassDetails(data);
        } catch (error) {
          console.error('Error fetching class details:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchClassDetails();
    }
  }, [classId]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  if (!classDetails)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Class details not found.
      </div>
    );

  // Navigation handlers
  const navigateToQuizzes = () => {
    router.push(`/teachers/classes/${classId}/quizzes`);
  };

  const navigateToMaterials = () => {
    router.push(`/teachers/classes/${classId}/materials`);
  };

  return (
    <div className="flex min-h-screen f bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
<div className="flex items-center justify-center flex-1 p-6 ">
  <div className="items-center w-full max-w-4xl overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg">
    {/* Header Section */}
    <div className="p-6 text-center text-white bg-gradient-to-r from-purple-500 to-indigo-400">
      <h1 className="text-4xl font-bold">{classDetails.grade}</h1>
      <p className="mt-2 text-xl">{classDetails.subject}</p>
    </div>

    {/* Class Details Section */}
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-4">
        <BookText size={24} className="text-gray-600" />
        <p className="text-lg text-gray-700">
          <strong>Description:</strong> {classDetails.description}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <User size={24} className="text-gray-600" />
        <p className="text-lg text-gray-700">
          <strong>Teacher:</strong> {classDetails.teacher}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Shield size={24} className="text-gray-600" />
        <p className="text-lg text-gray-700">
          <strong>Privacy:</strong> {classDetails.privacy}
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Calendar size={24} className="text-gray-600" />
        <p className="text-lg text-gray-700">
          <strong>Created At:</strong>{' '}
          {new Date(classDetails.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col gap-4 p-6 border-t border-gray-200 md:flex-row">
      <button
        onClick={navigateToQuizzes}
        className="flex items-center justify-center flex-1 gap-2 px-6 py-3 text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600"
      >
        <ListChecks size={20} />
        Manage Quizzes
      </button>
      <button
        onClick={navigateToMaterials}
        className="flex items-center justify-center flex-1 gap-2 px-6 py-3 text-white transition-all bg-green-500 rounded-md hover:bg-green-600"
      >
        <FileText size={20} />
        Manage Materials
      </button>
    </div>
  </div>
</div>

    </div>
  );
};

export default ClassDetailPage;
