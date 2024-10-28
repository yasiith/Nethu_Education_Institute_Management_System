"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import LoginImage from "@public/assets/images/login.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("email", email);
    } else {
      localStorage.removeItem("email");
    }

    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          alert("Login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("role", data.type);
          window.localStorage.setItem("TeacherID", data.TeacherID);
          window.localStorage.setItem("loggedIn", true);

          if (data.type === "admin") {
            window.location.href = "/admin";
          } else if(data.type =="teacher") {
            window.location.href = "/teachers";
          }else if(data.type ==="student"){
            window.location.href ="/student"
          }
        } else {
          alert("Login failed. Please check your credentials.");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
      });
  }

  return (
    <div className="flex h-screen w-screen relative">
      <div className="w-1/2 bg-white relative">
        <Image
          src={LoginImage}
          alt="Space"
          layout="fill"
          objectFit="cover"
          className="h-auto max-w-2xl justify-center ml-10"
        />
      </div>

      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10 relative mr-10">
        <Link
          href="/"
          className="absolute top-5 right-6 flex justify-center items-center"
        >
          <button
            type="button"
            className="text-orange-500 bg-gray-200 hover:bg-orange-500 hover:text-white hover:delay-75 font-bold rounded-3xl text-xs px-10 py-2 pt-2 text-center mt-2 mr-10"
          >
            HOME
          </button>
        </Link>

        <h2 className="text-2xl font-bold mb-7">
          LOGIN WITH YOUR ACCOUNT DETAILS
        </h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              className="w-full p-3 mb-1 border rounded-lg text-gray-700"
              type="email"
              placeholder="User name or email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              className="w-full p-3 mb-1 border rounded-lg text-gray-700"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 px-3 text-gray-500 flex items-center"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </button>
          </div>
          <div className="flex items-center font-bold justify-between mb-10">
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
              href="#"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Forget Password?
            </Link>
          </div>

          <button
            className="w-full p-3 bg-orange-500 text-white font-bold rounded-full hover:bg-gray-200 hover:text-orange-500 hover:border-orange-500 hover:delay-75"
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
