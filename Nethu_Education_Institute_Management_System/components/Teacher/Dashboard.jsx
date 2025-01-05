"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import CreateForm from "./gradeCreateForm";

const TeacherDashboard = () => {
  const [classes, setClasses] = useState([]);
  const [showGradeCreateForm, setShowGradeCreateForm] = useState(false);
  const [loading, setLoading] = useState(true);
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
        `http://localhost:5000/api/classes/getClassesByTeacher?teacherId=${teacherID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (!response.ok) {
        // alert("No classes available");
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

  return (
    <div className="pt-10">
      <div className="inline-block pl-10">
        <div className="p-5 whitespace-nowrap">
          <h1 className="text-4xl font-bold">Welcome, Teacher Name</h1>
        </div>
      </div>
      <div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col bg-gray-200 p-5 rounded-2xl">
            <h2 className="text-4xl font-semibold">Created Classes</h2>
          </div>
        </div>
      </div>

      {loading ? (
        <div>Loading classes...</div>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-4 mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <div
                    key={classItem._id} // ensure _id or another unique identifier
                    onClick={() => handleClassClick(classItem.classid)}

                    className="cursor-pointer p-4 bg-teal-500 rounded-lg shadow-md  hover:bg-teal-600 transition duration-300 flex flex-col items-center"
                  >
                    <h2 className="text-xl font-bold text-white text-center">
                      {classItem.grade}
                    </h2>
                    <p className="text-lg text-white font-semibold mt-2 text-center">
                      {classItem.description}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  No classes available.
                </p>
              )}
            </div>
          </div>

          <div className="mt-10 mb-10 w-full flex justify-center">
            <button
              className="w-[1000px] h-[100px] bg-[#dadada] text-[#616060] font-bold rounded-[30px] text-4xl hover:bg-gray-300 hover:text-black"
              onClick={toggleGradeCreateForm}
            >
              CREATE A GRADE +
            </button>
          </div>

          {showGradeCreateForm && (
            <div
              className="mt-5 w-full flex justify-center"
              ref={createFormRef}
            >
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
