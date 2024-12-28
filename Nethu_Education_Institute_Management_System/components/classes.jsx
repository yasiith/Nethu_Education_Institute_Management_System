import React from 'react';

const Classes = () => {
  return (
    <div className='relative py-10'>
      <h1 className='pt-5 text-4xl font-bold text-center text-gray-800 md:text-7xl'>What We Offer</h1>
      <div className='flex flex-wrap justify-center gap-4 p-4'>
        <div className='z-10 flex items-center justify-center w-48 h-32 transition duration-500 transform bg-orange-400 border sm:w-60 md:w-48 lg:w-48 rounded-2xl hover:scale-110'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-0 text-sm font-semibold'>ORDINARY LEVEL</h2>
            <h1 className='mt-0 text-2xl font-bold md:text-4xl'>MATHS</h1>
          </div>
        </div>
        <div className='z-10 flex items-center justify-center w-48 h-32 transition duration-500 transform bg-orange-400 border sm:w-60 md:w-48 lg:w-48 rounded-2xl hover:scale-110'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-0 text-sm font-semibold'>ORDINARY LEVEL</h2>
            <h1 className='mt-0 text-2xl font-bold md:text-4xl'>SCIENCE</h1>
          </div>
        </div>
        <div className='z-10 flex items-center justify-center w-48 h-32 transition duration-500 transform bg-orange-400 border sm:w-60 md:w-48 lg:w-48 rounded-2xl hover:scale-110'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-0 text-sm font-semibold'>ORDINARY LEVEL</h2>
            <h1 className='mt-0 text-2xl font-bold md:text-4xl'>ICT</h1>
          </div>
        </div>
        <div className='z-10 flex items-center justify-center w-48 h-32 transition duration-500 transform bg-orange-400 border sm:w-60 md:w-48 lg:w-48 rounded-2xl hover:scale-110'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-0 text-sm font-semibold'>ORDINARY LEVEL</h2>
            <h1 className='mt-0 text-2xl font-bold md:text-4xl'>ENGLISH</h1>
          </div>
        </div>
        <div className='z-10 flex items-center justify-center h-32 transition duration-500 transform bg-orange-400 border w-60 sm:w-72 md:w-60 lg:w-60 rounded-2xl hover:scale-110'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-0 text-sm font-semibold'>ORDINARY LEVEL</h2>
            <h1 className='mt-0 text-2xl font-bold md:text-4xl'>COMMERCE</h1>
          </div>
        </div>
        <div className='z-10 flex items-center justify-center w-48 h-32 transition duration-500 transform bg-orange-400 border sm:w-60 md:w-48 lg:w-48 rounded-2xl hover:scale-110'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-0 text-sm font-semibold'>ORDINARY LEVEL</h2>
            <h1 className='mt-0 text-2xl font-bold md:text-4xl'>HISTORY</h1>
          </div>
        </div>
        <div className='z-10 flex items-center justify-center h-32 transition duration-500 transform bg-orange-400 border w-96 sm:w-full md:w-96 lg:w-96 rounded-2xl hover:scale-110'>
          <div className='flex flex-col items-center'>
            <h2 className='mb-0 text-sm font-semibold'>GRADE 5</h2>
            <h1 className='mt-0 text-2xl font-bold md:text-4xl'>SCHOLARSHIP</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classes;