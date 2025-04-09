'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AllClasses = () => {
    const [classes, setClasses] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/classes');
                const data = await response.json();
                setClasses(data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const columns = [
        { key: 'classid', label: 'Class ID' },
        { key: 'teacher', label: 'Teacher' },
        { key: 'grade', label: 'Grade' },
        { key: 'year', label: 'Year' },
        { key: 'subject', label: 'Subject' },
    ];

    const handleRowClick = (classid) => {
        router.push(`/admin/payments/enrolledStudents?classid=${classid}`);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">All Classes</h1>
            <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
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
                        {classes.map((classItem, index) => (
                            <tr
                                key={index}
                                className="hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleRowClick(classItem.classid)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={`${index}-${column.key}`}
                                        className="px-6 py-4 text-sm whitespace-nowrap text-gray-900"
                                    >
                                        {column.key === 'grade' ? `Grade ${classItem[column.key]}` : classItem[column.key]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllClasses;
