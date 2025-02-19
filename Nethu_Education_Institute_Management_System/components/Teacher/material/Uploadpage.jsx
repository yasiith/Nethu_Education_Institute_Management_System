'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FileText } from 'lucide-react';

const ManageMaterialsPage = () => {
  const params = useParams();
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [month, setMonth] = useState('');
  const [privacy, setPrivacy] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchMaterials = async () => {
      const classid = params?.classId;
      if (!classid) return;

      try {
        const response = await fetch("http://localhost:5000/api/materials/getMaterialsbyclassid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classid }),
        });

        if (!response.ok) throw new Error("Failed to fetch materials.");

        const data = await response.json();
        setUploadedFiles(data);
      } catch (error) {
        setError("Error fetching materials.");
      }
    };

    fetchMaterials();
  }, [params?.classId]);

  const navigateToMaterials = () => {
    setIsUploadVisible(!isUploadVisible);
  };

  const handleUpload = async () => {
    if (!file || !title || !description || !month || !privacy) {
      setError("Please fill in all fields (file, title, description, and month).")
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("month", month);
    formData.append("privacy", privacy);
    formData.append("classid", params?.classId);

    try {
      setUploading(true);
      setError(null);
      
      const response = await fetch("http://localhost:5000/api/materials/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      alert("File uploaded successfully!");
      setUploading(false);
    } catch (error) {
      setUploading(false);
      setError("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow-md">
      <button onClick={navigateToMaterials} className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 flex items-center justify-center gap-2">
        <FileText size={20} /> Add New Materials
      </button>

      {isUploadVisible && (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Upload Material</h1>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4 p-2 border rounded" accept="application/pdf" />
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter file title" className="mb-4 p-2 border rounded w-full" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter file description" rows="4" className="mb-4 p-2 border rounded w-full" />
          <select value={month} onChange={(e) => setMonth(e.target.value)} className="mb-4 p-2 border rounded w-full">
            <option value="">Select Month</option>
            {months.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={privacy} onChange={(e) => setPrivacy(e.target.value)} className="mb-4 p-2 border rounded w-full">
            <option value="">Select Privacy</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          {error && <div className="text-red-500">{error}</div>}
          <button onClick={handleUpload} disabled={uploading} className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400">
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}
      <UploadedFilesList files={uploadedFiles} setUploadedFiles={setUploadedFiles} />
    </div>
  );
};

const UploadedFilesList = ({ files, setUploadedFiles }) => {
  const togglePrivacy = async (materialId, currentPrivacy) => {
    try {
      const newPrivacy = currentPrivacy === "Public" ? "Private" : "Public";
      await fetch(`http://localhost:5000/api/materials/togglePrivacy/${materialId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privacy: newPrivacy }),
      });
      setUploadedFiles((prevFiles) => prevFiles.map((file) => file._id === materialId ? { ...file, privacy: newPrivacy } : file));
    } catch (error) {
      alert("Error updating privacy.");
    }
  };

  const deleteFile = async (materialId) => {
    console.log(materialId);
    try {
      const response = await fetch(`http://localhost:5000/api/materials/delete/${materialId}`, {  // Corrected URL
        method: "DELETE",
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message);
  
      alert("Material deleted successfully!");
  
      // Remove the file from the UI
      setUploadedFiles((prevFiles) => prevFiles.filter((file) => file._id !== materialId));
    } catch (error) {
      alert("Error deleting material.");
    }
  };
  
  
 
  
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Uploaded Materials</h2>
      {files.length === 0 ? <p>No materials uploaded yet.</p> : (
        <ul>
          {files.map((fileData, index) => (
            <li key={index} className="bg-blue-100 mb-4 p-4 border rounded shadow-sm">
              <div className="flex justify-between">
                {/* File Info on the Left */}
                <div className="flex flex-col justify-between">
                  <h3 className="font-semibold">{fileData.title}</h3>
                  <p>Description: {fileData.description}</p>
                  <p>Month: {fileData.month}</p>
                  {/* <p>Privacy: {fileData.privacy}</p> */}
                  <a 
                    href={`http://localhost:5000${fileData.fileUrl}`} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:text-blue-600 mt-2 block"
                  >
                    View File
                  </a>
                </div>

                {/* Action Buttons on the Right */}
                  <div className="flex flex-col justify-between gap-2">
                    <button 
                      onClick={() => togglePrivacy(fileData._id, fileData.privacy)} 
                      className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 h-12 w-32"
                    >
                      {fileData.privacy === "Public" ? "Make Private" : "Make Public"}
                    </button>
                    <button
                      onClick={() => deleteFile(fileData._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 h-12 w-32"
                    >
                      Delete
                    </button>
                  </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageMaterialsPage;