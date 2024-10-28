"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import CreateForm from "./gradeCreateForm"; // Make sure this path is correct

const Dashboard = () => {
  const [grades, setGrades] = useState([]); // To store grades
  const [showGradeCreateForm, setShowGradeCreateForm] = useState(false); // State to control visibility
  const teacherName = "Teacher Name"; // Replace with dynamic data if needed

  // For rendering classes dynamically - yasith
  const router = useRouter();
  const [classes, setClasses] = useState([]);

  // Fetch classes on component mount - yasith
  useEffect(() => {
    async function fetchClasses() {
      const response = await fetch('/api/teacher/classes');
      const data = await response.json();
      setClasses(data);
    }

    fetchClasses();
  },[]);

  const handleClassClick = (classId) => {
    router.push(`/teachers/classes/${classId}`);
  }

  // Handle adding a new grade
  const handleAddGrade = (newGrade) => {
    if (newGrade.trim() !== "") {
      setGrades([...grades, newGrade]);
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
      <div className="flex flex-col-3 flex-wrap justify-center gap-4 mt-10">
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
            onClick={() => setShowGradeCreateForm(true)} // Correctly set the visibility
          >
            +
          </button>
        )}
        {/* Rendering Classes dynamically -yasith */}
        <div>
          {classes.map((classItem) => (
            <div
              key={classItem.id}
              onClick={() => handleClassClick(classItem.id)}
            >
              <h2>{classItem.name}</h2>
              <p>{classItem.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* "Create a Grade" Button */}
      <div className="mt-10 mb-3 w-full flex justify-center">
        <button
          className="w-[1000px] h-[100px] bg-[#dadada] text-[#616060] font-bold rounded-[30px] text-4xl hover:bg-gray-300 hover:text-black"
          onClick={() => setShowGradeCreateForm(true)} // Correctly set the visibility
        >
          CREATE A GRADE +
        </button>
      </div>

      {/* Additional Component (conditionally rendered) */}
      {showGradeCreateForm && (
        <div className="mt-5 w-full flex justify-center">
          <CreateForm onClose={() => setShowGradeCreateForm(false)} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
