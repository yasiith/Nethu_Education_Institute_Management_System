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

    console.log(name, email, StudentID); // Logging the inputs for debugging
    const token = localStorage.getItem("token");

  // Check if the token is retrieved successfully
  if (!token) {
    alert("No token found. Please log in.");
    return; // Stop execution if no token is found
  }
    fetch("http://localhost:5000/api/auth/create-student", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
       // "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name, // Student's name
        email, // Student's email
        StudentID, // Student ID used as the default password
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          alert("Student registered successfully!");
          // Optionally, redirect after successful registration
          router.push("/admin-dashboard"); // Adjust the route as necessary
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
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-gray-300 w-1/2 text-center py-4 rounded-[35px] mt-5">
        <h1 className="text-4xl font-bold">STUDENT MANAGEMENT</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl">
        <div className="flex flex-col gap-6 items-center ">
          <div className="bg-teal-500 w-[350px] h-[300px] rounded-[45px] flex items-center justify-center text-white text-center p-5">
            <div className="flex flex-col leading-none">
              <p className="text-[40px] font-semibold">REGISTER</p>
              <p className="text-[60px] font-bold">STUDENT</p>
            </div>
          </div>
          <button
            onClick={toStudentDashboard}
            className="bg-red-500 w-[350px] h- rounded-[30px] text-white font-bold text-[50px]"
          >
            BACK
          </button>
        </div>

        <div className="bg-gray-400 w-[400px] p-8 rounded-[40px] flex flex-col gap-4 m-5">
          <label className="text-white text-lg font-bold">Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)} // Bind to state
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <label className="text-white text-lg font-bold">Email</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Bind to state
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <label className="text-white text-lg font-bold">Student ID</label>
          <input
            type="text"
            placeholder="Student ID"
            value={StudentID}
            onChange={(e) => setStudentID(e.target.value)} // Bind to state
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            onClick={handleStudentRegistration} // Attach the registration handler
            className="bg-red-500 w-full py-2 mt-4 rounded-[30px] text-white font-bold text-lg"
          >
            ADD STUDENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
