"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const View = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null);     // Error state

  // Fetch teacher data from the backend
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false); // Ensure loading stops if no token is found
      return;
    }

    const fetchTeachers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/auth/viewteachers`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-auth-token": token,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch teachers.");
        }

        const data = await response.json();
        setTeachers(data.data || []); // Set the fetched teacher data or an empty array if undefined
      } catch (error) {
        console.error("Error fetching teachers:", error);
        setError(error.message); // Set error state
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchTeachers();
  }, []);

  const handleBack = () => {
    router.push("/admin/teachers");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5 p-5">
        <button
          onClick={handleBack}
          className='bg-red-500 w-[200px] h-[70px] rounded-[30px] text-white font-bold text-4xl'
        >
          BACK
        </button>
        <h1 className="bg-[#D7D7D7] py-4 px-8 rounded-full text-[40px] font-bold text-[#3b3b3b]">
          VIEW TEACHERS
        </h1>
      </div>

      <div className="flex flex-col items-center pb-10 ml-10 mr-10">
        {loading ? (
          <p className="text-2xl text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-2xl text-red-500">Error: {error}</p>
        ) : (
          <div className="bg-gray-200 w-full p-4 rounded-xl">
            <table className="table-auto w-full text-justify text-[30px]">
              <thead>
                <tr className="font-bold text-gray-800 text-[30px]">
                  <th className="p-3">Teacher ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.TeacherID} className="bg-gray-100 text-gray-700">
                    <td className="p-3">{teacher.TeacherID || 'N/A'}</td>
                    <td className="p-3">{teacher.name || 'N/A'}</td>
                    <td className="p-3">{teacher.email || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default View;
