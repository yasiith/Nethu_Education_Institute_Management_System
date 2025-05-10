"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CreateForm from "./gradeCreateForm";
import { PlusCircle, Book, Calendar, Layers, ArrowRight, Loader2, Globe, Lock } from "lucide-react";

const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [showGradeCreateForm, setShowGradeCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [teacherName, setTeacherName] = useState("Teacher Name");
  const router = useRouter();

  // Create a ref for the create grade form
  const createFormRef = useRef(null);

  const fetchClasses = async () => {
    const teacherID = localStorage.getItem("TeacherID");
    if (!teacherID) {
      alert("TeacherID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://nethu-education-institute-management.onrender.com/api/classes/getClassesByTeacher?teacherId=${teacherID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        setClasses(data);
      }
    } catch (error) {
      console.error("Error loading classes:", error);
      alert("Error loading classes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Only fetch classes once after mounting
  useEffect(() => {
    fetchClasses();
    // You would typically fetch the teacher name here as well
    // For now we'll just use the placeholder
  }, []);

  const handleCreateSuccess = () => {
    fetchClasses(); // Refresh class list after successful creation
    setShowGradeCreateForm(false);
  };

  const handleClassClick = (classId) => {
    router.push(`/teachers/classes/${classId}`);
  };

  const toggleGradeCreateForm = () => {
    setShowGradeCreateForm((prev) => !prev);
    if (!showGradeCreateForm) {
      // Scroll to the create form if it is becoming visible
      if (createFormRef.current) {
        // Check if ref is available
        createFormRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // Optionally, scroll back up to the button
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const toggleClassVisibility = async (classId, currentStatus) => {
    // Prevent the click from bubbling up to the parent (which would navigate to class detail)
    event.stopPropagation();
    
    const newStatus = currentStatus === 'public' ? 'private' : 'public';
    
    try {
      const response = await fetch(
        `https://nethu-education-institute-management.onrender.com/api/classes/updateClassVisibility`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            classId: classId,
            visibility: newStatus
          })
        }
      );

      if (response.ok) {
        // Update the local state to reflect the change
        setClasses(classes.map(classItem => {
          if (classItem.classid === classId) {
            return { ...classItem, visibility: newStatus };
          }
          return classItem;
        }));
      } else {
        throw new Error('Failed to update class visibility');
      }
    } catch (error) {
      console.error("Error updating class visibility:", error);
      alert("Error updating class visibility: " + error.message);
    }
  };

  const getSubjectIcon = (subject) => {
    // You could expand this to have different icons for different subjects
    return <Book className="w-6 h-6" />;
  };

  const getVisibilityIcon = (visibility) => {
    return visibility === 'public' 
      ? <Globe className="w-5 h-5 text-green-600" /> 
      : <Lock className="w-5 h-5 text-gray-600" />;
  };

  const getVisibilityText = (visibility) => {
    return visibility === 'public' ? 'Public' : 'Private';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-green-50 to-teal-50 text-black shadow-sm">
        <div className="container px-4 py-8 mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">
            Welcome
          </h1>
          <p className="mt-2 text-green-600">Teacher Dashboard</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 mx-auto py-8">
        {/* Classes Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-600 p-2 rounded-lg shadow-md">
              <Layers className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Your Classes</h2>
          </div>
          
          <button
            onClick={toggleGradeCreateForm}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all transform hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create Grade</span>
          </button>
        </div>

        {/* Classes Cards Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
            <span className="ml-3 text-teal-600 font-medium">Loading classes...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {classes.length > 0 ? (
              classes.map((classItem) => (
                <div
                  key={classItem._id}
                  onClick={() => handleClassClick(classItem.classid)}
                  className="group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-teal-500"
                >
                  <div className="h-2 bg-gradient-to-r from-green-500 to-teal-500"></div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-teal-100 rounded-lg">
                        {getSubjectIcon(classItem.subject)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{classItem.year}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      Grade {classItem.grade}
                    </h3>
                    <p className="text-lg font-medium text-teal-700 mb-4">
                      {classItem.subject}
                    </p>
                    
                    {/* Visibility Badge */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center text-sm">
                        <div className="flex items-center px-3 py-1 rounded-full bg-gray-100">
                          {getVisibilityIcon(classItem.visibility || 'private')}
                          <span className="ml-1 font-medium">{getVisibilityText(classItem.visibility || 'private')}</span>
                        </div>
                      </div>
                      
                      {/* Toggle Button */}
                      <button 
                        onClick={(e) => toggleClassVisibility(classItem.classid, classItem.visibility || 'private')}
                        className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-gray-700 transition-colors"
                      >
                        Change
                      </button>
                    </div>

                    <div className="flex justify-end mt-2">
                      <span className="inline-flex items-center text-sm font-medium text-green-600 group-hover:text-green-800">
                        View Class <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full">
                <div className="flex flex-col items-center justify-center py-12 px-4 bg-white rounded-xl shadow text-center">
                  <div className="bg-green-100 p-4 rounded-full mb-4">
                    <Book className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No Classes Yet</h3>
                  <p className="text-gray-500 mb-6">You haven't created any classes yet. Create your first class to get started.</p>
                  <button
                    onClick={toggleGradeCreateForm}
                    className="px-5 py-3 bg-teal-600 text-white rounded-lg flex items-center gap-2 hover:bg-teal-700 transition-colors"
                  >
                    <PlusCircle className="w-5 h-5" />
                    <span>Create New Grade</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Create Grade Button (Mobile Friendly) */}
        {classes.length > 0 && !showGradeCreateForm && (
          <div className="mt-10 mb-10 w-full flex justify-center sm:hidden">
            <button
              className="w-full px-4 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-teal-600 transition-colors"
              onClick={toggleGradeCreateForm}
            >
              <PlusCircle className="w-6 h-6" />
              <span className="text-xl">CREATE A GRADE</span>
            </button>
          </div>
        )}

        {/* Create Grade Form */}
        {showGradeCreateForm && (
          <div className="mt-8 w-full" ref={createFormRef}>
            <div className="bg-white rounded-xl shadow-lg p-6 border-t-4 border-green-500">
              <CreateForm
                onClose={() => setShowGradeCreateForm(false)}
                onSuccess={handleCreateSuccess}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .grid > div {
          animation: fadeIn 0.3s ease-out forwards;
          animation-delay: calc(var(--index) * 0.1s);
          opacity: 0;
        }
      `}</style>
    </div>
  );
};

export default TeacherDashboard;