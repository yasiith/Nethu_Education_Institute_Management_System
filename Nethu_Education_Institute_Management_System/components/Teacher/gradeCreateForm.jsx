"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CreateForm = ({ onClose, onSuccess }) => {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [classPrivacy, setClassPrivacy] = useState("");
  const [defaultMonthlyFee, setDefaultMonthlyFee] = useState("");
  const [error, setError] = useState("");

  const teacherID = localStorage.getItem("TeacherID");

  const handleCreate = async () => {
    if (!teacherID) {
      alert("TeacherID not found. Please log in again.");
      return;
    }

    // Validate that all required fields are filled out
    if (!grade || !subject || !date || !classPrivacy || !defaultMonthlyFee) {
      alert("Please fill out all fields.");
      return;
    }

    const classData = {
      grade,
      subject,
      date,
      description,
      privacy: classPrivacy,
      teacherID,
      defaultMonthlyFee: parseFloat(defaultMonthlyFee) || 0, // Convert to number, default to 0
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/classes/createclass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(classData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Class created successfully");
        onSuccess();
        onClose();
        setGrade("");
        setSubject("");
        setDate("");
        setDescription("");
        setClassPrivacy("");
        setDefaultMonthlyFee("");
        setError(""); // Clear error message on success
      } else {
        alert(data.message || "Error creating class");
      }
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Error creating class: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
      {/* Error Message */}
      {error && <div className="text-red-500 mb-4">{error}</div>}

      {/* Grade Input */}
      <div className="flex flex-col mb-4 w-[1000px]">
        <input
          type="text"
          placeholder="GRADE"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          className="w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200"
        />
      </div>

      {/* Subject Input */}
      <div className="flex flex-col mb-4 w-[1000px]">
        <input
          type="text"
          placeholder="SUBJECT"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200"
        />
      </div>

      {/* Date Input */}
      <div className="flex flex-col mb-4 w-[1000px] relative">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200"
        />
      </div>

      {/* Description Input */}
      <div className="flex flex-col mb-4 w-[1000px]">
        <input
          type="text"
          placeholder="DESCRIPTION"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200"
        />
      </div>

      {/* Class Privacy Dropdown */}
      <div className="flex flex-col mb-4 w-[1000px] relative">
        <select
          value={classPrivacy}
          onChange={(e) => setClassPrivacy(e.target.value)}
          className="appearance-none w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200 pr-10"
        >
          <option value="">Select Privacy</option>
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <FaChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#616060]" />
      </div>

      {/* Default Monthly Fee Input */}
      <div className="flex flex-col mb-4 w-[1000px]">
        <input
          type="number"
          placeholder="Default Monthly Fee (You can change this later)"
          value={defaultMonthlyFee}
          onChange={(e) => setDefaultMonthlyFee(e.target.value)}
          className="w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200"
        />
      </div>

      {/* Create Button */}
      <div className="flex flex-col mt-4 mb-4 ml-[790px] w-[200px]">
        <button
          onClick={handleCreate}
          className="bg-teal-400 text-white font-bold text-lg py-3 px-10 rounded-full hover:bg-teal-500"
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
