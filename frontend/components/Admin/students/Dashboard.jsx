"use client";
import { useRouter } from "next/navigation";

const Dashboard = () => {
    const router = useRouter();
    
    const handleClick1 = () => {
        router.push('/admin/students/student-register');
    };
    
    const handleClick2 = () => {
        router.push('/admin/students/student-update');
    };
    
    const handleClick3 = () => {
        router.push('/admin/students/student-delete');
    };
    
    const handleClick4 = () => {
        router.push('/admin/students/student-view');
    };

    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 py-8 mb-8 shadow-lg">
                <div className="container mx-auto px-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
                        Student Management
                    </h1>
                    <p className="text-blue-100 text-center mt-2">Manage your student records efficiently</p>
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
                            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-teal-500 transition-colors">Register Student</h2>
                            <p className="text-gray-600">Add new students to the system</p>
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
                            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-500 transition-colors">Update Students</h2>
                            <p className="text-gray-600">Modify existing student records</p>
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
                            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-red-500 transition-colors">Delete Student</h2>
                            <p className="text-gray-600">Remove students from the system</p>
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
                        <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                        <div className="p-6 pl-8">
                            <div className="p-3 bg-purple-50 rounded-full w-14 h-14 flex items-center justify-center mb-5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-500 transition-colors">View Students</h2>
                            <p className="text-gray-600">Browse all student information</p>
                            <div className="mt-4 flex justify-end">
                                <div className="bg-purple-50 text-purple-500 rounded-full p-2 group-hover:bg-purple-500 group-hover:text-white transition-all">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Quick Stats Section */}
                <div className="mt-12 bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">Student Quick Statistics</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="p-4 bg-blue-50 rounded-lg flex items-center">
                            <div className="bg-blue-500 rounded-full p-3 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-blue-500 font-medium">Total Students</p>
                                <p className="text-2xl font-bold text-gray-800">324</p>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg flex items-center">
                            <div className="bg-green-500 rounded-full p-3 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-green-500 font-medium">Active Students</p>
                                <p className="text-2xl font-bold text-gray-800">287</p>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-yellow-50 rounded-lg flex items-center">
                            <div className="bg-yellow-500 rounded-full p-3 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-yellow-500 font-medium">Recent Registrations</p>
                                <p className="text-2xl font-bold text-gray-800">18</p>
                            </div>
                        </div>
                        
                        <div className="p-4 bg-purple-50 rounded-lg flex items-center">
                            <div className="bg-purple-500 rounded-full p-3 mr-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-purple-500 font-medium">Classes</p>
                                <p className="text-2xl font-bold text-gray-800">42</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;