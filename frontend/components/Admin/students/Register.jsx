"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [StudentID, setStudentID] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toStudentDashboard = () => {
    router.push("/admin/students");
  };

  function handleStudentRegistration(e) {
    e.preventDefault();
    setIsSubmitting(true);
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      setIsSubmitting(false);
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
        setIsSubmitting(false);
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
        setIsSubmitting(false);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header with subtle animation */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-600">
              Student Management
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-teal-600 sm:text-lg md:mt-5 md:text-xl">
            Register new students in the system
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left side - decorative panel */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 md:w-2/5 p-8 flex flex-col justify-between">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Register Student</h2>
                <p className="opacity-80 mb-6">
                  Add a new student to your institution's database with their basic information.
                </p>
                
                <div className="hidden md:block mt-8">
                  <div className="w-full h-1 bg-white bg-opacity-20 rounded mb-3"></div>
                  <div className="w-2/3 h-1 bg-white bg-opacity-20 rounded mb-3"></div>
                  <div className="w-1/2 h-1 bg-white bg-opacity-20 rounded"></div>
                </div>
              </div>
              
              <button
                onClick={toStudentDashboard}
                className="mt-6 group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-teal-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-150"
              >
                ← Back to Dashboard
              </button>
            </div>

            {/* Right side - Form */}
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleStudentRegistration} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter student's full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter student's email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <div className="mt-1">
                    <input
                      id="studentId"
                      name="studentId"
                      type="text"
                      required
                      value={StudentID}
                      onChange={(e) => setStudentID(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter student ID number"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-150 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Register Student"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;