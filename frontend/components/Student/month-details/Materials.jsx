'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Materials = () => {
  const searchParams = useSearchParams();
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const classid = searchParams.get('classid');
    const month = searchParams.get('month');

    if (!classid || !month) {
      setLoading(false);
      return;
    }

    const fetchMaterials = async () => {
      const privacy = "Public"; // Privacy is always public for students.
      console.log("Fetching materials for:", { classid, month, privacy });

      try {
        const response = await fetch("https://nethu-education-institute-management.onrender.com/api/materials/getMaterialsforstudent", {
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
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [searchParams]); // Runs every time searchParams change

  // File type icons mapping
  const getFileIcon = (fileUrl) => {
    if (!fileUrl) return "document";
    
    const extension = fileUrl.split('.').pop().toLowerCase();
    
    if (['pdf'].includes(extension)) {
      return "pdf";
    } else if (['doc', 'docx'].includes(extension)) {
      return "word";
    } else if (['xls', 'xlsx'].includes(extension)) {
      return "excel";
    } else if (['ppt', 'pptx'].includes(extension)) {
      return "powerpoint";
    } else if (['jpg', 'jpeg', 'png', 'gif', 'svg'].includes(extension)) {
      return "image";
    } else if (['mp4', 'mov', 'avi', 'webm'].includes(extension)) {
      return "video";
    } else if (['mp3', 'wav', 'ogg'].includes(extension)) {
      return "audio";
    } else {
      return "document";
    }
  };

  // Render file icon based on type
  const renderFileIcon = (fileUrl) => {
    const iconType = getFileIcon(fileUrl);
    
    switch (iconType) {
      case "pdf":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <text x="9.5" y="16" className="text-xs font-bold" fill="currentColor">PDF</text>
          </svg>
        );
      case "word":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            <text x="9" y="16" className="text-xs font-bold" fill="currentColor">DOC</text>
          </svg>
        );
      case "image":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case "video":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        );
    }
  };

  return (
    <div className="w-full">
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      ) : files.length === 0 ? (
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-6 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-emerald-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <h3 className="text-lg font-medium text-emerald-800 mb-2">No Materials Available</h3>
          <p className="text-emerald-600">The teacher hasn't posted any materials for this month yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {files.map((fileData, index) => (
            <div key={index} className="bg-white border border-emerald-100 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* File Icon Section */}
                <div className="bg-gradient-to-br from-teal-50 to-emerald-100 p-4 flex items-center justify-center md:w-24">
                  {renderFileIcon(fileData.fileUrl)}
                </div>
                
                {/* Content Section */}
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-emerald-800 mb-2">{fileData.title}</h3>
                  
                  {fileData.description && (
                    <p className="text-gray-600 mb-3">{fileData.description}</p>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {fileData.month}
                    </span>
                    
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      {fileData.privacy || "Public"}
                    </span>
                  </div>
                  
                  <a 
                    href={`https://nethu-education-institute-management.onrender.com${fileData.fileUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Materials;