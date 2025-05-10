'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const EnrolledStudents = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [classId, setClassId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();

    useEffect(() => {
        const classIdFromURL = new URLSearchParams(window.location.search).get('classid');
        if (classIdFromURL) {
            setClassId(classIdFromURL);
        }
    }, []);

    useEffect(() => {
        if (!classId) return;
        
        const fetchEnrolledStudents = async () => {
            try {
                const response = await fetch(`https://nethu-education-institute-management.onrender.com/api/class/${classId}/students`);
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                const studentsWithNames = await Promise.all(data.students.map(async (studentId) => {
                    const nameResponse = await fetch(`https://nethu-education-institute-management.onrender.com/api/user/name/${studentId}`);
                    if (!nameResponse.ok) {
                        throw new Error(`Failed to fetch name for student ${studentId}`);
                    }
                    const nameData = await nameResponse.json();
                    return { studentId, name: nameData.name };
                }));
                setStudents(studentsWithNames);
                setFilteredStudents(studentsWithNames);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, [classId]);

    useEffect(() => {
        if (searchQuery) {
            setFilteredStudents(students.filter(student => 
                student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.name.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredStudents(students);
        }
    }, [searchQuery, students]);

    const handleRowClick = (studentId) => {
        router.push(`/admin/payments/studentPaymentDetails?classid=${classId}&studentid=${studentId}`);
    };

    // Generate a random color based on studentId for student IDs
    const getRandomTextColor = (studentId) => {
        const textColors = [
            'text-blue-600', 
            'text-green-600',
            'text-purple-600', 
            'text-amber-600',
            'text-rose-600',
            'text-cyan-600',
            'text-emerald-600',
            'text-indigo-600',
            'text-orange-600',
            'text-pink-600'
        ];
        
        // Use studentId to generate a consistent but random color
        const hash = studentId.toString().split('').reduce((acc, char) => {
            return char.charCodeAt(0) + acc;
        }, 0);
        
        return textColors[hash % textColors.length];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 max-w-7xl mx-auto">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-700">
                                Error: {error}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
                    Enrolled Students
                </h1>
                <div className="w-full md:w-64">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search students..."
                            className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-orange-300 outline-none transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg
                            className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Desktop View - Table */}
            <div className="hidden md:block">
                <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-center text-lg font-semibold text-gray-700 uppercase tracking-wider">#</th>
                                <th className="px-6 py-3 text-center text-lg font-semibold text-gray-700 uppercase tracking-wider">Student ID</th>
                                <th className="px-6 py-3 text-center text-lg font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.length > 0 ? (
                                filteredStudents.map((student, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={() => handleRowClick(student.studentId)}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span className={`font-medium ${getRandomTextColor(student.studentId)}`}>
                                                {student.studentId}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center">
                                            {student.name}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                        No students found matching your search.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile View - Cards */}
            <div className="md:hidden space-y-4">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => handleRowClick(student.studentId)}
                        >
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-medium text-gray-500 bg-gray-100 rounded-full px-2 py-1">
                                        #{index + 1}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Student ID</p>
                                        <p className={`font-semibold ${getRandomTextColor(student.studentId)}`}>
                                            {student.studentId}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Name</p>
                                        <p className="text-gray-900">{student.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        <p className="text-gray-500">No students found matching your search.</p>
                    </div>
                )}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                {filteredStudents.length > 0 && (
                    <p>{filteredStudents.length} {filteredStudents.length === 1 ? 'student' : 'students'} found</p>
                )}
            </div>
        </div>
    );
};

export default EnrolledStudents;