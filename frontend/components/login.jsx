"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoginImage from "@public/assets/images/login.png";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const router = useRouter();

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Check localStorage for saved email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Manage localStorage based on 'Remember Me' checkbox
    if (rememberMe) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.status === "ok") {
        localStorage.setItem("token", data.data);
        localStorage.setItem("role", data.type);
        localStorage.setItem("loggedIn", "true");

        // Storing ID based on user type
        if (data.type === "teacher")
          localStorage.setItem("TeacherID", data.TeacherID);
        if (data.type === "student") {
          localStorage.setItem("StudentID", data.StudentID); // Custom StudentID
          localStorage.setItem("studentMongoId", data.MongoID);  // MongoDB-generated ID
          localStorage.setItem("name",data.name);
        }
        

        // Redirect based on user type
        if (data.type === "admin") router.push("/admin");
        else if (data.type === "teacher") router.push("/teachers");
        else if (data.type === "student") router.push("/student");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
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
          LOGIN WITH YOUR ACCOUNT DETAILS
        </h2>

        <form className="w-full max-w-xs md:max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full p-3 mb-1 text-gray-700 border rounded-lg"
              type="email"
              placeholder="User name or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email" // This helps the browser recognize the input as email
            />
          </div>
          <div className="relative mb-4">
            <input
              className="w-full p-3 mb-1 text-gray-700 border rounded-lg"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password" // This helps the browser recognize the input as password
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
          <div className="flex items-center justify-between mb-10 font-bold">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember Me
            </label>
            <Link
              href="/ForgotPassword"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Forget Password?
            </Link>
          </div>

          <button
            className="w-full p-3 font-bold text-white bg-orange-500 rounded-full hover:bg-gray-200 hover:text-orange-500"
            type="submit"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;