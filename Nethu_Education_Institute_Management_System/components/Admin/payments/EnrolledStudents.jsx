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
                const response = await fetch(`http://localhost:5000/api/class/${classId}/students`);
                if (!response.ok) {
                    throw new Error('Failed to fetch students');
                }
                const data = await response.json();
                const studentsWithNames = await Promise.all(data.students.map(async (studentId) => {
                    const nameResponse = await fetch(`http://localhost:5000/api/user/name/${studentId}`);
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
                student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
            ));
        } else {
            setFilteredStudents(students);
        }
    }, [searchQuery, students]);

    const handleRowClick = (studentId) => {
        router.push(`/admin/payments/studentPaymentDetails?classid=${classId}&studentid=${studentId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200 p-4">
            <h1 className="text-2xl font-bold mb-4">Enrolled Students</h1>
            <input
                type="text"
                placeholder="Search by Student ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mb-4 px-4 py-2 border rounded w-full"
            />
            <table className="w-full border-collapse min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">#</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Student ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Name</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.length > 0 ? (
                        filteredStudents.map((student, index) => (
                            <tr 
                                key={index} 
                                className="hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleRowClick(student.studentId)}
                            >
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{student.studentId}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{student.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-sm text-center text-gray-500">
                                No students found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledStudents;
