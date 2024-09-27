"use client";
import { useRouter } from "next/navigation"

const Dashboard = () => {
    const router = useRouter()
    const handleClick1 = () => {
        router.push('/admin/teachers/teacher-register')
    }
    const handleClick2 = () => {
        router.push('/admin/teachers/teacher-update')
    }
    const handleClick3 = () => {
        router.push('/admin/teachers/teacher-delete')
    }
    const handleClick4 = () => {
        router.push('/admin/teachers/teacher-view')
    }

  return (
    <div>
        <div className='pt-5 flex justify-center'>
            <div className='bg-gray-300 rounded-[35px] flex justify-center pt-5 pb-5 w-1/2'>
            <   h1 className='text-4xl font-bold'>TEACHER MANAGEMENT</h1>
            </div>
        </div>
        <div className='flex flex-col-2 justify-center py-5 gap-x-5 items-start'>
            <button
                onClick={handleClick1}
                className='bg-teal-600 rounded-[35px] text-white text-center pt-5 pb-5 w-1/4 cursor-pointer  h-[200px]'
            >
                <p className='text-[40px] font-semibold leading-none'>REGISTER</p>
                <p className='text-[60px] font-semibold leading-none'>TEACHER</p>
            </button>

            <button
                onClick={handleClick2}
                className='bg-gray-400 rounded-[35px] p-5 text-white text-center w-1/4 h-[200px]'
            >
                <p className="text-[40px] font-semibold leading-none">UPDATE</p>
                <p className="text-[60px] font-semibold leading-none">TEACHER</p>
            </button>
        </div>
        <div className='flex flex-col-2 justify-center gap-x-5 pb-5 '>
            <button
                onClick={handleClick3}
                className='bg-red-500 text-white text-center rounded-[25px] p-5 w-1/4 cursor-pointer'
            >
                <p className='font-semibold text-[40px] leading-none'>DELETE</p>
                <p className='font-semibold text-[60px] leading-none'>TEACHER</p>
            </button>
            <button
                onClick={handleClick4}
                className='bg-gray-300 rounded-[35px] p-5 text-center w-1/4 cursor-pointer'
            >
                <p className='text-[30px] font-semibold leading-none'>VIEW</p>
                <p className='text-[45px] font-semibold leading-none'>TEACHERS</p>

            </button>
        </div>
    </div>
  )
}

export default Dashboard
