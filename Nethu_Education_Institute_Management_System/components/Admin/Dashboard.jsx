import React from 'react'

const Dashboard = () => {
  return (
    <div>
        <div className='pt-5 flex justify-center'>
            <div className='bg-gray-300 rounded-[35px] flex justify-center pt-5 pb-5 w-1/2'>
            <   h1 className='text-4xl font-bold'>WELCOME TO ADMIN DASHBOARD</h1>
            </div>
        </div>
        <div className='flex flex-col-2 justify-center py-5 gap-x-5 items-start'>
            <div className='bg-teal-600 rounded-[35px] text-white text-center pt-5 pb-5 w-1/4'>
                <h3 className='text-[30px] font-semibold leading-none'>REGISTERED</h3>
                <h3 className='text-[45px] font-semibold leading-none'>STUDENTS</h3>
                <p className='font-semibold text-[100px] leading-none'>100+</p>
            </div>
            <div>
                <h3 className='text-3xl font-semibold leading-none mb-2'>CLASSES</h3>
                <div className='bg-gray-400 rounded-[35px] p-5 text-white text-center h-[200px]'>
                    <h1 className='text-[150px] font-semibold leading-none'>30+</h1>
                </div>
            </div>
        </div>
        <div className='flex flex-col-2 justify-center gap-x-5 pb-5 items-start'>
            <div className='bg-red-500 text-white text-center rounded-[25px] p-5 w-1/4'>
                <h1 className='font-bold text-[60px]'>Log Out</h1>
            </div>
            <div className='bg-gray-300 rounded-[35px] p-5 text-center w-1/5'>
                <p className='text-[100px] font-bold leading-none'>15+</p>
                <p className='text-[30px] font-semibold'>TEACHERS</p>
                <p className='text-[30px] font-semibold'>REGISTERED</p>
            </div>
        </div>
    </div>

  )
}

export default Dashboard
