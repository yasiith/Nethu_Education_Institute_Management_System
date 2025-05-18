"use client";

import React, { useState } from "react";
import { ChevronDown, Calendar, BookOpen, Users, DollarSign, FileText, Layers } from "lucide-react";

const CreateForm = ({ onClose, onSuccess }) => {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [classPrivacy, setClassPrivacy] = useState("");
  const [defaultMonthlyFee, setDefaultMonthlyFee] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");

  const teacherID = localStorage.getItem("TeacherID");

  const handleCreate = async () => {
    if (!teacherID) {
      alert("TeacherID not found. Please log in again.");
      return;
    }

    // Validate that all required fields are filled out
    if (!grade || !subject || !date || !classPrivacy || !defaultMonthlyFee || !year) {
      setError("Please fill out all required fields.");
      return;
    }

    const classData = {
      grade,
      subject,
      date,
      description,
      privacy: classPrivacy,
      teacherID,
      defaultMonthlyFee: parseFloat(defaultMonthlyFee) || 0,
      year,
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
        setYear("");
        setError("");
      } else {
        setError(data.message || "Error creating class");
      }
    } catch (error) {
      console.error("Error creating class:", error);
      setError("Error creating class: " + error.message);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-teal-700 mb-8 text-center">Create New Class</h2>
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Grade Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Grade Level</label>
          <div className="relative">
            <Layers className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter grade level"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>
        
        {/* Year Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Academic Year</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
            <input
              type="text"
              placeholder="e.g. 2024-2025"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>
        
        {/* Subject Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Subject</label>
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
            <input
              type="text"
              placeholder="Enter subject name"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Date Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Start Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>

        {/* Class Privacy Dropdown */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Class Privacy</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
            <select
              value={classPrivacy}
              onChange={(e) => setClassPrivacy(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            >
              <option value="">Select Privacy</option>
              <option value="Public">Public</option>
              <option value="Private">Private</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          </div>
        </div>
        
        {/* Default Monthly Fee Input */}
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Monthly Fee</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-teal-600 h-5 w-5" />
            <input
              type="number"
              placeholder="Enter default monthly fee"
              value={defaultMonthlyFee}
              onChange={(e) => setDefaultMonthlyFee(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>
      </div>

      {/* Description Input */}
      <div className="flex flex-col mt-6">
        <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
        <div className="relative">
          <FileText className="absolute left-3 top-3 text-teal-600 h-5 w-5" />
          <textarea
            placeholder="Enter class description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-50 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end mt-8 space-x-4">
        <button
          onClick={onClose}
          className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white font-medium rounded-lg hover:from-green-600 hover:to-teal-700 transition shadow-md"
        >
          Create Class
        </button>
      </div>
    </div>
  );
};

export default CreateForm;