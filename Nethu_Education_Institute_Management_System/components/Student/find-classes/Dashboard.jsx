'use client'
import React, { useEffect, useState } from 'react'
import GradeDropdown from './GradeDropdown'
import SubjectDropdown from './SubjectDropdown'
import { Search } from 'lucide-react'
import SearchBtn from './SearchBtn'
import ClassList from './ClassList'

const Dashboard = () => {
  // for dynamic selection
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [uniqueGrades, setUniqueGrades] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Fetch all classes and unique grades/subjects on mount
  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch('/api/classes');
        const data = await response.json();

        setClasses(data.classes);
        setFilteredClasses(data.classes);
        setUniqueGrades(data.uniqueGrades);
        setUniqueSubjects(data.uniqueSubjects);
      } catch(error) {
        console.log('Failed to fetch classes',error)
      }
    }

    fetchClasses();
  }, []);

  // Filter classes based on selected grade and subject
  useEffect(() => {
    const filtered = classes.filter(cls =>
    (!selectedGrade || cls.grade === selectedGrade) &&
    (!selectedSubject || cls.subject === selectedSubject)
    );
    setFilteredClasses(filtered);
  }, [selectedGrade, selectedSubject, classes]);


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
                <GradeDropdown 
                  uniqueGrades={uniqueGrades}
                  selectedGrade={selectedGrade}
                  setSelectedGrade={setSelectedGrade}
                />
                <SubjectDropdown 
                  uniqueSubjects={uniqueSubjects}
                  selectedSubject={selectedSubject}
                  setSelectedSubject={setSelectedSubject}
                />
            </div>
      </div>
      <ClassList classes={filteredClasses} />
    </div>
  )
}

export default Dashboard
