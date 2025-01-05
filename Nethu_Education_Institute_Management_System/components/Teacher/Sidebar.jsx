import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Error fetching classes");
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

  // Fetch classes when the component mounts
  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassClick = (classId) => {
    router.push(`/teachers/classes/${classId}`);
  };

  return (
    <div
      className="fixed top-0 left-0 z-20 w-3/4 md:w-1/5 bg-[#03045E] text-white flex flex-col items-center p-4 transition-transform duration-300 h-screen"
    >
      <h1 className="text-xl font-bold mb-6">NEIMS</h1>

      {/* Display Teacher's Classes */}
      <div className="flex flex-col w-full">
        <h2 className="text-lg font-semibold text-center text-teal-400 mb-3">
          Your Classes
        </h2>

        {loading ? (
          <div className="text-center text-gray-300">Loading classes...</div>
        ) : (
          <div className="flex flex-col gap-4 mt-3 w-full">
            {classes.length > 0 ? (
              classes.map((classItem) => (
                <div
                  key={classItem._id} // Ensure unique key
                  onClick={() => handleClassClick(classItem.classid)}
                  className="cursor-pointer p-4 bg-teal-500 rounded-md shadow-md hover:bg-teal-600 transition duration-300 flex flex-col items-center w-full"
                >
                  <h2 className="text-md font-bold text-white text-center">
                    {classItem.grade}
                  </h2>
                  <p className="text-sm text-white font-medium mt-1 text-center">
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
        )}
      </div>

      {/* Sidebar Buttons */}
      <div className="mt-auto w-full">
        <button className="w-full py-2 mt-4 bg-teal-600 text-white text-sm font-medium rounded-md hover:bg-teal-700 transition-all">
          CREATE A GRADE +
        </button>
        <button className="w-full py-2 my-2 bg-[#0077B6] text-white text-sm font-medium rounded-md hover:bg-[#0096C7] transition-all">
          BACK
        </button>
        <button className="w-full py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-all">
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
