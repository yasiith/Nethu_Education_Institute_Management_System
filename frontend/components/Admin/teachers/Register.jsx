"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [TeacherID, setTeacherID] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toTeacherDashboard = () => {
    router.push("/admin/teachers");
  };

  function handleTeacherRegistration(e) {
    e.preventDefault();
    
    if (!name || !email || !TeacherID) {
      alert("Please fill all fields");
      return;
    }
    
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      setIsSubmitting(false);
      return;
    }

    fetch("http://localhost:5000/api/auth/create-teacher", {
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
        TeacherID,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsSubmitting(false);
        if (data.status === "ok") {
          alert("Teacher registered successfully!");
          router.push("/admin/teachers/teacher-register");
        } else {
          alert("Teacher registration failed. User may already exist.");
        }
      })
      .catch((error) => {
        console.error("Error during teacher registration:", error);
        alert("An error occurred during registration.");
        setIsSubmitting(false);
      });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* Modern Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-teal-700">
              Teacher Management
            </span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5">
            Add new faculty members to your institution
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="md:flex">
            {/* Left Section - Design Panel */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-700 md:w-2/5 p-8 flex flex-col justify-between">
              <div className="text-white">
                <h2 className="text-3xl font-bold mb-4">Register Teacher</h2>
                <p className="opacity-80 mb-6">
                  Add a new teacher to your faculty roster with their professional information.
                </p>
                
                <div className="hidden md:block mt-8">
                  <svg className="w-24 h-24 mx-auto text-white opacity-20" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg>
                </div>
              </div>
              
              <button
                onClick={toTeacherDashboard}
                className="mt-6 group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-teal-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-150"
              >
                ← Back to Dashboard
              </button>
            </div>

            {/* Right Section - Form */}
            <div className="md:w-3/5 p-8">
              <form onSubmit={handleTeacherRegistration} className="space-y-6">
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
                      placeholder="Enter teacher's full name"
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
                      placeholder="Enter teacher's email address"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">
                    Teacher ID
                  </label>
                  <div className="mt-1">
                    <input
                      id="teacherId"
                      name="teacherId"
                      type="text"
                      required
                      value={TeacherID}
                      onChange={(e) => setTeacherID(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                      placeholder="Enter teacher ID number"
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
                      "Register Teacher"
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