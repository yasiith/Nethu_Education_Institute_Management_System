'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, Shield, BookText, FileText, ListChecks } from 'lucide-react';

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
    return <div className="flex items-center justify-center h-screen text-gray-600">Loading...</div>;
  if (!classDetails) 
    return <div className="flex items-center justify-center h-screen text-red-500">Class details not found.</div>;

  // Navigation handlers
  const navigateToQuizzes = () => {
    router.push(`/teachers/classes/${classId}/quizzes`);
  };

  const navigateToMaterials = () => {
    router.push(`/teachers/classes/${classId}/materials`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10 px-4">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-purple-500 to-indigo-400 p-6 text-white text-center">
          <h1 className="text-4xl font-bold">{classDetails.grade}</h1>
          <p className="text-xl mt-2">{classDetails.subject}</p>
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
        <div className="p-6 border-t border-gray-200 flex flex-col md:flex-row gap-4">
          <button
            onClick={navigateToQuizzes}
            className="flex-1 bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 flex items-center justify-center gap-2 transition-all"
          >
            <ListChecks size={20} />
            Manage Quizzes
          </button>
          <button
            onClick={navigateToMaterials}
            className="flex-1 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 flex items-center justify-center gap-2 transition-all"
          >
            <FileText size={20} />
            Manage Materials
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;
