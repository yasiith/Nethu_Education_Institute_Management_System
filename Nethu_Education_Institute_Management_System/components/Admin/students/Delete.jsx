"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
  const router = useRouter();

  const [studentID, setStudentID] = useState("");
  const [message, setMessage] = useState("");

  const toStudentDashboard = () => {
    router.push("/admin/students");
  };

  const deleteStudent = async () => {
    if (!studentID) {
      setMessage("Please enter a Student ID");
      return;
    }

    const token = localStorage.getItem("token"); // Retrieve token from localStorage
    if (!token) {
      setMessage("No token found. Please log in.");
      return; // Stop execution if no token is found
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/delete-student/${studentID}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-auth-token": token
          }
        }
      );

      const data = await res.json(); // Get the response data

      if (res.ok) {
        setMessage("Student deleted successfully!"); // Show success message
        router.push("/admin/students/student-delete"); // Adjust the route as necessary
      } else {
        setMessage(data.msg || "Student deletion failed."); // Show error message
      }
    } catch (error) {
      console.error("Error during student deletion:", error);
      setMessage("An error occurred during deletion.");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-gray-300 w-1/2 text-center py-4 rounded-[35px] mt-5 mb-5">
        <h1 className="text-4xl font-bold">STUDENT MANAGEMENT</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl">
        <div className="flex flex-col gap-6 items-center">
          <div className="bg-teal-500 w-[350px] h-[200px] rounded-[45px] flex items-center justify-center text-white text-center p-5">
            <div className="flex flex-col leading-none">
              <p className="text-[40px] font-semibold">DELETE</p>
              <p className="text-[60px] font-bold">STUDENT</p>
            </div>
          </div>
          <button
            onClick={toStudentDashboard}
            className="bg-red-500 w-[350px] h- rounded-[30px] text-white font-bold text-[50px] mb-5"
          >
            BACK
          </button>
        </div>

        <div className="bg-gray-400 w-[400px] p-8 rounded-[40px] flex flex-col justify-center gap-4 m-5 h-[300px]">
          <label className="text-white text-lg font-bold">Student ID</label>
          <input
            type="text"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            placeholder="Student ID"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            onClick={deleteStudent}
            className="bg-red-500 w-full py-2 mt-4 rounded-[30px] text-white font-bold text-lg"
          >
            DELETE STUDENT
          </button>

          {message && (
            <p className="text-white font-bold text-center mt-4">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
