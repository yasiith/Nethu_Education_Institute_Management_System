"use client";
import { useState } from "react";
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
  const [selectedForDelete, setSelectedForDelete] = useState(null); // Store the row selected for deletion

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

  const handleAdd = () => {
    if (validateForm()) {
      setData([...data, { ...formData, id: data.length + 1 }]);
      setFormData({ date: "", grade: "", subject: "", description: "" });
    }
  };

  const handleEdit = (id) => {
    const selectedRow = data.find((row) => row.id === id);
    setFormData(selectedRow);
    setEditingId(id);
    setError("");
  };

  const handleUpdate = () => {
    if (validateForm()) {
      setData(
        data.map((row) =>
          row.id === editingId ? { ...formData, id: editingId } : row
        )
      );
      setEditingId(null);
      setFormData({ date: "", grade: "", subject: "", description: "" });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ date: "", grade: "", subject: "", description: "" });
    setError("");
  };

  const handleDeleteClick = (id) => {
    const selectedRow = data.find((row) => row.id === id);
    setSelectedForDelete(selectedRow); // Set the selected row for deletion
    setDeletePopup(true); // Show the delete confirmation popup
  };

  const handleConfirmDelete = () => {
    setData(data.filter((row) => row.id !== selectedForDelete.id));
    setDeletePopup(false); // Hide the delete confirmation popup
    setSelectedForDelete(null); // Reset the selected row
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
            <tr key={row.id} className="border-b">
              <td className="py-3 px-5 text-center">{row.date}</td>
              <td className="py-3 px-5 text-center">{row.grade}</td>
              <td className="py-3 px-5 text-center">{row.subject}</td>
              <td className="py-3 px-5 text-center">{row.description}</td>
              <td className="py-3 px-5 flex justify-center items-center space-x-3">
                {editingId === row.id ? (
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
                      onClick={() => handleEdit(row.id)}
                    >
                      UPDATE
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() => handleDeleteClick(row.id)}
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
