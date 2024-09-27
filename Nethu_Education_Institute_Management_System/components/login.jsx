"use client";
// import LoginImage from "@public/assets/images/login.png";
// import HomePage from "@app/page";
// import { useRouter } from "next/navigation";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react"; // Import useState for managing input state
// import LoginImage from "@public/assets/images/Login_page_image.svg";
import LoginImage from "@public/assets/images/login.png";
import HomePage from "@app/page";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const loginHandle = () => {
    router.push("/admin");
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "ok") {
          alert("Login successful");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("role", data.type);
          window.localStorage.setItem("loggedIn", true);

          if (data.type === "admin") {
            window.location.href = "https://piratelk.com/";
          } else {
            window.location.href = "./home";
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
      {/* Left side: Image */}
      <div className="w-1/2 bg-white relative">
        <Image src={LoginImage} alt="Space" layout="fill" objectFit="cover" className="h-auto max-w-2xl justify-center ml-10" />
      </div>

      {/* Right side: Login form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10 relative mr-10">
        {/* Home Button */}
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
              onChange={(e) => setEmail(e.target.value)} // Update state on input change
              required
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 mb-1 border rounded-lg text-gray-700"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update state on input change
              required
            />
          </div>
          <div className="flex items-center font-bold justify-between mb-10">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Forget Password?
            </Link>
          </div>
          <Link
            href = "/admin"
          >
          <button
            onClick = {loginHandle}
            className="w-full p-3 bg-orange-500 text-white font-bold rounded-full hover:bg-gray-200 hover:text-orange-500 hover:border-orange-500 hover:delay-75"

            type="submit"
          >
            LOGIN
          </button>
          </Link>
          
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
