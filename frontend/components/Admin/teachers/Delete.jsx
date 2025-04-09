"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [teacherID, setTeacherID] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toTeacherDashboard = () => {
    router.push("/admin/teachers");
  };

  const deleteTeacher = async () => {
    if (!teacherID) {
      setMessage("Please enter a Teacher ID");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("No token found. Please log in.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/delete-teacher/${teacherID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "x-auth-token": token
        }
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Teacher deleted successfully!");
        router.push("/admin/teachers/teacher-delete");
      } else {
        setMessage(data.msg || "Teacher deletion failed.");
      }
    } catch (error) {
      console.error("Error during teacher deletion:", error);
      setMessage("An error occurred during deletion.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      <div className="flex justify-center mb-8">
        <div className="bg-gray-300 w-full sm:w-4/5 md:w-3/4 lg:w-1/2 text-center py-4 rounded-[35px]">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">TEACHER MANAGEMENT</h1>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center max-w-6xl gap-6 mx-auto lg:flex-row">
        <div className="flex flex-col items-center w-full gap-6 sm:w-auto">
          <div className="bg-teal-500 w-full sm:w-[350px] h-[180px] sm:h-[200px] rounded-[45px] flex items-center justify-center text-white text-center p-5 transition-all hover:bg-teal-600">
            <div className="flex flex-col leading-none">
              <p className="text-3xl mb-3 sm:text-[40px] font-semibold">DELETE</p>
              <p className="text-4xl sm:text-[60px] font-bold">TEACHER</p>
            </div>
          </div>

          <button
            onClick={toTeacherDashboard}
            className="bg-red-500 w-full sm:w-[350px] py-3 sm:py-4 rounded-[30px] text-white font-bold text-3xl sm:text-[50px] hover:bg-red-600 transition-colors"
          >
            BACK
          </button>
        </div>

        <div className="bg-gray-400 w-full sm:w-[400px] p-6 sm:p-8 rounded-[40px] flex flex-col justify-center gap-4 m-5 min-h-[300px]">
          <div className="space-y-4">
            <label className="block text-base font-bold text-white sm:text-lg">
              Teacher ID
            </label>
            <input
              type="text"
              value={teacherID}
              onChange={(e) => setTeacherID(e.target.value)}
              placeholder="Enter Teacher ID"
              className="w-full p-2 sm:p-3 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500 outline-none placeholder-gray-400"
            />
          </div>

          <button
            onClick={deleteTeacher}
            disabled={isLoading}
            className={`bg-red-500 w-full py-2 sm:py-3 mt-4 rounded-[30px] text-white font-bold text-base sm:text-lg hover:bg-red-600 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading ? 'Deleting...' : 'DELETE TEACHER'}
          </button>

          {message && (
            <div className={`text-center p-3 rounded-lg font-medium ${
              message.includes('successfully') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;