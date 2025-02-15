'use client';
import { useState } from "react";

const StudentFilter = ({ onUpdate }) => {
  const [filters, setFilters] = useState({
    studentID: "",
    grade: "",
    subject: "",
    month: "",
    paymentStatus: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col md:flex-row gap-4 items-center">
      <select
        name="studentID"
        value={filters.studentID}
        onChange={handleChange}
        className="p-2 border rounded-md"
      >
        <option value="">Select Student ID</option>
        <option value="Grade 1"> 01</option>
        <option value="Grade 2"> 02</option>
        <option value="Grade 3"> 03</option>
      </select>
      {/* Grade Dropdown */}
      <select
        name="grade"
        value={filters.grade}
        onChange={handleChange}
        className="p-2 border rounded-md"
      >
        <option value="">Select Grade</option>
        <option value="Grade 1">Grade 1</option>
        <option value="Grade 2">Grade 2</option>
        <option value="Grade 3">Grade 3</option>
      </select>

      {/* Subject Dropdown */}
      <select
        name="subject"
        value={filters.subject}
        onChange={handleChange}
        className="p-2 border rounded-md"
      >
        <option value="">Select Subject</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="English">English</option>
      </select>

      <select
        name="month"
        value={filters.month}
        onChange={handleChange}
        className="p-2 border rounded-md"
      >
        <option value="">Select Month</option>
        <option value="Math">Math</option>
        <option value="Science">Science</option>
        <option value="English">English</option>
      </select>

      {/* Payment Status Dropdown */}
      <select
        name="paymentStatus"
        value={filters.paymentStatus}
        onChange={handleChange}
        className="p-2 border rounded-md"
      >
        <option value="">Select Payment Status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
        <option value="Overdue">Overdue</option>
      </select>

      {/* Update Button */}
      <button
        onClick={() => onUpdate(filters)}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Update
      </button>
    </div>
  );
};

export default StudentFilter;
