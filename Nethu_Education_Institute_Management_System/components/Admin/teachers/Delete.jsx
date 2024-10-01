"use client";
import { useRouter } from "next/navigation"


const Register = () => {
    const router = useRouter();
    const toTeacherDashboard = () => {
        router.push('/admin/teachers')
    }
  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-gray-300 w-1/2 text-center py-4 rounded-[35px] mt-5">
        <h1 className="text-4xl font-bold">TEACHER MANAGEMENT</h1>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl">
        <div className="flex flex-col gap-6 items-center ">
          <div className="bg-teal-500 w-[350px] h-[200px] rounded-[45px] flex items-center justify-center text-white text-center p-5">
            <div className="flex flex-col leading-none">
                <p className="text-[40px] font-semibold">DELETE</p>
                <p className="text-[60px] font-bold">TEACHER</p>
            </div>
          </div>
          <button 
            onClick={toTeacherDashboard}
            className="bg-red-500 w-[350px] h- rounded-[30px] text-white font-bold text-[50px]">
            BACK
          </button>
        </div>

        <div className="bg-gray-400 w-[400px] p-8 rounded-[40px] flex flex-col justify-center gap-4 m-5 h-[300px]">
          <label className="text-white text-lg font-bold">Teacher ID</label>
          <input
            type="text"
            placeholder="Teacher ID"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <button className="bg-red-500 w-full py-2 mt-4 rounded-[30px] text-white font-bold text-lg ">
            DELETE TEACHER
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
