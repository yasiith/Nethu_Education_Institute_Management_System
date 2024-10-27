'use client';
import { useRouter } from 'next/navigation'

const Dashboard = () => {
    const router = useRouter();
    const toFindClasses = () => {
        router.push('/student/find-classes')
    }
  return (
    <div className='p-10'>
        <div className='flex flex-col items-center justify-center w-full'>
            <div className='inline-block'>
                <div className='bg-gray-200 rounded-3xl'>
                    <div className='p-5 whitespace-nowrap'>
                        <h1 className='text-4xl font-bold'>Welcome, Student Name</h1> 
                    </div>
                </div>
            </div>
            <div>
                Announcements
            </div>
            <div className='inline-block p-10'>
                <div className='bg-gray-200 rounded-3xl'>
                    <div className='p-5 whitespace-nowrap'>
                        <h1 className='text-4xl font-bold'>Enrolled Classes</h1> 
                    </div>
                </div>
            </div>
            <div className='inline-block'>
                <button
                    onClick = {toFindClasses}
                    className='bg-gray-200 text-gray-800 text-4xl text-center font-bold rounded-[25px] p-5  cursor-pointer hover:shadow-xl transition-shadow duration-300       '
                >
                    Find a class
                </button>
                
            </div>
        </div>
        
        
        
      
    </div>
  )
}

export default Dashboard
