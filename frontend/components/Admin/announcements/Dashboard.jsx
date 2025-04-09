"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const toAdminOverview = () => {
    router.push("/admin");
  };

  const initialData = [
    {
      id: 1,
      date: "2024-09-30",
      grade: "9",
      subject: "Sinhala",
      description: "No classes today"
    },
    {
      id: 2,
      date: "2024-09-30",
      grade: "10",
      subject: "Math",
      description: "Exam on Chapter 4"
    },
    {
      id: 3,
      date: "2024-09-30",
      grade: "8",
      subject: "Math",
      description: "Class cancelled"
    }
  ];

  const [data, setData] = useState(initialData);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    grade: "",
    subject: "",
    description: ""
  });
  const [error, setError] = useState(""); 
  const [showPopup, setShowPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [selectedForDelete, setSelectedForDelete] = useState();


  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }
  
      try {
        const response = await fetch("http://localhost:5000/api/auth/announcements", {
          method: "GET", 
          headers: {
            "x-auth-token": token, 
            "Content-Type": "application/json", 
          },
        });
  
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
  
        const result = await response.json();
        setData(result.announcements); 
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validateForm = () => {
    const { date, grade, subject, description } = formData;
    if (!date || !grade || !subject || !description) {
      setError("All fields are required.");
      setShowPopup(true);
      return false;
    }
    return true;
  };

  const handleAdd = async () => {
    
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }

    fetch("http://localhost:5000/api/auth/announcements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        date: formData.date,
        grade: formData.grade,
        subject: formData.subject,
        description: formData.description,
      }),
    })

    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      if (data.status === "ok") {
        alert("Announcement added successfully!");
        router.push("/admin/announcements");
      } else {
        alert("Announcement addition failed.");
      }
    })
    .catch((error) => {
      console.error("Error adding announcemet", error);
      alert("An error occurred during adding announcemet.");
    });
}

const handleEdit = (id) => {
  console.log("Editing announcement with ID:", id);
  const selectedRow = data.find((row) => row._id === id);
  console.log(selectedRow);
  
  if (selectedRow) {
    setFormData({
      date: selectedRow.date,
      grade: selectedRow.grade,
      subject: selectedRow.subject,
      description: selectedRow.description
    });
    setEditingId(id);
    console.log(editingId);
    setError("");
  } else {
    console.error("Announcement not found!");
  }
};


  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/announcements/${editingId}`, {
        method: "PUT",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          grade: formData.grade,
          subject: formData.subject,
          description: formData.description,
        }),
      });
  
      const result = await response.json();
      if (response.ok) {
        alert("Update successful!");
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editingId ? { ...formData, id: editingId } : item
          )
        );
        setEditingId(null);
        setFormData({ date: "", grade: "", subject: "", description: "" });
      } else {
        alert(`Error: ${result.message || "Failed to update"}`);
      }
    } catch (error) {
      console.error("Error during update:", error);
      alert("An error occurred while updating.");
    }
  };
  
  
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ date: "", grade: "", subject: "", description: "" });
    setError("");
  };

  const handleDeleteClick = (id) => {
    const selectedRow = data.find((row) => row._id === id);
    
    if (selectedRow) {
      setSelectedForDelete(selectedRow);
      setDeletePopup(true);
      setError("");
    } else {
      console.error("Announcement not found!");
      setError("Announcement not found!");
    }
  };
  
  useEffect(() => {
    if (selectedForDelete) {
      console.log("Selected row for deletion:", selectedForDelete);
    }
  }, [selectedForDelete]);
  
  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/announcements/${selectedForDelete._id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      if (result.status === "ok") {
        setData(data.filter((row) => row._id !== selectedForDelete._id));
        setDeletePopup(false);
        setSelectedForDelete(null);
        alert("Announcement deleted successfully!");
      } else {
        alert("Failed to delete the announcement.");
      }
    } catch (error) {
      console.error("Error deleting announcement:", error);
      alert(`An error occurred while deleting the announcement: ${error.message}`);
    }
  };
  

  const handleCancelDelete = () => {
    setDeletePopup(false);
    setSelectedForDelete(null);
  };

  // Popup component for displaying error
  const ErrorPopup = ({ message, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-2xl transform transition-all">
        <div className="flex items-center justify-center mb-4">
          <div className="rounded-full bg-red-100 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error</h2>
        <p className="text-center text-gray-600 mb-6">{message}</p>
        <div className="flex justify-center">
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Popup component for delete confirmation
  const DeletePopup = ({ onConfirm, onCancel, item }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3 shadow-2xl transform transition-all">
        <div className="flex items-center justify-center mb-4">
          <div className="rounded-full bg-red-100 p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Confirm Deletion</h2>
        <p className="text-center text-gray-600 mb-6">
          Are you sure you want to delete the announcement for <span className="font-medium">grade</span>{" "}
          <span className="font-bold text-indigo-600">{item?.grade}</span> and <span className="font-medium">subject</span>{" "}
          <span className="font-bold text-indigo-600">{item?.subject}</span>?
        </p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow-md transition-all transform hover:scale-105"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-10">
          <button
            onClick={toAdminOverview}
            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg text-white font-medium flex items-center transition-all transform hover:scale-105 shadow-lg mb-4 md:mb-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-800 px-6 py-3 bg-white rounded-lg shadow-md border-l-4 border-indigo-500">
            Announcements Management
          </h1>
        </div>

        {/* Add/Edit Form Card */}
        <div className="bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-xl font-semibold text-white">
              {editingId ? "Edit Announcement" : "Add New Announcement"}
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                <input
                  type="text"
                  name="grade"
                  placeholder="Enter grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Enter subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="mt-6 flex">
              <button
                className={`${
                  editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-emerald-500 hover:bg-emerald-600"
                } text-white px-6 py-2 rounded-lg shadow-md font-medium transition-all transform hover:scale-105 mr-3 flex items-center`}
                onClick={editingId ? handleUpdate : handleAdd}
              >
                {editingId ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Update
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add
                  </>
                )}
              </button>
              {editingId && (
                <button
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md font-medium transition-all transform hover:scale-105 flex items-center"
                  onClick={handleCancel}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-xl font-semibold text-gray-800">All Announcements</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.map((row) => (
                  <tr key={row._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {new Date(row.date).toISOString().split('T')[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                        {row.grade}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {row.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {row.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        {editingId === row._id ? (
                          <>
                            <button
                              className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-md p-2 transition-colors"
                              onClick={handleUpdate}
                              title="Confirm"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                            <button
                              className="bg-gray-400 hover:bg-gray-500 text-white rounded-md p-2 transition-colors"
                              onClick={handleCancel}
                              title="Cancel"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-blue-500 hover:bg-blue-600 text-white rounded-md p-2 transition-colors"
                              onClick={() => handleEdit(row._id)}
                              title="Edit"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              className="bg-red-500 hover:bg-red-600 text-white rounded-md p-2 transition-colors"
                              onClick={() => handleDeleteClick(row._id)}
                              title="Delete"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {data.length === 0 && (
            <div className="py-12 text-center text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg">No announcements found. Add a new one to get started.</p>
            </div>
          )}
        </div>
      </div>

      {/* Error and Delete Popups */}
      {showPopup && (
        <ErrorPopup message={error} onClose={() => setShowPopup(false)} />
      )}

      {deletePopup && (
        <DeletePopup
          item={selectedForDelete}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default Dashboard;