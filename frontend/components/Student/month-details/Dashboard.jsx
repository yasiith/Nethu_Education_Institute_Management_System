"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Materials from "./Materials";
import OnlineClasses from "./OnlineClasses";
import Quizzes from "./Quizzes";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const classId = searchParams.get("classid");

  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("materials");

  useEffect(() => {
    const checkPayment = async () => {
      const studentId = localStorage.getItem("StudentID");

      if (!studentId || !classId || !month || !year) {
        router.push("/student");
        return;
      }

      try {
        const response = await fetch(
          `http://143.110.187.69:5000/api/check-payment-status?studentId=${studentId}&classId=${classId}&month=${month}&year=${year}`
        );
        const data = await response.json();

        if (data.status === "Completed") {
          setIsPaid(true);
        } else {
          router.push("/student"); // Redirect to payment page if not paid
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
        router.push("/error"); // Redirect to an error page
      } finally {
        setLoading(false);
      }
    };

    checkPayment();
  }, [router, month, year, classId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 flex justify-center items-center p-6">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500 mb-4"></div>
          <p className="text-emerald-700 font-medium">Checking payment status...</p>
        </div>
      </div>
    );
  }

  if (!isPaid) {
    return null; // Prevents rendering if not paid
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header and Back Button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <button 
              onClick={() => router.back()} 
              className="flex items-center text-emerald-700 hover:text-emerald-900 mb-4 sm:mb-0 transition-colors duration-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>
          
          <div className="bg-white rounded-full px-4 py-2 shadow-md">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="font-medium text-gray-800">{month} {year}</span>
              <div className="flex items-center ml-3 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                PAID
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Monthly Learning Dashboard</h1>
            <p className="text-emerald-100 mt-2">Access your learning materials, online classes, and quizzes</p>
          </div>
          
          {/* Tabs */}
          <div className="bg-white p-0">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("materials")}
                className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "materials"
                    ? "border-emerald-500 text-emerald-700"
                    : "border-transparent text-gray-500 hover:text-emerald-600"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Class Materials
              </button>
              <button
                onClick={() => setActiveTab("classes")}
                className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "classes"
                    ? "border-emerald-500 text-emerald-700"
                    : "border-transparent text-gray-500 hover:text-emerald-600"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Online Classes
              </button>
              <button
                onClick={() => setActiveTab("quizzes")}
                className={`flex items-center px-6 py-4 font-medium border-b-2 transition-colors duration-200 ${
                  activeTab === "quizzes"
                    ? "border-emerald-500 text-emerald-700"
                    : "border-transparent text-gray-500 hover:text-emerald-600"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Quizzes
              </button>
            </div>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          {activeTab === "materials" && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Class Materials</h2>
              </div>
              <Materials />
            </div>
          )}
          
          {activeTab === "classes" && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Online Classes</h2>
              </div>
              <OnlineClasses />
            </div>
          )}
          
          {activeTab === "quizzes" && (
            <div className="animate-fade-in">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Quizzes</h2>
              </div>
              <Quizzes />
            </div>
          )}
        </div>
        
        {/* Help Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">Need Help?</h3>
          </div>
          <p className="text-gray-600 mb-4">If you have any questions about the materials or encounter any technical issues, please contact our support team.</p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;