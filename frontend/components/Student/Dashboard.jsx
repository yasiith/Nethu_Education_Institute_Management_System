"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const studentMongoId =
    typeof window !== "undefined" ? localStorage.getItem("StudentID") : null;
  const name = localStorage.getItem("name");

  const toFindClasses = () => {
    router.push("/student/find-classes");
  };

  useEffect(() => {
    if (studentMongoId) {
      setLoading(true);
      fetch(`http://localhost:5000/classes/student/${studentMongoId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.classes) {
            setEnrolledClasses(data.classes);
            setError(null);
          } else {
            setError("Failed to fetch enrolled classes.");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
          setError("Error fetching classes. Please try again later.");
          setLoading(false);
        });
    } else {
      setError("Student ID not found.");
      setLoading(false);
    }
  }, [studentMongoId]);

  const handleClassClick = (className, teacher, classid, year) => {
    router.push(
      `/student/view-classes?className=${encodeURIComponent(
        className
      )}&teacher=${encodeURIComponent(teacher)}&classid=${encodeURIComponent(classid)}&year=${encodeURIComponent(year)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-50 to-teal-50 py-8 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl md:text-4xl font-bold text-black">
            Welcome, {name}
          </h1>
          <button
            onClick={toFindClasses}
            className="bg-white text-green-700 text-lg font-medium rounded-lg px-6 py-3 hover:bg-green-50 transition-colors duration-300 flex items-center gap-2 shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find a Class
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6 md:p-10">
        <div className="mb-10">
          <div className="inline-block bg-white rounded-2xl shadow-xl overflow-hidden">
            <h2 className="bg-gradient-to-r from-green-500 to-teal-500 py-3 px-10 text-2xl font-bold text-white text-center">
              ENROLLED CLASSES
            </h2>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        )}

        {/* Classes Grid */}
        {!loading && enrolledClasses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {enrolledClasses.map((cls) => (
              <div
                key={cls._id}
                onClick={() => handleClassClick(cls.subject, cls.teacher || "N/A", cls.classid || "N/A", cls.year)}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
              >
                <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4">
                  <h3 className="text-xl font-bold text-white text-center">{cls.year}</h3>
                  <h4 className="text-lg text-white text-center">Grade: {cls.grade}</h4>
                </div>
                <div className="p-5 bg-white">
                  <div className="mb-2">
                    <p className="text-gray-600 font-medium">Subject</p>
                    <p className="text-lg font-semibold text-green-800">{cls.subject}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Teacher</p>
                    <p className="text-lg font-semibold text-green-800">{cls.teacher || "N/A"}</p>
                  </div>
                </div>
                <div className="px-5 pb-4 pt-0">
                  <div className="w-full h-1 bg-gradient-to-r from-green-500 to-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading && !error && (
            <div className="bg-white rounded-xl shadow-lg p-10 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-green-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-xl text-gray-600">No enrolled classes found.</p>
              <button
                onClick={toFindClasses}
                className="mt-6 bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-teal-600 transition-colors duration-300"
              >
                Find Classes to Join
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Dashboard;