"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Materials from "./Materials";
import OnlineClasses from "./OnlineClasses";

const Dashboard = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const classId = searchParams.get("classid");

  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPayment = async () => {
      const studentId = localStorage.getItem("StudentID");

      if (!studentId || !classId || !month || !year) {
        router.push("/student");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/check-payment-status?studentId=${studentId}&classId=${classId}&month=${month}&year=${year}`
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
  }, [router, month, year]);

  if (loading) {
    return <div className="p-10">Checking payment status...</div>;
  }

  if (!isPaid) {
    return null; // Prevents rendering if not paid
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Paid Content {month} {year}</h1>
      <hr className="my-2 border-t-2 border-gray-300" />
      <h1 className="text-2xl font-semi bold">Class Materials</h1>
      <hr className="my-2 border-t-2 border-gray-300" />
      <Materials />
      <hr className="my-2 border-t-2 border-gray-300" />
      <h1 className="text-2xl font-semi bold">Online Classes</h1>
      <hr className="my-2 border-t-2 border-gray-300" />
      <OnlineClasses />
    </div>
  );
};

export default Dashboard;
