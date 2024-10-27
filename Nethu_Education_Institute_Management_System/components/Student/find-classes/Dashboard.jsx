import React from 'react'
import GradeDropdown from './GradeDropdown'
import SubjectDropdown from './SubjectDropdown'
import { Search } from 'lucide-react'
import SearchBtn from './SearchBtn'

const Dashboard = () => {
  return (
    <div className='p-10'>
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='inline-block'>
            <div className='bg-gray-200 rounded-3xl'>
                <div className='p-5 whitespace-nowrap'>
                    <h1 className='text-4xl font-bold'>AVAILABLE CLASSES</h1>
                </div>
            </div>
        </div>
        <div className='flex flex-col-3 p-8 gap-10'>
                <GradeDropdown />
                <SubjectDropdown />
                <SearchBtn />
            </div>
      </div>
    </div>
  )
}

export default Dashboard
