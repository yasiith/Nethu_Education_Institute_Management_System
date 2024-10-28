'use client';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';

const SubjectDropdown = ({ uniqueSubjects, selectedSubject, setSelectedSubject }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle subject selection
    const handleSelectSubject = (subject) => {
        setSelectedSubject(subject); // Set the selected subject
        setIsOpen(false); // Close the dropdown after selecting
    };

    return (
        <div className="relative inline-block text-left">
            {/* Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2 bg-gray-200 rounded-2xl focus:outline-none"
            >
                <span className="mr-2 font-semibold text-3xl text-black">
                    {selectedSubject || 'Subject'} {/* Default text when no subject is selected */}
                </span>
                {/* Arrow Icon */}
                {isOpen ? (
                    <ChevronUpIcon className="w-5 h-5 text-black transition-transform duration-200" />
                ) : (
                    <ChevronDownIcon className="w-5 h-5 text-black transition-transform duration-200" />
                )}
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul className="py-1">
                        {uniqueSubjects.length > 0 ? (
                            uniqueSubjects.map((subject, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelectSubject(subject)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {subject}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No subjects found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SubjectDropdown;
