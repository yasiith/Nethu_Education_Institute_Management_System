import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams

const Sidebar = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { classId } = useParams(); // Get classId from the URL
  const [selectedClass, setSelectedClass] = useState(classId || null); // Initialize selectedClass with classId from URL

  const handleLogout = async () => {
    try {
      localStorage.clear();
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

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

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassClick = (classId) => {
    setSelectedClass(classId); // Update selectedClass state
    window.location.href = `/teachers/classes/${classId}`;
  };

  const handleClickBack = () => { 
    window.location.href = '/teachers';
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed z-30 p-2 text-white bg-blue-600 rounded-md top-4 left-4 md:hidden"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      <div
        className={`fixed top-0 left-0 z-20 h-screen bg-[#03045E] text-white flex flex-col items-center p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full bg"
        } md:translate-x-0 md:w-1/5`}
      >
        <h1 className="mb-6 text-4xl font-semibold">NEIMS</h1>

        {/* Display Teacher's Classes */}
        <div className="flex flex-col w-full overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#03045E] [&::-webkit-scrollbar-thumb]:bg-[#03045E] [&::-webkit-scrollbar-thumb]:rounded-full">
          <h2 className="mb-3 text-lg font-semibold text-center text-teal-400">
            Your Classes
          </h2>

          {loading ? (
            <div className="text-center text-gray-300">Loading classes...</div>
          ) : (
            <div className="flex flex-col w-full gap-4 mt-3">
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <div
                    key={classItem._id}
                    onClick={() => handleClassClick(classItem.classid)}
                    className={`flex flex-col items-center w-full p-4 transition duration-300 rounded-md shadow-md cursor-pointer ${
                      selectedClass === classItem.classid
                        ? "bg-teal-500" // Highlight selected class
                        : "bg-teal-800 hover:bg-teal-600"
                    }`}
                  >
                    <h2 className="font-bold text-center text-white text-md">
                      {classItem.year}
                    </h2>
                    <h2 className="font-bold text-center text-white text-md">
                      Grade {classItem.grade}
                    </h2>
                    <p className="font-bold text-center text-white text-md">
                      {classItem.subject}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No classes available.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Buttons */}
        <div className="w-full mt-auto">
          <button
            onClick={handleClickBack}
            className="w-full py-2 my-2 bg-[#0077B6] text-white text-sm font-medium rounded-md hover:bg-[#0096C7] transition-all">
            DASHBOARD
          </button>
          <button
            onClick={handleLogout}
            className="w-full py-2 text-sm font-medium text-white transition-all bg-red-600 rounded-md hover:bg-red-700"
          >
            LOG OUT
          </button>
        </div>
      </div>

      {/* Dim Background for Open Sidebar */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
        />
      )}
    </>
  );
};

export default Sidebar;