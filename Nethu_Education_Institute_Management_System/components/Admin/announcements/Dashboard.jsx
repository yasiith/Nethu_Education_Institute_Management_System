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
  const [error, setError] = useState(""); // State for handling errors
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [deletePopup, setDeletePopup] = useState(false); // State to control delete confirmation popup
  const [selectedForDelete, setSelectedForDelete] = useState(); // Store the row selected for deletion


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
      setShowPopup(true); // Show the popup
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
          // Include relevant fields for the update
          
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
        setEditingId(null); // Reset editing mode
        setFormData({ date: "", grade: "", subject: "", description: "" }); // Clear the form
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
      setSelectedForDelete(selectedRow); // Set the selected row for deletion
      setDeletePopup(true); // Show the delete confirmation popup
      setError(""); // Clear any previous errors
    } else {
      console.error("Announcement not found!");
      setError("Announcement not found!"); // Show an error message if not found
    }
  };
  
  // UseEffect to log selectedForDelete when it changes
  useEffect(() => {
    if (selectedForDelete) {
      console.log("Selected row for deletion:", selectedForDelete);
    }
  }, [selectedForDelete]);
  
  const handleConfirmDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found. Please log in.");
      return; // Optionally, you can redirect the user to the login page here
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/auth/announcements/${selectedForDelete._id}`, {
        method: "DELETE",
        headers: {
          "x-auth-token": token, // Include the token here
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      if (result.status === "ok") {
        setData(data.filter((row) => row._id !== selectedForDelete._id)); // Update local state
        setDeletePopup(false); // Hide the delete confirmation popup
        setSelectedForDelete(null); // Reset the selected row
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
    setDeletePopup(false); // Hide the delete confirmation popup
    setSelectedForDelete(null); // Reset the selected row
  };

  // Popup component for displaying error
  const ErrorPopup = ({ message, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-2xl font-bold text-center text-red-500 mb-4">
          ERROR
        </h2>
        <p className="text-lg font-bold mb-6">{message}</p>
        <button
          className="bg-red-500 text-white px-6 py-2 rounded"
          onClick={onClose}
        >
          CLOSE
        </button>
      </div>
    </div>
  );

  // Popup component for delete confirmation
  const DeletePopup = ({ onConfirm, onCancel, item }) => (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-2xl text-center font-bold text-red-500 mb-4">
          CONFIRM DELETION
        </h2>
        <p className="mb-4">
          Are you sure you want to delete the announcement for <b>grade</b>{" "}
          <strong>{item?.grade}</strong> and <b>subject</b>{" "}
          <strong>{item?.subject}</strong>?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-500 text-white px-6 py-2 rounded"
            onClick={onConfirm}
          >
            CONFIRM
          </button>
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded"
            onClick={onCancel}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full relative bg-[#E8E9EB] p-10">
      <div className="flex justify-between items-center mb-16">
        <button
          onClick={toAdminOverview}
          className="bg-red-500 w-[200px] h-[70px] rounded-[30px] text-white font-bold text-4xl "
        >
          BACK
        </button>
        <h1 className=" bg-[#D7D7D7] py-4 px-8 rounded-full text-4xl font-bold text-[#3b3b3b]">
          ANNOUNCEMENTS
        </h1>
      </div>

      <table className="min-w-full bg-white rounded-[20px]">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="text-2xl py-3 px-5">Date</th>
            <th className="text-2xl py-3 px-5">Grade</th>
            <th className="text-2xl py-3 px-5">Subject</th>
            <th className="text-2xl py-3 px-5">Description</th>
            <th className="text-2xl py-3 px-5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row._id} className="border-b">
              <td className="py-3 px-5 text-center">
                {new Date(row.date).toISOString().split('T')[0]} {/* Or use date-fns or moment */}
              </td>
              <td className="py-3 px-5 text-center">{row.grade}</td>
              <td className="py-3 px-5 text-center">{row.subject}</td>
              <td className="py-3 px-5 text-center">{row.description}</td>
              <td className="py-3 px-5 flex justify-center items-center space-x-3">
                {editingId === row._id ? (
                  <>
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded-lg"
                      onClick={handleUpdate}
                    >
                      OK
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={handleCancel}
                    >
                      CANCEL
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleEdit(row._id)}
                    >
                      UPDATE
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteClick(row._id)}
                    >
                      DELETE
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          {editingId ? "Edit Announcement" : "Add Announcement"}
        </h2>
        <div className="grid grid-cols-4 gap-4">
          <input
            type="date"
            name="date"
            placeholder="Date"
            value={formData.date}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <button
            className={`bg-${
              editingId ? "blue" : "green"
            }-500 text-white px-6 py-2 rounded mr-2`}
            onClick={editingId ? handleUpdate : handleAdd}
          >
            {editingId ? "UPDATE" : "ADD"}
          </button>
          {editingId && (
            <button
              className="bg-gray-500 text-white px-6 py-2 rounded"
              onClick={handleCancel}
            >
              CANCEL
            </button>
          )}
        </div>
      </div>

      {/* Show Popup when there's an error */}
      {showPopup && (
        <ErrorPopup message={error} onClose={() => setShowPopup(false)} />
      )}

      {/* Show delete confirmation popup */}
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
