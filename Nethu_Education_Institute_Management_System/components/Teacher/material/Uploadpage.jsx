'use client';
import { useState } from 'react';
import { FileText } from 'lucide-react'; // Using lucide-react for the FileText icon

const ManageMaterialsPage = () => {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Toggle visibility of the upload section
  const navigateToMaterials = () => {
    setIsUploadVisible(!isUploadVisible);  // Toggle the visibility
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleUpload = async () => {
    if (!file || !title || !description) {
      setError("Please fill in all fields (file, title, and description).");
      return;
    }

    // Simulating the file upload process
    try {
      setUploading(true);
      setError(null);
      // Simulate a delay for the upload process
      setTimeout(() => {
        // Simulate adding the uploaded file to the list
        setUploadedFiles([...uploadedFiles, { file, title, description }]);
        alert(`File uploaded successfully with the title: "${title}" and description: "${description}"`);
        setUploading(false);
        setFile(null); // Reset the file after successful upload
        setTitle('');  // Reset the title
        setDescription('');  // Reset the description
      }, 2000);
    } catch (err) {
      setUploading(false);
      setError("Failed to upload file. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow-md">
      {/* Button to toggle the visibility of the upload section */}
      <button
        onClick={navigateToMaterials}
        className="flex-1 bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 flex items-center justify-center gap-2 transition-all"
      >
        <FileText size={20} />
        Manage Materials
      </button>

      {/* Conditional Rendering: Upload section */}
      {isUploadVisible && (
        <div className="mt-6">
          <h1 className="text-2xl font-bold mb-4">Upload Material</h1>
          
          {/* File input */}
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 p-2 border rounded"
            accept="application/pdf"
          />

          {/* Title input */}
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter file title"
            className="mb-4 p-2 border rounded w-full"
          />

          {/* Description input */}
          <textarea
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Enter file description"
            rows="4"
            className="mb-4 p-2 border rounded w-full"
          />

          {/* Error message */}
          {error && <div className="text-red-500">{error}</div>}

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      )}

      {/* Uploaded Files List */}
      <UploadedFilesList files={uploadedFiles} />
    </div>
  );
};

// Component to display uploaded files
const UploadedFilesList = ({ files }) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold mb-4">Uploaded Materials</h2>
      {files.length === 0 ? (
        <p>No materials uploaded yet.</p>
      ) : (
        <ul>
          {files.map((fileData, index) => (
            <li key={index} className="mb-4 p-4 border rounded shadow-sm">
              <h3 className="font-semibold">{fileData.title}</h3>
              <p>{fileData.description}</p>
              <a
                href="#"
                className="text-blue-500 hover:text-blue-600 mt-2 block"
              >
                View File
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ManageMaterialsPage;
