import React from 'react';

const GradeDropdown = ({ uniqueGrades, selectedGrade, setSelectedGrade }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Select Grade:</label>
      <select
        value={selectedGrade}
        onChange={(e) => setSelectedGrade(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-48"
      >
        <option value="">All Grades</option>
        {uniqueGrades.map((grade, index) => (
          <option key={index} value={grade}>
            {grade}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GradeDropdown;
