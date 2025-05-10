'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AllClasses = () => {
  const [classes, setClasses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://nethu-education-institute-management.onrender.com/api/classes');
        const data = await response.json();
        setClasses(data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setIsLoading(false);
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

  const filteredClasses = classes.filter((classItem) => {
    return (
      classItem.classid.toString().includes(searchTerm) ||
      classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.grade.toString().includes(searchTerm) ||
      classItem.year.toString().includes(searchTerm)
    );
  });

  // Generate a random color based on subject for the class cards
  const getSubjectColor = (subject) => {
    const colors = [
      'bg-blue-100 border-blue-300', 
      'bg-green-100 border-green-300',
      'bg-purple-100 border-purple-300', 
      'bg-amber-100 border-amber-300',
      'bg-rose-100 border-rose-300',
      'bg-cyan-100 border-cyan-300'
    ];
    
    const hash = subject.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + acc;
    }, 0);
    
    return colors[hash % colors.length];
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Classes Payment
        </h1>
        <div className="w-full md:w-64">
          <div className="relative">
            <input
              type="text"
              placeholder="Search classes..."
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:ring-2 focus:ring-orange-400 focus:border-orange-300 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <>
          {/* Desktop View - Table */}
          <div className="hidden md:block">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {column.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y text-center divide-gray-200">
                  {filteredClasses.length > 0 ? (
                    filteredClasses.map((classItem, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleRowClick(classItem.classid)}
                      >
                        {columns.map((column) => (
                          <td
                            key={`${index}-${column.key}`}
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {column.key === 'subject' ? (
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSubjectColor(classItem[column.key])}`}>
                                {classItem[column.key]}
                              </span>
                            ) : column.key === 'grade' ? (
                              `Grade ${classItem[column.key]}`
                            ) : (
                              classItem[column.key]
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                        No classes found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile View - Cards */}
          <div className="md:hidden space-y-4">
            {filteredClasses.length > 0 ? (
              filteredClasses.map((classItem, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleRowClick(classItem.classid)}
                >
                  <div className={`h-2 ${getSubjectColor(classItem.subject)}`}></div>
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Class ID</p>
                        <p className="font-semibold">{classItem.classid}</p>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubjectColor(classItem.subject)}`}>
                        {classItem.subject}
                      </span>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Teacher</p>
                        <p className="text-gray-900">{classItem.teacher}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Grade</p>
                        <p className="text-gray-900">Grade {classItem.grade}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Year</p>
                        <p className="text-gray-900">{classItem.year}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 px-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-500">No classes found matching your search.</p>
              </div>
            )}
          </div>
        </>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        {filteredClasses.length > 0 && (
          <p>{filteredClasses.length} classes found</p>
        )}
      </div>
    </div>
  );
};

export default AllClasses;