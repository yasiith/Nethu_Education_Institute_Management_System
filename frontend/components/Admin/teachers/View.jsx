"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const View = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
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

        if (!response.ok) throw new Error("Failed to fetch teachers.");
        const data = await response.json();
        setTeachers(data.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 mb-8 sm:flex-row">
          <button
            onClick={() => router.push("/admin/teachers")}
            className="bg-red-500 w-full sm:w-[200px] py-3 sm:py-4 rounded-[30px] 
                     text-white font-bold text-2xl sm:text-4xl hover:bg-red-600 
                     transition-colors"
          >
            BACK
          </button>
          
          <div className="bg-gray-300 w-full sm:w-auto text-center py-4 px-6 sm:px-8 
                        rounded-[35px]">
            <h1 className="text-2xl font-bold sm:text-4xl">VIEW TEACHERS</h1>
          </div>
        </div>

        <div className="w-full p-4 overflow-x-auto bg-gray-200 rounded-xl">
          {loading ? (
            <p className="py-4 text-xl text-center text-gray-500">Loading...</p>
          ) : error ? (
            <p className="py-4 text-xl text-center text-red-500">Error: {error}</p>
          ) : (
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="text-lg font-bold text-gray-800 sm:text-2xl">
                  <th className="p-3 text-left">Teacher ID</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((teacher) => (
                  <tr key={teacher.TeacherID} 
                      className="text-base text-gray-700 bg-gray-100 sm:text-xl">
                    <td className="p-3">{teacher.TeacherID || 'N/A'}</td>
                    <td className="p-3">{teacher.name || 'N/A'}</td>
                    <td className="p-3">{teacher.email || 'N/A'}</td>
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