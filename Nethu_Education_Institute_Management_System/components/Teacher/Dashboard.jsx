"use client";

import Link from "next/link";
import React, { useState } from "react";

const Dashboard = () => {
  const [grades, setGrades] = useState([]); // To store grades
  const [showForm, setShowForm] = useState(false);
  const [newGrade, setNewGrade] = useState("");

  const teacherName = "Teacher Name"; // Replace with dynamic data if needed

  // Handle adding a new grade
  const handleAddGrade = () => {
    if (newGrade.trim() !== "") {
      setGrades([...grades, newGrade]);
      setNewGrade("");
      setShowForm(false);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      {/* Welcome Message */}
      <div className="w-[1000px] h-[100px] bg-[#d9d9d9] text-center rounded-[30px] flex items-center justify-center">
        <h2 className="text-4xl font-bold">
          WELCOME, {teacherName.toUpperCase()}
        </h2>
      </div>

      {/* Grade Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mt-10">
        {grades.length > 0 ? (
          grades.map((grade, index) => (
            <button
              key={index}
              className="w-[397px] h-[137px] bg-teal-400 text-white font-bold rounded-[53px] text-xl flex items-center justify-center"
              onClick={() => alert(`Navigating to ${grade}`)} // Replace with navigation logic
            >
              {grade.toUpperCase()}
            </button>
          ))
        ) : (
          <button
            className="w-[397px] h-[137px] bg-teal-400 text-white font-bold rounded-[53px] text-3xl flex items-center justify-center"
            onClick={() => setShowForm(true)}
          >
            +
          </button>
        )}
      </div>

      {/* "Create a Grade" Button */}
      <div className="mt-10 mb-3 w-full flex justify-center">
        <button
          href="./gradeCreateForm.jsx"
          className="w-[1000px] h-[100px] bg-[#dadada] text-[#616060] font-bold rounded-[30px] text-4xl hover:bg-gray-300 hover:text-black"
          onClick={() => setShowForm(true)}
        >
          CREATE A GRADE +
        </button>
      </div>

      {/* Add Grade Form */}
      {showForm && (
        <div className="mt-10 p-5 bg-white border rounded-lg shadow-md w-full max-w-md">
          <h3 className="text-lg font-bold mb-4">Add a New Grade</h3>
          <input
            type="text"
            placeholder="Enter Grade Name"
            value={newGrade}
            onChange={(e) => setNewGrade(e.target.value)}
            className="w-full p-2 mb-4 border rounded-md"
          />
          <div className="flex justify-end gap-4">
            <button
              className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              className="bg-green-500 text-white font-bold py-2 px-4 rounded-md"
              onClick={handleAddGrade}
            >
              Add Grade
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
