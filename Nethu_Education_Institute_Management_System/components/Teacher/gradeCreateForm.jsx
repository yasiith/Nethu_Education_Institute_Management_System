"use client";

import React, { useState } from "react";

const CreateForm = () => {
  const [grade, setGrade] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const handleCreate = () => {
    // Handle form submission logic here
    alert(`Grade: ${grade}, Title: ${title}, Date: ${date}`);
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
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          placeholder="TITLE"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-center text-3xl h-[100px] text-[#616060] font-bold p-5 rounded-[30px] bg-gray-200"
        />
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
