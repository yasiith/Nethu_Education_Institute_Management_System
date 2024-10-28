"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CreateForm = () => {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [classPrivacy, setClassPrivacy] = useState("");

  const teacherID = localStorage.getItem('TeacherID');

  const handleCreate = async () => {
    // Check if TeacherID exists
    if (!teacherID) {
      alert("TeacherID not found. Please log in again.");
      return;
    }

    const classData = {
      grade,
      subject,
      date,
      description,
      privacy: classPrivacy,
      teacherID: teacherID, // Use the variable from localStorage
    };

    try {
      const response = await fetch("http://localhost:5000/api/classes/createclass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(classData),
      });

      const data = await response.json();
      if (data.status === "ok") {
        alert("Class created successfully");
      }
      if (!response.ok) {
        throw new Error(data.msg || "Error creating class");
      }

      console.log(data.msg); // Class created successfully
      // Optionally, reset the form
      setGrade("");
      setSubject("");
      setDate("");
      setDescription("");
      setClassPrivacy("");
    } catch (error) {
      console.error("Error creating class:", error);
      alert("Error creating class: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center pt-10">
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

      {/* Title Input */}
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

      <div className="flex flex-col mt-4 mb-4 ml-[790px] w-[200px]">
        {/* Create Button */}
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
