import Image from "next/image";
import Link from "next/link";
import LoginImage from "@public/assets/images/Login_page_image.svg";
import HomePage from "@app/page";

const LoginPage = () => {
  return (
    <div className="flex h-screen w-screen relative">
      {/* Left side: Image */}
      <div className="w-1/2 bg-gray-900 relative">
        <Image src={LoginImage} alt="Space" layout="fill" objectFit="cover" />
      </div>

      {/* Right side: Login form */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center p-10 relative">
        {/* Home Button */}
        <Link
          href="/"
          className="absolute top-5 right-6 flex justify-center items-center"
        >
          <button
            type="button"
            className="text-orange-500 bg-gray-200 hover:bg-orange-500 hover:text-white hover:delay-75  font-bold rounded-3xl text-xs px-10 py-2 pt-2 text-center mt-2 mr-10"
          >
            HOME
          </button>
        </Link>

        <h2 className="text-2xl font-bold mb-7">
          LOGIN WITH YOUR ACCOUNT DETAILS
        </h2>

        <form className="w-full max-w-sm">
          <div className="mb-4">
            <input
              className="w-full p-3 mb-1 border rounded-lg text-gray-700"
              type="email"
              placeholder="User name or email"
            />
          </div>
          <div className="mb-4">
            <input
              className="w-full p-3 mb-1 border rounded-lg text-gray-700"
              type="password"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center  font-bold justify-between mb-10">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember Me
            </label>
            <Link
              href="#"
              className="text-sm  text-gray-600 hover:text-gray-800"
            >
              Forget Password?
            </Link>
          </div>
          <button
            className="w-full p-3 bg-orange-500 text-white font-bold rounded-full hover:bg-gray-200 hover:text-orange-500  hover:border-orange-500 hover:delay-75"
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
