'use client';

import Image from 'next/image';
import { useState } from 'react';

const TeacherProfile = () => {
  const [teacher, setTeacher] = useState({
    name: 'Yasith Vimukthi',
    email: 'yasith123@gmail.com',
    subject: 'Mathematics',
    avatar: '/assets/icons/user.png',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(teacher);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTeacher(formData);
    setIsEditing(false);
  };

  return (
    <div className='p-10'>
      <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4 flex items-center justify-center bg-blue-100">
          <Image
            className="rounded-full border-4 border-white"
            src={teacher.avatar}
            alt="teacher Avatar"
            width={100}
            height={100}
          />
        </div>
        <div className="p-4">
          {!isEditing ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 text-center">
                {teacher.name}
              </h2>
              <p className="text-gray-600 text-sm text-center">{teacher.email}</p>
              <p className="text-gray-600 text-sm text-center">{teacher.subject}</p>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="Email"
              />
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                placeholder="subject"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium rounded"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
        <div className="p-4 border-t text-center">
          {!isEditing && (
            <button
              onClick={handleEditClick}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
