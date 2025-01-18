"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const router = useRouter();
  const [enrolledClasses, setEnrolledClasses] = useState([]);
  const [error, setError] = useState(null); // Error state to capture errors

  // Get MongoDB ID from localStorage
  const studentMongoId = typeof window !== 'undefined' ? localStorage.getItem("studentMongoId") : null;

  const toFindClasses = () => {
    router.push('/student/find-classes');
  };

  const handleClassClick = (classId) => {
    // Redirect to class details page (change this route as needed)
    router.push(`/student/class-details`);
  };

  const name = localStorage.getItem('name');


  useEffect(() => {
    if (studentMongoId) {
      fetch(`http://localhost:5000/classes/student/${studentMongoId}`)
        .then(response => response.json())
        .then(data => {
          if (data.classes) {
            setEnrolledClasses(data.classes);
            setError(null); // Clear error if successful
          } else {
            setError("Failed to fetch enrolled classes");
          }
        })
        .catch(error => {
          console.error("Error fetching classes:", error);
          setError("Error fetching classes. Please try again later.");
        });
    } else {
      setError("Student ID not found.");
    }
  }, [studentMongoId]);

  return (
    <div className='p-10'>
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='inline-block'>
          <div className='bg-gray-200 rounded-3xl'>
            <div className='p-5 whitespace-nowrap'>
              <h1 className='text-4xl font-bold'>Welcome, {name}</h1> 
            </div>
          </div>
        </div>
        <div className='my-6'>
          <h2 className='text-2xl font-bold'>Announcements</h2>
        </div>
        <div className='inline-block p-10'>
          <div className='bg-gray-200 rounded-3xl'>
            <div className='p-5 whitespace-nowrap'>
              <h1 className='text-4xl font-bold'>Enrolled Classes</h1>
              {error && <p className="text-red-500 mt-5">{error}</p>} {/* Display errors */}
              {enrolledClasses.length > 0 ? (
                <ul className='mt-5 space-y-4'>
                  {enrolledClasses.map((cls) => (
                    <li
                      key={cls._id}
                      className='p-4 bg-white rounded-lg shadow-md cursor-pointer hover:bg-gray-300 transition-all'
                      onClick={() => handleClassClick(cls._id)} // Add click handler
                    >
                      <p><strong>Grade:</strong> {cls.grade}</p>
                      <p><strong>Subject:</strong> {cls.subject}</p>
                      <p><strong>Teacher:</strong> {cls.teacher}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className='mt-5 text-gray-600'>No enrolled classes.</p>
              )}
            </div>
          </div>
        </div>
        <div className='inline-block'>
          <button
            onClick={toFindClasses}
            className='bg-gray-200 text-gray-800 text-4xl text-center font-bold rounded-[25px] p-5 cursor-pointer hover:shadow-xl transition-shadow duration-300'
          >
            Find a class
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
