"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const teachersData = [
  { id: "1", fullName: "John Doe", email: "john@gmail.com" },
];

const Update = () => {
  const router = useRouter();
  const toTeacherDashboard = () => {
    router.push("/admin/teachers");
  };
  const [teacherID, setTeacherID] = useState("");
  const [fullName, setFullName] = useState("");
  const [newFullName, setNewFullName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [email, setEmail] = useState("");

  const handleFindTeacher = () => {
    const teacher = teachersData.find((teacher) => teacher.id === teacherID);
    if (teacher) {
      setFullName(teacher.fullName);
      setEmail(teacher.email);
    } else {
      alert("Teacher not found");
    }
  };

  const handleUpdateTeacher = () => {
    if (newFullName && newEmail) {
      const teacherIndex = teachersData.findIndex(
        (teacher) => teacher.id === teacherID
      );

      if (teacherIndex !== -1) {
        teachersData[teacherIndex].fullName = newFullName;
        teachersData[teacherIndex].email = newEmail;

        setNewFullName("");
        setNewEmail("");

        setFullName(newFullName);
        setEmail(newEmail);

        alert("Teacher updated successfully!");
      } else {
        alert("Teacher not found");
      }
    } else {
      alert("Please enter the new full name and email.");
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen px-4 py-6 bg-gray-100 sm:px-8">
      <div className="bg-gray-300 w-full max-w-4xl mb-6 p-6 flex flex-col items-center rounded-[35px]">
        <h1 className="text-2xl font-bold text-center sm:text-4xl">TEACHER MANAGEMENT</h1>
      </div>

      <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-8 lg:flex-row">
        {/* Left Section */}
        <div className="flex flex-col items-center gap-6">
          <div className="bg-teal-500 w-full sm:w-[400px] h-[300px] rounded-[35px] 
                           flex items-center justify-center hover:bg-teal-600 transition-colors">
                <div className="flex flex-col text-center text-white">
                  <p className="text-4xl sm:text-[50px] font-semibold">UPDATE</p>
                  <p className="text-5xl sm:text-[75px] font-bold leading-none">STUDENT</p>
                </div>
              </div>
          <button
            onClick={toTeacherDashboard}
            className="bg-red-500 w-full max-w-md py-3 text-white font-bold text-lg sm:text-2xl rounded-[30px] hover:bg-red-600 transition-colors"
          >
            BACK
          </button>
        </div>

        {/* Right Section */}
        <div className="bg-gray-400 w-full max-w-md p-6 rounded-[40px] flex flex-col gap-4">
          <label className="text-lg font-bold text-white">Enter Teacher ID</label>
          <input
            type="text"
            value={teacherID}
            onChange={(e) => setTeacherID(e.target.value)}
            placeholder="Teacher ID"
            className="w-full p-3 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />
          <button
            onClick={handleFindTeacher}
            className="bg-red-500 w-full py-3 rounded-[30px] text-white font-bold text-lg hover:bg-red-600 transition-colors"
          >
            SEARCH
          </button>

          <label className="text-lg font-bold text-white">Full Name</label>
          <input
            type="text"
            value={fullName}
            readOnly
            placeholder="Full Name"
            className="w-full p-3 rounded-[30px] bg-gray-100"
          />

          <label className="text-lg font-bold text-white">Email</label>
          <input
            type="email"
            value={email}
            readOnly
            placeholder="Email"
            className="w-full p-3 rounded-[30px] bg-gray-100"
          />

          <label className="text-lg font-bold text-white">New Full Name</label>
          <input
            type="text"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            placeholder="New Full Name"
            className="w-full p-3 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <label className="text-lg font-bold text-white">New Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New Email"
            className="w-full p-3 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            onClick={handleUpdateTeacher}
            className="bg-red-500 w-full py-3 rounded-[30px] text-white font-bold text-lg hover:bg-red-600 transition-colors"
          >
            UPDATE TEACHER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
