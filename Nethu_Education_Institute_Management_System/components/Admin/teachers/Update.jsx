"use client";
import { useRouter } from "next/navigation"
import { useState } from "react";

const teachersData = [
    {id: '1', fullName: 'John Doe', email:'john@gmail.com'}
]

const Update = () => {
    const router = useRouter();
    const toTeacherDashboard = () => {
        router.push('/admin/teachers')
    }
    const [teacherID, setTeacherID] = useState('');
    const [fullName, setFullName] = useState('');
    const [newFullName, setNewFullName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [email, setEmail] = useState('');

    const handleFindTeacher = () => {
        const teacher = teachersData.find(teacher => teacher.id === teacherID);
        if(teacher){
            setFullName(teacher.fullName);
            setEmail(teacher.email);
        } else {
            alert('Teacher not found');
        }
    }

    const handleUpdateTeacher = () => {
        if (newFullName && newEmail) {
          // Find the student by ID in the studentsData array
          const teacherIndex = teachersData.findIndex(teacher => teacher.id === teacherID);
      
          if (teacherIndex !== -1) {
            // Update the student's full name and email in the array
            teachersData[teacherIndex].fullName = newFullName;
            teachersData[teacherIndex].email = newEmail;
      
            // Reset the input fields after update
            setNewFullName("");
            setNewEmail("");
      
            // Optionally, update the UI to reflect the changes
            setFullName(newFullName);
            setEmail(newEmail);
      
            // Success message
            alert("Teacher updated successfully!");
          } else {
            alert("Teacher not found");
          }
        } else {
          alert("Please enter the new full name and email.");
        }
      };
      
      

  return (
    <div className='flex flex-col items-center'>
      <div className='bg-gray-300 w-1/2 m-5 flex flex-col items-center rounded-[35px] p-5'>
        <h1 className='text-4xl font-bold'>TEACHER MANAGEMENT</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 max-w-4xl">
        <div className='flex flex-col gap-6 items-center pb-10'>
            <div className='bg-teal-500 rounded-[35px] flex items-center w-[400px] h-[350px] justify-center'>
                <div className='flex flex-col text-white m-5'>
                    <p className='text-[50px] font-semibold'>UPDATE</p>
                    <p className='text-[75px] font-bold leading-none'>TEACHER</p>
                </div>
            </div>
            <button 
            onClick={toTeacherDashboard}
            className='bg-red-500 w-[400px] h-[90px] rounded-[30px] text-white font-bold text-[50px] '>
                BACK
            </button>
        </div>
        <div className="bg-gray-400 w-[400px] p-8 rounded-[40px] flex flex-col gap-4 m-5">
          <label className="text-white text-lg font-bold">Enter Teacher ID</label>
          <input
            type="text"
            value={teacherID}
            onChange={(e) => setTeacherID(e.target.value)}
            placeholder="Teacher ID"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />
          <button 
            onClick={handleFindTeacher}
            className="bg-red-500 w-full py-2 rounded-[30px] text-white font-bold text-lg ">
            SEARCH
          </button>

          <label className="text-white text-lg font-bold">Full Name</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            readonly
            placeholder="Full Name"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <label className="text-white text-lg font-bold">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            readonly
            placeholder="Email"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />

          <label className="text-white text-lg font-bold">New Full Name</label>
          <input type="text"
            value={newFullName}
            onChange={(e) => setNewFullName(e.target.value)}
            placeholder="New Full Name"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />
          <label className="text-white text-lg font-bold">New Email</label>
          <input type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New Email"
            className="p-2 rounded-[30px] border-none focus:ring-2 focus:ring-teal-500"
          />
          <button 
            onClick={handleUpdateTeacher}
            className="bg-red-500 w-full py-2 rounded-[30px] text-white font-bold text-lg ">
            UPDATE TEACHER
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Update
