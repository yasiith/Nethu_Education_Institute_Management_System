'use client';
import React, { useEffect, useState } from 'react';
import GradeDropdown from './GradeDropdown';
import SubjectDropdown from './SubjectDropdown';
import { Search } from 'lucide-react';
import ClassList from './ClassList';

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [uniqueGrades, setUniqueGrades] = useState([]);
  const [uniqueSubjects, setUniqueSubjects] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch classes, grades, and subjects from the backend
  useEffect(() => {
    async function fetchClasses() {
      setLoading(true);
      try {
        const response = await fetch('http://143.110.187.69:5000/api/classes/Getgradesubject');
        if (!response.ok) {
          throw new Error('Failed to fetch class data');
        }
        const data = await response.json();

        setClasses(data.classes);
        setFilteredClasses(data.classes);
        setUniqueGrades(data.uniqueGrades);
        setUniqueSubjects(data.uniqueSubjects);
        setError(null);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Failed to load classes. Please try again later.');
      } finally {
        setLoading(false);
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

  const resetFilters = () => {
    setSelectedGrade('');
    setSelectedSubject('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 to-teal-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 py-8 px-6 shadow-lg">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center">Find Your Perfect Class</h1>
          <p className="text-green-100 text-center mt-2">Browse and filter available classes to find what you need</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-10">
        {/* Page Title */}
        <div className="mb-10 flex justify-center">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 py-3 px-10">
              <h2 className="text-2xl font-bold text-white text-center">
                AVAILABLE CLASSES
              </h2>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-green-800">Filter Classes</h3>
              <p className="text-gray-600">Use the dropdowns to find specific classes</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6">
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
              
              {(selectedGrade || selectedSubject) && (
                <button 
                  onClick={resetFilters}
                  className="flex items-center justify-center text-teal-600 hover:text-teal-800 transition-colors px-4"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="mb-6 text-gray-700">
              <p className="font-medium">
                {filteredClasses.length === 0 
                  ? "No classes match your criteria" 
                  : `Showing ${filteredClasses.length} ${filteredClasses.length === 1 ? 'class' : 'classes'}`}
                {selectedGrade && ` for Grade ${selectedGrade}`}
                {selectedSubject && selectedGrade && ' in'}
                {selectedSubject && ` ${selectedSubject}`}
              </p>
            </div>

            {/* Classes List */}
            <ClassList classes={filteredClasses} />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;