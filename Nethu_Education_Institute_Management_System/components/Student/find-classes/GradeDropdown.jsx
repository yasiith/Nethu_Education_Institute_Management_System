'use client'
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"; // Import Heroicons

const GradeDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGrade, setSelectedGrade] = useState("Grade"); // Default text

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle grade selection
    const handleSelectGrade = (grade) => {
        setSelectedGrade(grade); // Set the selected grade
        setIsOpen(false); // Close the dropdown after selecting
    };

    return (
        <div className="relative inline-block text-left">
            {/* Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2 bg-gray-200 rounded-2xl focus:outline-none"
            >
                <span className="mr-2 font-semibold text-3xl text-black">{selectedGrade}</span>
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
                        <li
                            onClick={() => handleSelectGrade("Grade 6")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            Grade 6
                        </li>
                        <li
                            onClick={() => handleSelectGrade("Grade 7")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            Grade 7
                        </li>
                        <li
                            onClick={() => handleSelectGrade("Grade 8")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            Grade 8
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default GradeDropdown;
