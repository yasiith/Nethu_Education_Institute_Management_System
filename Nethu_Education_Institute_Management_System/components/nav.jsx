import Link from "next/link";
import LoginPage from "@app/loginPage";
const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-400 backdrop-blur-sm  start-0 fixed w-full z-20 top-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <span className="text-white self-center text-2xl font-semibold whitespace-nowrap">
            NEIMS
          </span>
          <div className="flex md:order-2 space-x-3 md:space-x-0">
            <Link href="/Nethu_Education_Institute_Management_System/app/loginPage">
              <button
                type="button"
                className="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-3xl text-lg px-10 py-2 pt-2 text-center"
              >
                Login
              </button>
            </Link>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className='flex flex-col p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-500 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-400 md:dark:bg-gray-400 dark:border-gray-400">'>
              <li>
                <Link
                  href="/"
                  className="block py-2 px-3 text-white md:hover:text-blue-700 md:p-0 "
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                >
                  Classes
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className='"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-gray-700 md:p-0 md:dark:hover:text-gray-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
