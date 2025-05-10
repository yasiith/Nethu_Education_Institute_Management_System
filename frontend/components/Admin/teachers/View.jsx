"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const View = () => {
  const router = useRouter();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchTeachers = async () => {
      try {
        const response = await fetch(`https://nethu-education-institute-management.onrender.com/api/auth/viewteachers`, {
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

  // Filter teachers based on search term
  const filteredTeachers = teachers.filter((teacher) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (teacher.TeacherID && teacher.TeacherID.toLowerCase().includes(searchLower)) ||
      (teacher.name && teacher.name.toLowerCase().includes(searchLower)) ||
      (teacher.email && teacher.email.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-6 sm:mb-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  Faculty Directory
                </span>
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                View and manage all registered teachers
              </p>
            </div>
            
            <button
              onClick={() => router.push("/admin/teachers")}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-6 max-w-lg">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-2 border-gray-300 rounded-md py-3"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {loading ? (
            <div className="p-10 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-600">Loading teachers...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-10 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-red-50 text-red-800">
                <svg className="h-5 w-5 mr-2 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          ) : filteredTeachers.length === 0 ? (
            <div className="p-10 text-center">
              {searchTerm ? (
                <p className="text-gray-500">No teachers match your search criteria.</p>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No teachers found in the database.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Teacher ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-sm font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTeachers.map((teacher) => (
                    <tr key={teacher.TeacherID} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-base font-medium text-gray-900 text-center">{teacher.TeacherID || "N/A"}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-base text-gray-900 text-center">{teacher.name || "N/A"}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-base text-gray-700 text-center">{teacher.email || "N/A"}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Table footer with count */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredTeachers.length}</span> {filteredTeachers.length === 1 ? 'teacher' : 'teachers'}
                  {searchTerm && (
                    <span> matching "<span className="font-medium">{searchTerm}</span>"</span>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default View;