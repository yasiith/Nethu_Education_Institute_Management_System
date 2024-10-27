"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Update = () => {
    const router = useRouter();
    const toStudentDashboard = () => {
        router.push('/admin/students');
    };

    const [studentID, setStudentID] = useState('');
    const [FullName, setFullName] = useState('');
    const [Email, setEmail] = useState('');
    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [message, setMessage] = useState(''); // Added message state

    const handleFindStudent = async () => {
      if (!studentID) {
        setMessage("Please enter a Student ID");
        return;
      }
      try {
        const res = await fetch(`http://localhost:5000/api/auth/getstudentinfo/${studentID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //"x-auth-token": token, // Ensure you have a token if required
          },
        });

        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setFullName(data.data.name);
          setEmail(data.data.email);
          setMessage("Student information retrieved successfully.");
        } else {
          setMessage(data.error || "Student not found.");
        }
      } catch (error) {
        console.error("Error fetching student information:", error);
        setMessage("An error occurred while retrieving the student information.");
      }
    };

    const handleUpdateStudent = async () => {
      if (!newFullName || !newEmail) {
        setMessage("Please enter the new full name and email.");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5000/api/auth/updatestudent/${studentID}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            //"x-auth-token": token, // Add token if required
          },

          body: JSON.stringify({ name: newFullName, email: newEmail }),
        });

        const data = await res.json();
        console.log(data);


        if (res.ok) {
           setFullName(data.data.name);
           setEmail(data.data.email);
           setNewFullName("");
           setNewEmail("");
          setMessage("Student updated successfully!");
        } else {
          setMessage(data.error || "Failed to update student.");
        }
      } catch (error) {
        console.error("Error updating student information:", error);
        setMessage("An error occurred while updating the student information.");
      }
    };

    return (
      <div className='flex flex-col items-center'>
        <div className='bg-gray-300 w-1/2 m-5 flex flex-col items-center rounded-[35px] p-5'>
          <h1 className='text-4xl font-bold'>STUDENT MANAGEMENT</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl">
          <div className='flex flex-col gap-6 items-center pb-10'>
            <div className='bg-teal-500 rounded-[35px] flex items-center w-[400px] h-[350px] justify-center'>
              <div className='flex flex-col text-white m-5'>
                <p className='text-[50px] font-semibold'>UPDATE</p>
                <p className='text-[75px] font-bold leading-none'>STUDENT</p>
              </div>
            </div>
            <button 
              onClick={toStudentDashboard}
              className='bg-red-500 w-[400px] h-[90px] rounded-[30px] text-white font-bold text-[50px]'>
              BACK
            </button>
          </div>
          <div className="bg-gray-400 w-[400px] p-8 rounded-[40px] flex flex-col gap-4 m-5">
            <label className="text-white text-lg font-bold">Enter Student ID</label>
            <input
              type="text"
              value={studentID}
              onChange={(e) => setStudentID(e.target.value)}
              placeholder="Student ID"
              className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
            />
            <button 
              onClick={handleFindStudent}
              className="bg-red-500 w-full py-2 rounded-[30px] text-white font-bold text-lg">
              SEARCH
            </button>

            <label className="text-white text-lg font-bold">Full Name</label>
            <input
              type="text"
              value={FullName}
              readOnly
              placeholder="Full Name"
              className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
            />

            <label className="text-white text-lg font-bold">Email</label>
            <input
              type="email"
              value={Email}
              readOnly
              placeholder="Email"
              className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
            />

            <label className="text-white text-lg font-bold">New Full Name</label>
            <input
              type="text"
              value={newFullName}
              onChange={(e) => setNewFullName(e.target.value)}
              placeholder="New Full Name"
              className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
            />
            <label className="text-white text-lg font-bold">New Email</label>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="New Email"
              className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
            />
            <button 
              onClick={handleUpdateStudent}
              className="bg-red-500 w-full py-2 rounded-[30px] text-white font-bold text-lg">
              UPDATE STUDENT
            </button>

            {message && <p className="text-white text-center mt-4">{message}</p>}
          </div>
        </div>
      </div>
    );
};

export default Update;
