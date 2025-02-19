'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchStudentData = async () => {
      const StudentID = localStorage.getItem("StudentID");
      if (!StudentID) return;

      try {
        const response = await fetch(`http://localhost:5000/api/student/getstudentinfo/${StudentID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }
        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setMessage("Please enter both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: student.email,
          newPassword: newPassword,
        }),
      });

      const result = await response.json();
      if (result.status === "ok") {
        setMessage("Password updated successfully");
        setNewPassword("");
        setConfirmPassword("");
        setIsPopupOpen(false);
      } else {
        setMessage("Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setMessage("Error updating password");
    }
  };

  if (!student) {
    return <p className="text-center">Loading...</p>;
  }

  return (
    <div className='p-10'>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 flex items-center justify-center bg-blue-100">
          <Image
            className="rounded-full border-4 border-white"
            src="/assets/icons/user.png"
            alt="Student Avatar"
            width={100}
            height={100}
          />
        </div>
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            {student.name}
          </h2>
          <p className="text-gray-600 text-sm text-center">{student.email}</p>
          <p className="text-gray-600 text-sm text-center">ID: {student.StudentID}</p>
          <button
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => setIsPopupOpen(true)}
          >
            Update Password
          </button>
        </div>
      </div>
      
      {message && <p className="text-center mt-4 text-green-600">{message}</p>}
      
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold text-gray-800 text-center">Change Password</h3>
            <form onSubmit={handleChangePassword} className="mt-4">
              <input
                type="password"
                className="w-full p-2 border rounded-lg mb-2"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <input
                type="password"
                className="w-full p-2 border rounded-lg mb-2"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="w-full mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              >
                Update Password
              </button>
              <button
                type="button"
                className="w-full mt-2 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
                onClick={() => setIsPopupOpen(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;