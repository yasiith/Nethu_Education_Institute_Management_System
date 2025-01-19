"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const UserViewPage = ({ className }) => {
  const router = useRouter();
  const [months, setMonths] = useState([]);
  const [error, setError] = useState(null);

  // List of months
  const monthList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    // Populate the months (you can replace this logic with dynamic data if needed)
    setMonths(monthList);
  }, []);

  // Handle month click
  const handleMonthClick = (month) => {
    console.log(`Clicked on month: ${month}`);
    // Navigate or perform actions based on the selected month
    router.push(`/month-details/${month.toLowerCase()}`);
  };

  return (
    <div className="p-4 md:p-10">
      {/* Header */}
      <div className="flex justify-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          {className || "Class Name"}
        </h1>
      </div>

      {/* Months Section */}
      <div className="flex flex-col items-center">
        <h2 className="bg-gray-200 p-4 md:p-5 rounded-2xl text-2xl md:text-3xl font-bold mb-5 text-center w-full md:w-auto">
          MONTHS
        </h2>
        {error && <p className="text-red-500 mb-5 text-center">{error}</p>}
        {months.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {months.map((month) => (
              <div
                key={month}
                className="p-4 md:p-6 bg-teal-500 rounded-lg shadow-lg cursor-pointer hover:bg-teal-600 transition duration-300 flex flex-col items-center"
                onClick={() => handleMonthClick(month)}
              >
                <h3 className="text-lg md:text-xl font-bold text-white text-center mb-2">
                  {month}
                </h3>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-5">
            No months available.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserViewPage;
