"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [error, setError] = useState(null);

  const studentMongoId =
    typeof window !== "undefined" ? localStorage.getItem("studentMongoId") : null;
  const name = localStorage.getItem("name");

  const toFindClasses = () => {
    router.push("/student/find-classes");
  };

  useEffect(() => {
    if (studentMongoId) {
      fetch(`http://localhost:5000/classes/student/${studentMongoId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.classes) {
            setEnrolledClasses(data.classes);
            setError(null);
          } else {
            setError("Failed to fetch enrolled classes.");
          }
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
          setError("Error fetching classes. Please try again later.");
        });
    } else {
      setError("Student ID not found.");
    }
  }, [studentMongoId]);

  const handleClassClick = (className, teacher) => {
    router.push(
      `/student/view-classes?className=${encodeURIComponent(
        className
      )}&teacher=${encodeURIComponent(teacher)}`
    );
  };

  return (
    <div className="p-4 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          Welcome, {name}
        </h1>
        <button
          onClick={toFindClasses}
          className="bg-gray-200 text-gray-800 text-lg md:text-2xl font-bold rounded-lg px-4 py-2 md:px-6 md:py-3 hover:shadow-lg transition-shadow"
        >
          Find a Class
        </button>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="bg-gray-200 p-4 md:p-5 rounded-2xl text-2xl md:text-3xl font-bold mb-5 text-center w-full md:w-auto">
          ENROLLED CLASSES
        </h2>
        {error && <p className="text-red-500 mb-5 text-center">{error}</p>}
        {enrolledClasses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enrolledClasses.map((cls) => (
              <div
                key={cls._id}
                className="p-4 md:p-6 bg-teal-500 rounded-lg shadow-lg cursor-pointer hover:bg-teal-600 transition duration-300 flex flex-col items-center"
                onClick={() => handleClassClick(cls.subject, cls.teacher || "N/A")}
              >
                <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2">
                  Grade: {cls.grade}
                </h3>
                <p className="text-base md:text-lg text-white text-center">
                  <strong>Subject:</strong> {cls.subject}
                </p>
                <p className="text-base md:text-lg text-white text-center">
                  <strong>Teacher:</strong> {cls.teacher || "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-5">No enrolled classes found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
