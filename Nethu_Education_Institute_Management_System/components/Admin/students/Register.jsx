"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [StudentID, setStudentID] = useState("");

  const toStudentDashboard = () => {
    router.push("/admin/students");
  };

  function handleStudentRegistration(e) {
    e.preventDefault();
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    fetch("http://localhost:5000/api/auth/create-student", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        name,
        email,
        StudentID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          alert("Student registered successfully!");
          router.push("/admin/students/student-register");
        } else {
          alert("Student registration failed. User may already exist.");
        }
      })
      .catch((error) => {
        console.error("Error during student registration:", error);
        alert("An error occurred during registration.");
      });
  }

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      {/* Header */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-300 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 text-center py-4 rounded-[35px]">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">STUDENT MANAGEMENT</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center gap-6 mx-auto lg:flex-row max-w-7xl">
        {/* Left Section */}
        <div className="flex flex-col items-center w-full gap-6 sm:w-auto">
          {/* Register Box */}
          <div className="bg-teal-500 w-full sm:w-[350px] h-[250px] sm:h-[300px] rounded-[45px] flex items-center justify-center text-white text-center p-5 transition-all">
            <div className="flex flex-col leading-none">
              <p className="text-3xl sm:text-[40px] font-semibold">REGISTER</p>
              <p className="text-4xl sm:text-[60px] font-bold">STUDENT</p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={toStudentDashboard}
            className="bg-red-500 w-full sm:w-[350px] py-4 rounded-[30px] text-white font-bold text-3xl sm:text-[50px] hover:bg-red-600 transition-colors"
          >
            BACK
          </button>
        </div>

        {/* Right Section - Form */}
        <div className="bg-gray-400 w-full sm:w-[400px] p-6 sm:p-8 rounded-[40px] flex flex-col gap-4">
          {/* Form Fields */}
          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-white sm:text-lg">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-white sm:text-lg">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-base font-bold text-white sm:text-lg">
                Student ID
              </label>
              <input
                type="text"
                placeholder="Student ID"
                value={StudentID}
                onChange={(e) => setStudentID(e.target.value)}
                className="w-full p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500 outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleStudentRegistration}
            className="bg-red-500 w-full py-3 mt-4 rounded-[30px] text-white font-bold text-lg hover:bg-red-600 transition-colors"
          >
            ADD STUDENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;