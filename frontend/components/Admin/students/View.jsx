"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const View = () => {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch student data from the backend
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await fetch(`https://nethu-education-institute-management.onrender.com/api/auth/viewstudents`, {
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
        setStudents(data.data || []);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Filter students based on search term
  const filteredStudents = students.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (student.StudentID && student.StudentID.toLowerCase().includes(searchLower)) ||
      (student.name && student.name.toLowerCase().includes(searchLower)) ||
      (student.email && student.email.toLowerCase().includes(searchLower))
    );
  });

  const handleBack = () => {
    router.push("/admin/students");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <h1 className="text-3xl font-bold text-gray-900">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-800">
                  Student Directory
                </span>
              </h1>
              <p className="mt-1 text-sm text-purple-700">
                View and manage all registered students
              </p>
            </div>
            
            <button
              onClick={handleBack}
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
          
          {/* Search Bar */}
          <div className="mt-6">
                          <div className="relative rounded-md shadow-sm max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                className="focus:ring-purple-500 block w-full pl-10 sm:text-sm border-2 border-gray-300 focus:border-purple-500 rounded-md py-3"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Student List */}
        <div className="bg-white overflow-hidden shadow-md rounded-lg">
          {loading ? (
            <div className="p-10 flex justify-center">
              <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
                <p className="mt-4 text-gray-600">Loading students...</p>
              </div>
            </div>
          ) : error ? (
            <div className="p-10 text-center">
              <div className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-red-50 text-red-800">
                <svg className="h-5 w-5 mr-2 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-10 text-center">
              {searchTerm ? (
                <p className="text-gray-500">No students match your search criteria.</p>
              ) : (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="h-8 w-8 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <p className="text-gray-500">No students found in the database.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-center text-lg font-medium text-gray-600 uppercase tracking-wider">
                      Student ID
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-lg font-medium text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 text-center text-lg font-medium text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.StudentID} className="hover:bg-purple-50 transition-colors">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-base font-medium text-gray-900 text-center">{student.StudentID || "N/A"}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-base text-gray-900 text-center">{student.name || "N/A"}</div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="text-base text-gray-700 text-center">{student.email || "N/A"}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination or student count */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{filteredStudents.length}</span> {filteredStudents.length === 1 ? 'student' : 'students'}
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