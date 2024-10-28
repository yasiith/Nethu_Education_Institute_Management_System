"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import CreateForm from './gradeCreateForm';


const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [grades, setGrades] = useState([]);
  const [showGradeCreateForm, setShowGradeCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchClasses = async () => {
    const teacherID = localStorage.getItem('TeacherID');
    if (!teacherID) {
      alert("TeacherID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/classes/getClassesByTeacher?teacherId=${teacherID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
       //alert("No classes available");
      }

      const data = await response.json();
      setClasses(data);
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
  }, []);

  const handleCreateSuccess = () => {
    fetchClasses(); // Refresh class list after successful creation
  };

  const handleClassClick = (classId) => {
    router.push(`/teachers/classes/${classId}`);
  };

  return (
    <div className="flex flex-col items-center pt-10">
      <div className="w-[1000px] h-[100px] bg-[#d9d9d9] text-center rounded-[30px] flex items-center justify-center">
        <h2 className="text-4xl font-bold">WELCOME, TEACHER</h2>
      </div>

      {loading ? (
        <div>Loading classes...</div>
      ) : (
        <>
          <div className="flex flex-col-3 flex-wrap justify-center gap-4 mt-10">
            {grades.length > 0 ? (
              grades.map((grade, index) => (
                <button
                  key={index}
                  className="w-[397px] h-[137px] bg-teal-400 text-white font-bold rounded-[53px] text-xl flex items-center justify-center"
                  onClick={() => alert(`Navigating to ${grade}`)}
                >
                  {grade.toUpperCase()}
                </button>
              ))
            ) : (
              <button
                className="w-[397px] h-[137px] bg-teal-400 text-white font-bold rounded-[53px] text-3xl flex items-center justify-center"
                onClick={() => setShowGradeCreateForm(true)}
              >
                +
              </button>
            )}

            <div>
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <div
                    key={classItem.id}
                    onClick={() => handleClassClick(classItem.id)}
                    className="cursor-pointer"
                  >
                    <h2>{classItem.name}</h2>
                    <p>{classItem.description}</p>
                  </div>
                ))
              ) : (
                <p>No classes available.</p>
              )}
            </div>
          </div>

          <div className="mt-10 mb-3 w-full flex justify-center">
            <button
              className="w-[1000px] h-[100px] bg-[#dadada] text-[#616060] font-bold rounded-[30px] text-4xl hover:bg-gray-300 hover:text-black"
              onClick={() => setShowGradeCreateForm(true)}
            >
              CREATE A GRADE +
            </button>
          </div>

          {showGradeCreateForm && (
            <div className="mt-5 w-full flex justify-center">
              <CreateForm 
                onClose={() => setShowGradeCreateForm(false)} 
                onSuccess={handleCreateSuccess} 
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeacherDashboard;
