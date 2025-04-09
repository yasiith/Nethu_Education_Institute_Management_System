"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dashboardPath, setDashboardPath] = useState("");

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("loggedIn") === "true";
    setIsLoggedIn(loggedInStatus);

    if (loggedInStatus) {
      const userType = localStorage.getItem("role");
      if (userType === "admin") setDashboardPath("/admin");
      else if (userType === "teacher") setDashboardPath("/teachers");
      else if (userType === "student") setDashboardPath("/student");
    }
  }, []);

  const loginHandler = () => {
    router.push("/Login");
  };

  const logoutHandler = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="fixed top-0 z-20 w-full border-b bg-blue-950 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between max-w-screen-xl p-4 mx-auto">
        <span className="self-center text-2xl font-semibold text-white whitespace-nowrap">
          NEIMS
        </span>
        <div className="flex space-x-3 md:order-2 md:space-x-0">
          {isLoggedIn && dashboardPath ? (
            <Link href={dashboardPath}>
              <button
                type="button"
                className="px-10 py-2 pt-2 text-lg font-medium text-center text-white bg-green-500 hover:bg-green-600 rounded-3xl"
              >
                Dashboard
              </button>
            </Link>
          ) : null}
          {isLoggedIn ? (
            <button
              onClick={logoutHandler}
              type="button"
              className="px-10 py-2 pt-2 text-lg font-medium text-center text-white bg-red-500 hover:bg-red-600 rounded-3xl"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={loginHandler}
              type="button"
              className="px-10 py-2 pt-2 text-lg font-medium text-center text-white bg-orange-500 hover:bg-orange-600 rounded-3xl"
            >
              Login
            </button>
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-blue-950 md:dark:bg-transparent">
            <li>
              <Link
                href="#home_section"
                className="block px-3 py-2 text-white md:hover:text-blue-500 md:p-0"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/"
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                href="#classes_section"
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Classes
              </Link>
            </li>
            <li>
              <Link
                href="#teachers_section"
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Teachers
              </Link>
            </li>
            <li>
              <Link
                href="#contact_section"
                className="block px-3 py-2 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-500 md:p-0 dark:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
