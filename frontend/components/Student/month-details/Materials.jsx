'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Materials = () => {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const classid = searchParams.get('classid');
    const month = searchParams.get('month');

    if (!classid || !month) return;

    const fetchMaterials = async () => {
      const privacy = "Public"; // Privacy is always public for students.
      console.log("Fetching materials for:", { classid, month, privacy });

      try {
        const response = await fetch("http://localhost:5000/api/materials/getMaterialsforstudent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classid, month, privacy }),
        });

        if (!response.ok) throw new Error("Failed to fetch materials.");

        const fileData = await response.json();
        setFiles(fileData);
        console.log("Materials fetched:", fileData);  

      } catch (error) {
        setError("Error fetching materials.");
      }
    };

    fetchMaterials();
  }, [searchParams]); // Runs every time searchParams change

  return (
    <div className="max-w-2xl mx-auto mt-6 p-4 border rounded shadow-md">
      <h2 className="text-lg font-bold mb-4">Materials</h2>
      <p className="mb-4">Materials posted by the teacher for that month will be visible here.</p>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      {files.length === 0 ? (
        <p>No materials available.</p>
      ) : (
        <ul>
          {files.map((fileData, index) => (
            <li key={index} className="bg-blue-100 mb-4 p-4 border rounded shadow-sm">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <h3 className="font-semibold">{fileData.title}</h3>
                  <p>Description: {fileData.description}</p>
                  <p>Month: {fileData.month}</p>
                  <a 
                    href={`http://localhost:5000${fileData.fileUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-600 mt-2"
                  >
                    View File
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Materials;
