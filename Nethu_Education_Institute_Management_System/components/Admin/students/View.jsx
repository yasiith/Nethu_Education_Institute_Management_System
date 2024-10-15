"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const View = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);      // Error state

  // Fetch student data from the backend
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);  // Ensure loading stops if no token is found
      return; // Stop execution if no token is found
    }

    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/viewstudents`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch students.");
        }

        const data = await response.json();
        console.log(data);
        setStudents(data.data || []);  // Set the fetched student data or an empty array if undefined
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);  // Set error state
      } finally {
        setLoading(false);  // Stop loading regardless of success or failure
      }
    };

    fetchStudents();  // Call the async function to fetch student data
  }, []);

  const handleBack = () => {
    router.push("/admin/students");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5 p-5">
        <button
          onClick={handleBack}
          className="bg-red-500 w-[200px] h-[70px] rounded-[30px] text-white font-bold text-4xl"
        >
          BACK
        </button>
        <h1 className="bg-[#D7D7D7] py-4 px-8 rounded-full text-[40px] font-bold text-[#3b3b3b]">
          VIEW STUDENTS
        </h1>
      </div>

      <div className="flex flex-col items-center pb-10 ml-10 mr-10">
        <div className="bg-gray-200 w-full p-4 rounded-xl">
          {loading ? (
            <p className="text-center text-lg">Loading students...</p>  // Loading message
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>  // Error message
          ) : students.length === 0 ? (
            <p className="text-center">No students found.</p>  // No students message
          ) : (
            <table className="table-auto w-full text-justify text-[30px]">
              <thead>
                <tr className="font-bold text-gray-800 text-[30px]">
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.StudentID} className="bg-gray-100 text-gray-700">
                    <td className="p-3">{student.StudentID || 'N/A'}</td>
                    <td className="p-3">{student.name || 'N/A'}</td>
                    <td className="p-3">{student.email || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;
