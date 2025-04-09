"use client";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();

  const handleClick1 = () => router.push("/admin/teachers/teacher-register");
  const handleClick2 = () => router.push("/admin/teachers/teacher-update");
  const handleClick3 = () => router.push("/admin/teachers/teacher-delete");
  const handleClick4 = () => router.push("/admin/teachers/teacher-view");

  return (
    <div className="container px-4 mx-auto">
      {/* Title Section */}
      <div className="flex justify-center pt-5">
        <div className="bg-gray-300 rounded-[35px] flex justify-center p-5 w-full md:w-3/4 lg:w-1/2 ">
          <h1 className="text-2xl font-bold text-center md:text-3xl lg:text-4xl">
            TEACHER MANAGEMENT
          </h1>
        </div>
      </div>

      {/* First Row of Buttons */}
      <div className="flex flex-col justify-center gap-5 py-5 md:flex-row">
        <button
          onClick={handleClick1}
          className="bg-teal-600 rounded-[35px] text-white text-center p-5 w-full md:w-1/2 lg:w-1/4 cursor-pointer min-h-[150px] md:min-h-[200px] hover:bg-teal-700 transition-colors"
        >
          <p className="text-2xl md:text-3xl lg:text-[40px] font-semibold leading-none mb-2">
            REGISTER
          </p>
          <p className="text-3xl md:text-4xl lg:text-[60px] font-semibold leading-none">
            TEACHER
          </p>
        </button>

        <button
          onClick={handleClick2}
          className="bg-gray-400 rounded-[35px] text-white text-center p-5 w-full md:w-1/2 lg:w-1/4 cursor-pointer min-h-[150px] md:min-h-[200px] hover:bg-gray-500 transition-colors"
        >
          <p className="text-2xl md:text-3xl lg:text-[40px] font-semibold leading-none mb-2">
            UPDATE
          </p>
          <p className="text-3xl md:text-4xl lg:text-[60px] font-semibold leading-none">
            TEACHER
          </p>
        </button>
      </div>

      {/* Second Row of Buttons */}
      <div className="flex flex-col justify-center gap-5 pb-5 md:flex-row">
        <button
          onClick={handleClick3}
          className="bg-red-500 text-white text-center rounded-[35px] p-5 w-full md:w-1/2 lg:w-1/4 cursor-pointer min-h-[150px] md:min-h-[200px] hover:bg-red-600 transition-colors"
        >
          <p className="text-2xl md:text-3xl lg:text-[40px] font-semibold leading-none mb-2">
            DELETE
          </p>
          <p className="text-3xl md:text-4xl lg:text-[60px] font-semibold leading-none">
            TEACHER
          </p>
        </button>

        <button
          onClick={handleClick4}
          className="bg-gray-300 rounded-[35px] text-center p-5 w-full md:w-1/2 lg:w-1/4 cursor-pointer min-h-[150px] md:min-h-[200px] hover:bg-gray-400 transition-colors"
        >
          <p className="text-2xl md:text-3xl lg:text-[40px] font-semibold leading-none mb-2">
            VIEW
          </p>
          <p className="text-3xl md:text-4xl lg:text-[60px] font-semibold leading-none">
            TEACHERS
          </p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
