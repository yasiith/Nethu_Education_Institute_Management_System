"use client";

import React, { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const CreateForm = () => {
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [classPrivacy, setClassPrivacy] = useState("");

  const handleCreate = () => {
    // Handle form submission logic here
    alert(
      `Grade: ${grade}, Subject: ${subject}, Date: ${date}, Description: ${description}, Class Privacy: ${classPrivacy}`
    );
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
          placeholder="DATE"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200"
        />
      </div>
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
          className="appearance-none w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200 pr-10" // Added pr-10 for padding
        >
          <option value="Public">Public</option>
          <option value="Private">Private</option>
        </select>
        <FaChevronDown className="absolute right-5 top-1/2 transform -translate-y-1/2 text-[#616060]" />
      </div>
      <div className="flex flex-col mt-4 mb-4 ml-[790px] w-[200px]">
        {/* Create Button */}
        <button
          onClick={handleCreate}
          className=" bg-teal-400 text-white font-bold text-lg py-3 px-10 rounded-full hover:bg-teal-500"
        >
          CREATE
        </button>
      </div>
    </div>
  );
};

export default CreateForm;
