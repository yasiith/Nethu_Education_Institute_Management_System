'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { FileText, Upload, Calendar, Lock, Unlock, Book, Trash, Eye, ChevronDown, X, AlertCircle, Check, Menu, ArrowLeft, LogOut } from 'lucide-react';

// Sidebar Component - Preserving the original styling and functionality
const Sidebar = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const { classId } = useParams();
  const [selectedClass, setSelectedClass] = useState(classId || null);

  const handleLogout = async () => {
    try {
      localStorage.clear();
      window.location.href = "/Login";
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const fetchClasses = async () => {
    const teacherID = localStorage.getItem("TeacherID");
    if (!teacherID) {
      alert("TeacherID not found. Please log in again.");
      return;
    }

    try {
      const response = await fetch(
        `https://nethu-education-institute-management.onrender.com/api/classes/getClassesByTeacher?teacherId=${teacherID}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        alert("Error fetching classes");
      }

      const data = await response.json();
      setClasses(data);
    } catch (error) {
      console.error("Error loading classes:", error);
      alert("Error loading classes: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassClick = (classId) => {
    setSelectedClass(classId);
    window.location.href = `/teachers/classes/${classId}`;
  };

  const handleClickBack = () => { 
    window.location.href = '/teachers';
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className="fixed z-30 p-2 text-white bg-blue-600 rounded-md top-4 left-4 md:hidden"
        aria-label="Toggle Menu"
      >
        <Menu size={24} />
      </button>

      <div
        className={`fixed top-0 left-0 z-20 h-screen bg-[#03045E] text-white flex flex-col items-center p-4 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full bg"
        } md:translate-x-0 md:w-1/5`}
      >
        <h1 className="mb-6 text-4xl font-semibold">NEIMS</h1>

        {/* Display Teacher's Classes */}
        <div className="flex flex-col w-full overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-[#03045E] [&::-webkit-scrollbar-thumb]:bg-[#03045E] [&::-webkit-scrollbar-thumb]:rounded-full">
          <h2 className="mb-3 text-lg font-semibold text-center text-teal-400">
            Your Classes
          </h2>

          {loading ? (
            <div className="text-center text-gray-300">Loading classes...</div>
          ) : (
            <div className="flex flex-col w-full gap-4 mt-3">
              {classes.length > 0 ? (
                classes.map((classItem) => (
                  <div
                    key={classItem._id}
                    onClick={() => handleClassClick(classItem.classid)}
                    className={`flex flex-col items-center w-full p-4 transition duration-300 rounded-md shadow-md cursor-pointer ${
                      selectedClass === classItem.classid
                        ? "bg-teal-500" // Highlight selected class
                        : "bg-teal-800 hover:bg-teal-600"
                    }`}
                  >
                    <h2 className="font-bold text-center text-white text-md">
                      {classItem.year}
                    </h2>
                    <h2 className="font-bold text-center text-white text-md">
                      Grade {classItem.grade}
                    </h2>
                    <p className="font-bold text-center text-white text-md">
                      {classItem.subject}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500 col-span-full">
                  No classes available.
                </p>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Buttons */}
        <div className="w-full mt-auto">
          <button
            onClick={handleClickBack}
            className="flex items-center justify-center w-full py-2 my-2 text-sm font-medium text-white transition-all bg-[#0077B6] rounded-md hover:bg-[#0096C7]">
            <ArrowLeft size={16} className="mr-2" />
            DASHBOARD
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full py-2 text-sm font-medium text-white transition-all bg-red-600 rounded-md hover:bg-red-700"
          >
            <LogOut size={16} className="mr-2" />
            LOG OUT
          </button>
        </div>
      </div>

      {/* Dim Background for Open Sidebar */}
      {isOpen && (
        <div
          onClick={toggleSidebar}
          className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
        />
      )}
    </>
  );
};

// Main Materials Management Component
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
  const [success, setSuccess] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    const fetchMaterials = async () => {
      const classid = params?.classId;
      if (!classid) return;

      try {
        setLoading(true);
        const response = await fetch("https://nethu-education-institute-management.onrender.com/api/materials/getMaterialsbyclassid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ classid }),
        });

        if (!response.ok) throw new Error("Failed to fetch materials.");

        const data = await response.json();
        setUploadedFiles(data);
      } catch (error) {
        setError("Error fetching materials.");
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [params?.classId]);

  const toggleUploadForm = () => {
    setIsUploadVisible(!isUploadVisible);
    if (!isUploadVisible) {
      // Reset form when opening
      setError(null);
      setSuccess(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !title || !description || !month || !privacy) {
      setError("Please fill in all required fields");
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
      
      const response = await fetch("https://nethu-education-institute-management.onrender.com/api/materials/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message);

      setSuccess("Material uploaded successfully!");
      
      // Reset form after successful upload
      setFile(null);
      setTitle('');
      setDescription('');
      setMonth('');
      setPrivacy('');
      
      // Refresh materials list
      const refreshResponse = await fetch("https://nethu-education-institute-management.onrender.com/api/materials/getMaterialsbyclassid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ classid: params?.classId }),
      });
      
      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        setUploadedFiles(refreshData);
      }
      
    } catch (error) {
      setError("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Include the Sidebar */}
      <Sidebar />
      
      {/* Main Content - Added gap between sidebar and content */}
      <div className="flex-1 py-8 md:ml-[20%]">
        {/* Add proper padding and spacing */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile-only spacing */}
          <div className="mb-8 pl-16 md:pl-0">
            <h1 className="text-2xl md:text-3xl font-bold text-teal-800">Class Materials</h1>
            <p className="text-teal-600 mt-2">Upload and manage learning materials for your class</p>
          </div>
          
          {/* Main Content */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden ml-16 md:ml-0">
            {/* Action Bar */}
            <div className="p-6 bg-gradient-to-r from-teal-500 to-green-500 flex justify-between items-center">
              <div className="flex items-center space-x-2 text-white">
                <Book size={24} />
                <span className="text-xl font-medium">Learning Materials</span>
              </div>
              <button 
                onClick={toggleUploadForm} 
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                {isUploadVisible ? (
                  <>
                    <X size={18} /> Cancel Upload
                  </>
                ) : (
                  <>
                    <Upload size={18} /> Add New Material
                  </>
                )}
              </button>
            </div>
            
            {/* Upload Form */}
            {isUploadVisible && (
              <div className="p-6 border-b border-gray-200 bg-white">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-teal-700 flex items-center">
                    <Upload size={20} className="mr-2" />
                    Upload New Material
                  </h2>
                  
                  {/* File Upload */}
                  <div className="border-2 border-dashed border-teal-200 rounded-lg p-6 bg-teal-50">
                    <input 
                      type="file" 
                      id="file-upload"
                      onChange={(e) => setFile(e.target.files[0])} 
                      className="hidden" 
                      accept="application/pdf" 
                    />
                    <label 
                      htmlFor="file-upload" 
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <FileText size={40} className="text-teal-500 mb-3" />
                      <span className="text-sm text-teal-700 font-medium text-center">
                        {file ? file.name : "Click to select a PDF file"}
                      </span>
                      <span className="text-xs text-teal-500 mt-1">
                        {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "PDF files only"}
                      </span>
                    </label>
                  </div>
                  
                  {/* Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Enter material title" 
                        className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">Month</label>
                      <div className="relative">
                        <select 
                          value={month} 
                          onChange={(e) => setMonth(e.target.value)} 
                          className="appearance-none px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                        >
                          <option value="">Select Month</option>
                          {months.map((m) => <option key={m} value={m}>{m}</option>)}
                        </select>
                        <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="Enter material description" 
                      rows="3" 
                      className="px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Privacy Settings</label>
                    <div className="relative">
                      <select 
                        value={privacy} 
                        onChange={(e) => setPrivacy(e.target.value)} 
                        className="appearance-none px-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                      >
                        <option value="">Select Privacy</option>
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                      </select>
                      <ChevronDown size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                    <p className="text-xs text-gray-500">
                      {privacy === 'Public' ? 'Public materials are visible to all students in this class' : 
                       privacy === 'Private' ? 'Private materials are only visible to selected students' : 
                       'Select whether all students can see this material'}
                    </p>
                  </div>
                  
                  {/* Error and Success Messages */}
                  {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 p-4 flex items-center">
                      <AlertCircle size={20} className="text-red-500 mr-2" />
                      <p className="text-red-700">{error}</p>
                    </div>
                  )}
                  
                  {success && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 flex items-center">
                      <Check size={20} className="text-green-500 mr-2" />
                      <p className="text-green-700">{success}</p>
                    </div>
                  )}
                  
                  {/* Submit Button */}
                  <button 
                    onClick={handleUpload} 
                    disabled={uploading} 
                    className="mt-2 w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {uploading ? (
                      <>
                        <div className="animate-spin mr-2 h-5 w-5 border-4 border-white border-t-transparent rounded-full"></div>
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <span>Upload Material</span>
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {/* Materials List */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-teal-700 mb-6 flex items-center">
                <FileText size={20} className="mr-2" />
                Uploaded Materials
              </h2>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
                  <span className="ml-3 text-teal-600">Loading materials...</span>
                </div>
              ) : uploadedFiles.length === 0 ? (
                <div className="bg-teal-50 p-8 rounded-lg text-center">
                  <FileText size={48} className="mx-auto text-teal-300 mb-4" />
                  <h3 className="text-lg font-medium text-teal-700 mb-2">No Materials Yet</h3>
                  <p className="text-teal-600">Upload your first material to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {uploadedFiles.map((fileData, index) => (
                    <MaterialCard 
                      key={fileData._id || index} 
                      fileData={fileData} 
                      setUploadedFiles={setUploadedFiles} 
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MaterialCard = ({ fileData, setUploadedFiles }) => {
  const togglePrivacy = async (materialId, currentPrivacy) => {
    try {
      const newPrivacy = currentPrivacy === "Public" ? "Private" : "Public";
      await fetch(`https://nethu-education-institute-management.onrender.com/api/materials/togglePrivacy/${materialId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ privacy: newPrivacy }),
      });
      setUploadedFiles((prevFiles) => prevFiles.map((file) => 
        file._id === materialId ? { ...file, privacy: newPrivacy } : file
      ));
    } catch (error) {
      alert("Error updating privacy.");
    }
  };

  const deleteFile = async (materialId) => {
    if (!confirm("Are you sure you want to delete this material?")) return;
    
    try {
      const response = await fetch(`https://nethu-education-institute-management.onrender.com/api/materials/delete/${materialId}`, {
        method: "DELETE",
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message);
  
      // Remove the file from the UI
      setUploadedFiles((prevFiles) => prevFiles.filter((file) => file._id !== materialId));
    } catch (error) {
      alert("Error deleting material.");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <div className="border-l-4 border-teal-500">
        <div className="p-5">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="bg-teal-100 p-2 rounded-lg mr-4">
                  <FileText size={20} className="text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{fileData.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    <span>{fileData.month || "No month specified"}</span>
                    {fileData.privacy && (
                      <span className={`ml-3 inline-flex items-center ${fileData.privacy === 'Public' ? 'text-green-600' : 'text-orange-600'}`}>
                        {fileData.privacy === 'Public' ? (
                          <><Unlock size={14} className="mr-1" /> Public</>
                        ) : (
                          <><Lock size={14} className="mr-1" /> Private</>
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <p className="mt-3 text-gray-600">{fileData.description}</p>
            </div>
            
            <div className="ml-0 mt-4 md:mt-0 md:ml-4 flex flex-row md:flex-col space-y-0 space-x-2 md:space-y-2 md:space-x-0">
              <a 
                href={`https://nethu-education-institute-management.onrender.com${fileData.fileUrl}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 flex items-center justify-center gap-2 text-sm"
              >
                <Eye size={16} />
                <span>View</span>
              </a>
              
              <button 
                onClick={() => togglePrivacy(fileData._id, fileData.privacy)} 
                className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 flex items-center justify-center gap-2 text-sm"
              >
                {fileData.privacy === "Public" ? (
                  <>
                    <Lock size={16} />
                    <span>Make Private</span>
                  </>
                ) : (
                  <>
                    <Unlock size={16} />
                    <span>Make Public</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => deleteFile(fileData._id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 flex items-center justify-center gap-2 text-sm"
              >
                <Trash size={16} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageMaterialsPage;