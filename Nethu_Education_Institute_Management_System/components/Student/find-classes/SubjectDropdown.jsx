'use client'
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid"; // Import Heroicons

const SubjectDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState("Subject"); // Default text

    // Toggle dropdown visibility
    const toggleDropdown = () => setIsOpen(!isOpen);

    // Handle subject selection
    const handleSelectSubject = (grade) => {
        setSelectedSubject(grade); // Set the selected subject
        setIsOpen(false); // Close the dropdown after selecting
    };

    return (
        <div className="relative inline-block text-left">
            {/* Button */}
            <button
                onClick={toggleDropdown}
                className="flex items-center px-4 py-2 bg-gray-200 rounded-2xl focus:outline-none"
            >
                <span className="mr-2 font-semibold text-3xl text-black">{selectedSubject}</span>
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
                            onClick={() => handleSelectSubject("Mathematics")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            Mathematics
                        </li>
                        <li
                            onClick={() => handleSelectSubject("Science")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            Science
                        </li>
                        <li
                            onClick={() => handleSelectSubject("English")}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            English
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SubjectDropdown;
