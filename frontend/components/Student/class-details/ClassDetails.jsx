"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const ClassDetails = () => {
  const searchParams = useSearchParams();
  const router = useRouter(); // Initialize router for redirection
  const classId = searchParams.get("classid");
  const subject = searchParams.get("subject");
  const grade = searchParams.get("grade");
  const teacher = searchParams.get("teacher");

  const [isEnrolled, setIsEnrolled] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to view enrollment status.");
      return;
    }

    // Check if the student is already enrolled
    const checkEnrollment = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/student/enrollment-status/${classId}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setIsEnrolled(data.isEnrolled);
        } else {
          setError(data.message || "Failed to fetch enrollment status.");
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
        console.error(err);
      }
    };

    checkEnrollment();
  }, [classId]);

  const handleEnroll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to enroll in a class.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/student/enroll/${classId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsEnrolled(true);
        setMessage(data.message);
        setError("");
      } else {
        setError(data.message || "Error enrolling in class.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const handleUnenroll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to unenroll from a class.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/student/unenroll/${classId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": token,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setIsEnrolled(false);
        setMessage(data.message);
        setError("");
      } else {
        setError(data.message || "Error unenrolling from class.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-4">Class Details</h1>
      <div className="bg-teal-400 hover:bg-teal-500 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold">Subject: {subject}</h2>
        <p className="text-lg">Grade: {grade}</p>
        <p className="text-lg">Teacher: {teacher || "N/A"}</p>
        <p className="text-lg">Class ID: {classId}</p>
      </div>
      <button
        onClick={isEnrolled ? handleUnenroll : handleEnroll}
        className={`mt-5 px-6 py-2 rounded-md text-white ${
          isEnrolled
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-950 hover:bg-gray-200 hover:text-blue-950 font-bold"
        }`}
      >
        {isEnrolled ? "UNENROLL" : "ENROLL"}
      </button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
};

export default ClassDetails;
