'use client';
import React, { useEffect, useState } from 'react';
import GradeDropdown from './GradeDropdown';
import SubjectDropdown from './SubjectDropdown';
import { Search } from 'lucide-react';
import SearchBtn from './SearchBtn';
import ClassList from './ClassList';

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [uniqueGrades, setUniqueGrades] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  // Fetch classes, grades, and subjects from the backend
  useEffect(() => {
    async function fetchClasses() {
      try {
        const response = await fetch('http://localhost:5000/api/classes/Getgradesubject');
        if (!response.ok) {
          throw new Error('Failed to fetch class data');
        }
        const data = await response.json();

        setClasses(data.classes);
        setFilteredClasses(data.classes);
        setUniqueGrades(data.uniqueGrades);
        setUniqueSubjects(data.uniqueSubjects);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    }

    fetchClasses();
  }, []);

  // Filter classes dynamically based on dropdown selection
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
        <div className='flex gap-10 mt-8 items-start'>
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
  <div className='mt-8'> {/* Added margin-top to push the button down */}
    <SearchBtn />
  </div>
</div>


      </div>
      <ClassList classes={filteredClasses} />
    </div>
  );
};

export default Dashboard;
