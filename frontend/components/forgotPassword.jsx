"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LoginImage from "@public/assets/images/login.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (data.status === "ok") {
        setIsSuccess(true);
        setMessage("Password reset instructions have been sent to your email.");
      } else {
        setMessage(data.message || "Failed to send reset email. Please try again.");
      }
    } catch (error) {
      console.error("Error during password reset request:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen md:flex-row">
      <div className="relative bg-white md:w-1/2 h-1/2 md:h-full">
        <Image
          src={LoginImage}
          alt="Space"
          layout="fill"
          objectFit="cover"
          className="w-full h-auto md:w-auto"
        />
      </div>

      <div className="relative flex flex-col items-center justify-center p-4 bg-white md:w-1/2 md:p-10">
        <Link
          href="/"
          className="fixed top-4 right-4 md:top-5 md:right-6"
        >
          <button
            type="button"
            className="px-10 py-2 pt-2 text-xs font-bold text-center text-orange-500 bg-gray-200 hover:bg-orange-500 hover:text-white rounded-3xl"
          >
            HOME
          </button>
        </Link>

        <h2 className="text-xl font-bold text-center md:text-2xl mb-7">
          FORGOT PASSWORD
        </h2>

        {isSuccess ? (
          <div className="w-full max-w-xs md:max-w-sm">
            <p className="mb-6 text-center text-green-600">{message}</p>
            <Link href="/login">
              <button className="w-full p-3 font-bold text-white bg-orange-500 rounded-full hover:bg-gray-200 hover:text-orange-500">
                RETURN TO LOGIN
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full max-w-xs md:max-w-sm" onSubmit={handleSubmit}>
            <p className="mb-4 text-sm text-center text-gray-600">
              Enter your email address and we'll send you instructions to reset your password.
            </p>
            <div className="mb-4">
              <input
                className="w-full p-3 mb-1 text-gray-700 border rounded-lg"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            {message && (
              <p className="mb-4 text-sm text-center text-red-500">{message}</p>
            )}
            <button
              className="w-full p-3 font-bold text-white bg-orange-500 rounded-full hover:bg-gray-200 hover:text-orange-500"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "SENDING..." : "RESET PASSWORD"}
            </button>
            <div className="mt-4 text-center">
              <Link href="/Login" className="text-base text-gray-600 hover:text-gray-800">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;