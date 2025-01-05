import React from 'react';

const SubjectDropdown = ({ uniqueSubjects, selectedSubject, setSelectedSubject }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Select Subject:</label>
      <select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        className="border border-gray-300 rounded-md p-2 w-48"
      >
        <option value="">All Subjects</option>
        {uniqueSubjects.map((subject, index) => (
          <option key={index} value={subject}>
            {subject}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubjectDropdown;
