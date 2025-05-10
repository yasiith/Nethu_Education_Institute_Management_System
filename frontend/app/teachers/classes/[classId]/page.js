'use client';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, User, Shield, BookText, FileText, ListChecks, Clock, Award, Layers, Globe, Lock } from 'lucide-react';
import Sidebar from '@components/Teacher/Sidebar';
import Calendar1 from '@components/Teacher/Calander';

const ClassDetailPage = () => {
  const { classId } = useParams();
  const router = useRouter();
  const [classDetails, setClassDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [updatingVisibility, setUpdatingVisibility] = useState(false);

  useEffect(() => {
    if (classId) {
      const fetchClassDetails = async () => {
        try {
          const response = await fetch(
            `http://143.110.187.69:5000/api/classes/${classId}`
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

  const toggleClassVisibility = async () => {
    if (!classDetails || updatingVisibility) return;
    
    setUpdatingVisibility(true);
    const currentVisibility = classDetails.visibility || 'private';
    const newVisibility = currentVisibility === 'public' ? 'private' : 'public';
    
    try {
      const response = await fetch(
        `http://143.110.187.69:5000/api/classes/updateClassVisibility`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            classId: classId,
            visibility: newVisibility
          })
        }
      );

      if (response.ok) {
        // Update the local state to reflect the change
        setClassDetails({
          ...classDetails,
          visibility: newVisibility
        });
      } else {
        throw new Error('Failed to update class visibility');
      }
    } catch (error) {
      console.error("Error updating class visibility:", error);
      alert("Error updating class visibility: " + error.message);
    } finally {
      setUpdatingVisibility(false);
    }
  };

  // Navigation handlers
  const navigateToQuizzes = () => {
    router.push(`/teachers/classes/${classId}/quizzes`);
  };

  const navigateToMonths = () => {
    router.push(`/teachers/classes/${classId}/months`);
  };
  
  const navigateToMaterials = () => {
    router.push(`/teachers/classes/${classId}/materials`);
  };

  const navigateToPayments = () => {
    router.push(`/teachers/classes/${classId}/payments`);
  };
  
  const navigateToOnlineMeeting = () => {
    router.push(`/teachers/classes/${classId}/online-meeting`);
  };
  
  const navigateToMonthsMeeting = () => {
    router.push(`/teachers/classes/${classId}/months-meetings`);
  };

  // Helper function to get visibility icon
  const getVisibilityIcon = (visibility) => {
    return visibility === 'public' 
      ? <Globe size={20} className="text-teal-600" /> 
      : <Lock size={20} className="text-teal-600" />;
  };

  // Helper function to get visibility text
  const getVisibilityText = (visibility) => {
    return visibility === 'public' ? 'Public' : 'Private';
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse"></div>
            <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-4 h-4 bg-teal-500 rounded-full animate-pulse delay-300"></div>
          </div>
          <p className="mt-3 text-teal-700">Loading class details...</p>
        </div>
      </div>
    );
  }

  if (!classDetails) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-green-50 to-teal-50">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full">
            <Shield className="text-red-500" size={28} />
          </div>
          <h2 className="text-xl font-bold text-center text-gray-800">Class Not Found</h2>
          <p className="mt-2 text-center text-gray-600">We couldn't find the class details you're looking for.</p>
          <button 
            onClick={() => router.back()} 
            className="w-full px-4 py-2 mt-4 text-white bg-teal-500 rounded-lg hover:bg-teal-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Add Sidebar here */}
      <Sidebar />

      {/* Main Content - Adjust to work with sidebar */}
      <div className="flex-1 p-6 md:ml-[20%]">
        <div className="max-w-6xl mx-auto">
          {/* Class Header Card */}
          <div className="overflow-hidden bg-white rounded-xl shadow-lg">
            {/* Header with gradient background */}
            <div className="p-8 text-white bg-gradient-to-r from-teal-600 to-green-500">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{classDetails.grade}</h1>
                  <div className="flex items-center mt-2 space-x-2">
                    <BookText size={20} />
                    <span className="text-xl font-medium">{classDetails.subject}</span>
                  </div>
                  <div className="flex items-center mt-2 text-teal-100">
                    <Clock size={16} className="mr-2" />
                    <span>{new Date(classDetails.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="hidden p-6 bg-white bg-opacity-20 rounded-full md:block">
                  <Award size={48} />
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
              <button 
                onClick={() => setActiveTab('overview')}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'overview' 
                    ? 'text-teal-600 border-b-2 border-teal-500' 
                    : 'text-gray-500 hover:text-teal-600'
                }`}
              >
                <Layers size={18} className="mr-2" />
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('details')}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'details' 
                    ? 'text-teal-600 border-b-2 border-teal-500' 
                    : 'text-gray-500 hover:text-teal-600'
                }`}
              >
                <Globe size={18} className="mr-2" />
                Details
              </button>
            </div>
            
            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' ? (
                <div className="space-y-6">
                  {/* Class Quick Stats */}
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full">
                          <User size={20} className="text-green-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Teacher</p>
                          <p className="text-lg font-semibold text-gray-800">{classDetails.teacher || 'Not assigned'}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Visibility Status with Toggle Button */}
                    <div className="p-4 bg-teal-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-3 bg-teal-100 rounded-full">
                            {getVisibilityIcon(classDetails.visibility || 'private')}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-500">Visibility</p>
                            <p className="text-lg font-semibold text-gray-800">
                              {getVisibilityText(classDetails.visibility || 'private')}
                            </p>
                          </div>
                        </div>
                        <button 
                          onClick={toggleClassVisibility}
                          disabled={updatingVisibility}
                          className="px-3 py-1 text-sm text-white bg-teal-600 rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
                        >
                          {updatingVisibility ? 'Changing...' : 'Change'}
                        </button>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="p-3 bg-emerald-100 rounded-full">
                          <Calendar size={20} className="text-emerald-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-500">Created</p>
                          <p className="text-lg font-semibold text-gray-800">{new Date(classDetails.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Description Box */}
                  <div className="p-4 bg-white border border-gray-200 rounded-lg">
                    <h3 className="flex items-center text-lg font-medium text-gray-800">
                      <BookText size={18} className="mr-2 text-teal-600" />
                      Description
                    </h3>
                    <p className="mt-2 text-gray-700">
                      {classDetails.description || 'No description available for this class.'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Additional details would go here */}
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-800">Class Details</h3>
                    <div className="mt-3 space-y-3">
                      {Object.entries(classDetails).map(([key, value]) => {
                        // Skip certain fields or complex objects
                        if (['_id', '__v', 'createdAt', 'updatedAt'].includes(key) || typeof value === 'object') return null;
                        
                        return (
                          <div key={key} className="flex border-b border-gray-100 pb-2">
                            <span className="w-1/3 font-medium text-gray-600">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                            <span className="w-2/3 text-gray-800">{value.toString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Action Buttons - Keeping original colors as requested */}
              <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-2 lg:grid-cols-4">
                <button
                  onClick={navigateToMonths}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-white transition-all bg-blue-500 rounded-md hover:bg-blue-600 hover:shadow-md"
                >
                  <ListChecks size={20} />
                  <span>Manage Quizzes</span>
                </button>
                
                <button
                  onClick={navigateToMaterials}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-white transition-all bg-green-500 rounded-md hover:bg-green-600 hover:shadow-md"
                >
                  <FileText size={20} />
                  <span>Manage Materials</span>
                </button>
                
                <button
                  onClick={navigateToPayments}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-white transition-all bg-red-500 rounded-md hover:bg-red-600 hover:shadow-md"
                >
                  <FileText size={20} />
                  <span>Manage Payments</span>
                </button>
                
                <button
                  onClick={navigateToMonthsMeeting}
                  className="flex items-center justify-center gap-2 px-4 py-3 text-white transition-all rounded-md hover:bg-yellow-600 bg-yellow-500 hover:shadow-md"
                >
                  <FileText size={20} />
                  <span>Online Meeting</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassDetailPage;