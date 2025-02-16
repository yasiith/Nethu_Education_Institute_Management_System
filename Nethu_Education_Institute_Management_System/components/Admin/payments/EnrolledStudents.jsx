'use client';
import React, { useState, useEffect } from 'react';

const EnrolledStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [classId, setClassId] = useState(null);

    useEffect(() => {
        const classIdFromURL = new URLSearchParams(window.location.search).get('classid');
        if (classIdFromURL) {
            setClassId(classIdFromURL);
        }
    }, []);

    useEffect(() => {
        if (!classId) return; // Don't fetch until classId is set
        
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
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledStudents();
    }, [classId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const columns = [
        { key: 'rowNumber', label: '' },
        { key: 'studentId', label: 'Student ID' },
        { key: 'studentName', label: 'Name' }
    ];

    return (
        <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-4">Enrolled Students</h1>
            <table className="w-full border-collapse min-w-full divide-y divide-gray-200">
                <thead>
                    <tr className="bg-gray-50">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className="px-6 py-3 text-left text-sm font-semibold text-gray-900"
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {students.length > 0 ? (
                        students.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{index + 1}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{student.studentId}</td>
                                <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">{student.name}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-sm text-center text-gray-500">
                                No students enrolled in this class
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default EnrolledStudents;
