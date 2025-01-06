"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();

  const toTeacherDashboard = () => {
    router.push("/admin/teachers");
  };

  const [teacherID, setTeacherID] = useState("");
  const [message, setMessage] = useState("");

  const deleteTeacher = async () => {
    if (!teacherID) {
      setMessage("Please enter a Teacher ID.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/delete-teacher/${teacherID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Teacher deleted successfully!");
        router.push("/admin/teachers/teacher-delete"); // Redirect after deletion success
      } else {
        setMessage(data.msg || "Teacher deletion failed.");
      }
    } catch (error) {
      console.error("Error during teacher deletion:", error);
      setMessage("An error occurred during deletion.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-gray-300 w-1/2 text-center py-4 rounded-[35px] mt-5">
        <h1 className="text-4xl font-bold">TEACHER MANAGEMENT</h1>
      </div>

      <div className="flex flex-col items-center justify-center max-w-4xl gap-6 md:flex-row">
        <div className="flex flex-col items-center gap-6">
          <div className="bg-teal-500 w-[350px] h-[200px] rounded-[45px] flex items-center justify-center text-white text-center p-5">
            <div className="flex flex-col leading-none">
              <p className="text-[40px] font-semibold">DELETE</p>
              <p className="text-[60px] font-bold">TEACHER</p>
            </div>
          </div>
          <button
            onClick={toTeacherDashboard}
            className="bg-red-500 w-[350px] h-[70px] rounded-[30px] text-white font-bold text-[50px]"
          >
            BACK
          </button>
        </div>

        <div className="bg-gray-400 w-[400px] p-8 rounded-[40px] flex flex-col justify-center gap-4 m-5 h-[300px]">
          <label className="text-lg font-bold text-white">Teacher ID</label>
          <input
            type="text"
            value={teacherID}
            onChange={(e) => setTeacherID(e.target.value)}
            placeholder="Teacher ID"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <button
            onClick={deleteTeacher}
            className="bg-red-500 w-full py-2 mt-4 rounded-[30px] text-white font-bold text-lg"
          >
            DELETE TEACHER
          </button>

          {message && (
            <p className="mt-4 font-bold text-center text-white">{message}</p>
          )}
            
          
        </div>
      </div>
    </div>
  );
};

export default Register;
