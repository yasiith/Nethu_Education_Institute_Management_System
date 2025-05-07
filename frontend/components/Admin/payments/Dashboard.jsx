'use client';
import React, { useState } from 'react';

const DataTable = ({ data = sampleData, columns = sampleColumns }) => {
  const [filters, setFilters] = useState({
    grade: '',
    subject: '',
    month: ''
  });

  // Get unique values for filter dropdowns
  const uniqueGrades = [...new Set(data.map(item => item.grade))].sort();
  const uniqueSubjects = [...new Set(data.map(item => item.subject))].sort();
  const uniqueMonths = [...new Set(data.map(item => item.month))].sort();

  // Filter data based on selected filters
  const filteredData = data.filter(item => {
    return (
      (!filters.grade || item.grade === filters.grade) &&
      (!filters.subject || item.subject === filters.subject) &&
      (!filters.month || item.month === filters.month)
    );
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const resetFilters = () => {
    setFilters({
      grade: '',
      subject: '',
      month: ''
    });
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'overdue':
        return 'text-red-600';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <div className="w-full space-y-4">
      {/* Filter controls */}
      <div className="flex flex-wrap gap-4 p-4 bg-gray-50 rounded-lg">
        <select 
          value={filters.grade}
          onChange={(e) => handleFilterChange('grade', e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="">All Grades</option>
          {uniqueGrades.map(grade => (
            <option key={grade} value={grade}>Grade {grade}</option>
          ))}
        </select>

        <select 
          value={filters.subject}
          onChange={(e) => handleFilterChange('subject', e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="">All Subjects</option>
          {uniqueSubjects.map(subject => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>

        <select 
          value={filters.month}
          onChange={(e) => handleFilterChange('month', e.target.value)}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="">All Months</option>
          {uniqueMonths.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>

        <button
          onClick={resetFilters}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm hover:bg-gray-300"
        >
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 ">
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
            {filteredData.map((row, rowIndex) => (
              <tr 
                key={rowIndex}
                className="hover:bg-gray-50"
              >
                {columns.map((column) => (
                  <td
                    key={`${rowIndex}-${column.key}`}
                    className={`px-6 py-4 text-sm whitespace-nowrap ${
                      column.key === 'paymentStatus' ? getStatusColor(row[column.key]) : 'text-gray-900'
                    }`}
                  >
                    {column.key === 'grade' ? `Grade ${row[column.key]}` : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* No results message */}
      {filteredData.length === 0 && (
        <div className="text-center py-4 text-gray-500">
          No students match the selected filters
        </div>
      )}
    </div>
  );
};

export default DataTable;