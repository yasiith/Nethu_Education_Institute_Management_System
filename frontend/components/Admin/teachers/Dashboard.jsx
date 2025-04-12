"use client";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleClick1 = () => router.push("/admin/teachers/teacher-register");
  const handleClick2 = () => router.push("/admin/teachers/teacher-update");
  const handleClick3 = () => router.push("/admin/teachers/teacher-delete");
  const handleClick4 = () => router.push("/admin/teachers/teacher-view");

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 py-8 mb-8 shadow-lg">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
            Teacher Management
          </h1>
          <p className="text-blue-100 text-center mt-2">Manage teaching staff for your education center</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Register Card */}
          <div 
            onClick={handleClick1} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-teal-500"></div>
            <div className="p-6 pl-8">
              <div className="p-3 bg-teal-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-500 transition-colors">Register Teacher</h2>
              <p className="text-gray-600">Add new teachers to the system</p>
              <div className="mt-4 flex justify-end">
                <div className="bg-teal-50 text-teal-500 rounded-full p-2 group-hover:bg-teal-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Update Card */}
          <div 
            onClick={handleClick2} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
            <div className="p-6 pl-8">
              <div className="p-3 bg-blue-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors">Update Teacher</h2>
              <p className="text-gray-600">Modify existing teacher information</p>
              <div className="mt-4 flex justify-end">
                <div className="bg-blue-50 text-blue-500 rounded-full p-2 group-hover:bg-blue-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Card */}
          <div 
            onClick={handleClick3} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
            <div className="p-6 pl-8">
              <div className="p-3 bg-red-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">Delete Teacher</h2>
              <p className="text-gray-600">Remove teachers from the system</p>
              <div className="mt-4 flex justify-end">
                <div className="bg-red-50 text-red-500 rounded-full p-2 group-hover:bg-red-500 group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* View Card */}
          <div 
            onClick={handleClick4} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
          >
            <div className="absolute top-0 left-0 w-2 h-full bg-purple-500 "></div>
            <div className="p-6 pl-8">
              <div className="p-3 bg-purple-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-500  transition-colors">View Teachers</h2>
              <p className="text-gray-600">Browse all teacher information</p>
              <div className="mt-4 flex justify-end">
                <div className="bg-amber-50 text-purple-500 rounded-full p-2 group-hover:bg-purple-500  group-hover:text-white transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      
        {/* Grade Level Assignment Section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-lg text-gray-700 mb-4">Teachers by Grade Level</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Primary (Grade 1-5) */}
            <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-green-100 rounded-full p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Primary</h4>
              <p className="text-sm text-gray-600 mb-1">Grades 1-5</p>
              <p className="text-xl font-bold text-green-600">12 Teachers</p>
            </div>

            {/* Middle (Grade 6-8) */}
            <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-blue-100 rounded-full p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Middle</h4>
              <p className="text-sm text-gray-600 mb-1">Grades 6-8</p>
              <p className="text-xl font-bold text-blue-600">10 Teachers</p>
            </div>

            {/* High (Grade 9-11) */}
            <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-purple-100 rounded-full p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">High School</h4>
              <p className="text-sm text-gray-600 mb-1">Grades 9-11</p>
              <p className="text-xl font-bold text-purple-600">13 Teachers</p>
            </div>

            {/* Multi-Grade */}
            <div className="bg-amber-50 rounded-lg p-4 flex flex-col items-center">
              <div className="bg-amber-100 rounded-full p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Multi-Grade</h4>
              <p className="text-sm text-gray-600 mb-1">Special Subjects</p>
              <p className="text-xl font-bold text-amber-600">8 Teachers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;