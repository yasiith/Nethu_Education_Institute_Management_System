"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const UserViewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [months, setMonths] = useState([]);
  const [monthlyFees, setMonthlyFees] = useState({});
  const [paymentStatus, setPaymentStatus] = useState({});
  const [loading, setLoading] = useState(true);

  const classId = searchParams.get("classid");
  const className = searchParams.get("className");
  const teacher = searchParams.get("teacher");
  const year = searchParams.get("year");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`https://nethu-education-institute-management.onrender.com/api/classes/${classId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch class details");
        }
        const data = await response.json();
        setMonths(Object.keys(data.monthlyFees));
        setMonthlyFees(data.monthlyFees);

        // Fetch payment status for each month
        const studentId = localStorage.getItem("StudentID");
        const paymentStatuses = {};
        for (const month of Object.keys(data.monthlyFees)) {
          const paymentStatusResponse = await fetch(
            `https://nethu-education-institute-management.onrender.com/api/check-payment-status?studentId=${studentId}&classId=${classId}&month=${month}&year=${year}`
          );
          if (paymentStatusResponse.ok) {
            const paymentStatusData = await paymentStatusResponse.json();
            paymentStatuses[month] = paymentStatusData.status === 'Completed';
          }
        }
        setPaymentStatus(paymentStatuses);
      } catch (error) {
        console.error("Error fetching class details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId, year]);

  const handleMonthClick = async (month, year, classId) => {
    const studentId = localStorage.getItem("StudentID");
    const amount = monthlyFees[month];

    try {
      // Step 1: Check if the student has already paid for this month
      const paymentStatusResponse = await fetch(
        `https://nethu-education-institute-management.onrender.com/api/check-payment-status?studentId=${studentId}&classId=${classId}&month=${month}&year=${year}`
      );

      if (!paymentStatusResponse.ok) {
        throw new Error("Failed to check payment status");
      }

      const paymentStatusData = await paymentStatusResponse.json();

      // If payment is already completed, redirect to the month details page
      if (paymentStatusData.status === 'Completed') {
        router.push(`/student/month-details?classid=${classId}&year=${year}&month=${month}&payment_success=true`);
        return;
      }

      // Step 2: Show confirmation dialog before proceeding to payment
      const shouldProceed = window.confirm("You haven't paid for this month. Do you want to proceed to checkout?");
      if (!shouldProceed) {
        return; // Exit if the user cancels the payment
      }

      // Step 3: Proceed with the payment process
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
      }

      const sessionResponse = await fetch("https://nethu-education-institute-management.onrender.com/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId,
          classId,
          month,
          year,
          amount,
        }),
      });

      const session = await sessionResponse.json();

      // Redirect to Stripe checkout
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error checking payment status or creating Stripe session:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50 p-6">
      {/* Back button */}
      <button 
        onClick={() => router.back()} 
        className="flex items-center text-emerald-700 hover:text-emerald-900 mb-6 transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back
      </button>

      <div className="max-w-6xl mx-auto">
        {/* Class Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-emerald-800">
                {className || "Class Name"}
              </h1>
              <div className="flex items-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <p className="text-gray-600">Instructor: <span className="font-medium">{teacher || "Teacher"}</span></p>
              </div>
              <div className="flex items-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600">Year: <span className="font-medium">{year}</span></p>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="bg-gradient-to-r from-emerald-400 to-teal-500 text-white text-sm py-2 px-4 rounded-full font-medium">
                Class ID: {classId}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Monthly Payments</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
            </div>
          ) : months.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {months.map((month) => (
                <div
                  key={month}
                  onClick={() => handleMonthClick(month, year, classId)}
                  className={`relative overflow-hidden rounded-xl shadow-md transition transform hover:-translate-y-1 duration-300 cursor-pointer`}
                >
                  <div className={`absolute inset-0 ${
                    paymentStatus[month] 
                      ? 'bg-gradient-to-br from-emerald-400 to-green-600' 
                      : 'bg-gradient-to-br from-teal-400 to-teal-600'
                  }`}>
                  </div>
                  <div className="relative p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{month}</h3>
                      <div className={`text-xs font-bold uppercase rounded-full px-2 py-1 ${
                        paymentStatus[month] 
                          ? 'bg-green-200 text-green-800' 
                          : 'bg-yellow-200 text-yellow-800'
                      }`}>
                        {paymentStatus[month] ? 'Paid' : 'Unpaid'}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white mr-2 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <p className="text-white font-medium">Rs. {monthlyFees[month]}</p>
                    </div>
                    <div className="mt-4 text-white text-xs opacity-90">{year}</div>
                    <div className="absolute bottom-3 right-3">
                      {paymentStatus[month] ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-600 text-lg">No months available for payment.</p>
              <p className="text-gray-500 mt-2">Please check back later or contact support.</p>
            </div>
          )}
        </div>

        {/* Information Panel */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-gray-800">Payment Information</h3>
          </div>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Click on a month card to view details or make a payment.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Green cards indicate months you've already paid for.</span>
            </li>
            <li className="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Teal cards indicate pending payments.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserViewPage;