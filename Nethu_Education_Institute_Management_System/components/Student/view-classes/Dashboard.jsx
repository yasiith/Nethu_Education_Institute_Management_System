"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";

const UserViewPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [months, setMonths] = useState([]);
  const [monthlyFees, setMonthlyFees] = useState({});
  const [loading, setLoading] = useState(true);

  const classId = searchParams.get("classid");
  const className = searchParams.get("className");
  const teacher = searchParams.get("teacher");
  const year = searchParams.get("year");

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/classes/${classId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch class details");
        }
        const data = await response.json();
        setMonths(Object.keys(data.monthlyFees));
        setMonthlyFees(data.monthlyFees);
      } catch (error) {
        console.error("Error fetching class details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (classId) {
      fetchClassDetails();
    }
  }, [classId]);

  const handleMonthClick = async (month, year, classId) => {
    const studentId = localStorage.getItem("StudentID"); // Custom StudentID (e.g., "sunil")
    const amount = monthlyFees[month];

    try {
      // Step 1: Check if the student has already paid for this month
      const paymentStatusResponse = await fetch(
        `http://localhost:5000/api/check-payment-status?studentId=${studentId}&classId=${classId}&month=${month}&year=${year}`
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

      // Step 2: If payment is not completed, proceed with the payment process
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      if (!stripe) {
        console.error("Stripe failed to initialize.");
        return;
      }

      const sessionResponse = await fetch("http://localhost:5000/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: studentId, // Use custom StudentID
          classId, // Send the custom classid
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
    <div className="p-4 md:p-10">
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          {className || "Class Name"} by {teacher || "Teacher"}
        </h1>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="bg-gray-200 p-4 md:p-5 rounded-2xl text-2xl md:text-3xl font-bold mb-5 text-center w-full md:w-auto">
          MONTHS
        </h2>
        {loading ? (
          <p className="text-gray-600 text-center mt-5">Loading...</p>
        ) : months.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {months.map((month) => (
              <div
                key={month}
                className="p-4 md:p-6 bg-teal-500 rounded-lg shadow-lg cursor-pointer hover:bg-teal-600 transition duration-300 flex flex-col items-center"
                onClick={() => handleMonthClick(month, year, classId)}
              >
                <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2">
                  {year} {month}
                </h3>
                <p className="text-white text-center">Fee: Rs.{monthlyFees[month]}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-5">No months available.</p>
        )}
      </div>
    </div>
  );
};

export default UserViewPage;