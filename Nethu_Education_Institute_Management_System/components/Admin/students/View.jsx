"use client";
import { useRouter } from "next/navigation";

const studentsData = [
    { id: "1", fullName: "John Doe", email: "john@gmail.com" },
    { id: "2", fullName: "Jane Smith", email: "jane.smith@example.com" },
    { id: "3", fullName: "Michael Brown", email: "michael.brown@example.com" }
];


const View = () => {
    const router = useRouter();
    const handleBack = () => {
        router.push("/admin/students");
    }
  return (
    <div>
        <div className="flex justify-between items-center mb-5 p-5">
          <button 
            onClick={handleBack}
            className='bg-red-500 w-[200px] h-[70px] rounded-[30px] text-white font-bold text-4xl '>
                BACK
          </button>
        <h1 className=" bg-[#D7D7D7] py-4 px-8 rounded-full text-[40px] font-bold text-[#3b3b3b]">
          VIEW STUDENTS
        </h1>
      </div>
      <div className="flex flex-col items-center pb-10 ml-10 mr-10 mt-">
        <div className="bg-gray-200 w-full p-4 rounded-xl">
            <table className="table-auto w-full text-justify text-[30px]">
            <thead>
                <tr className="font-bold text-gray-800 text-[30px]">
                <th className="p-3">Student ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                </tr>
            </thead>
            <tbody>
                {studentsData.map((student) => (
                <tr key={student.id} className="bg-gray-100 text-gray-700">
                    <td className="p-3">{student.id}</td>
                    <td className="p-3">{student.fullName}</td>
                    <td className="p-3">{student.email}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default View
