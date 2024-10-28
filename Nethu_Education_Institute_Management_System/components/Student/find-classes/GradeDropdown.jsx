'use client';
import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/solid';


const GradeDropdown = ({ uniqueGrades, selectedGrade, setSelectedGrade }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle grade selection
    const handleSelectGrade = (grade) => {
        setSelectedGrade(grade); // Set the selected grade from the prop
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
                    {selectedGrade || 'Grade'} {/* Default text when no grade is selected */}
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
                        {uniqueGrades.length > 0 ? (
                            uniqueGrades.map((grade, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSelectGrade(grade)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                >
                                    {grade}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500">No grades found</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GradeDropdown;
