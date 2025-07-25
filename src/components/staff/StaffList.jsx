import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, User } from "lucide-react";
import axios from "axios";
import StaffForm from "../staff/StaffForm";

const StaffList = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentStaff, setCurrentStaff] = useState({
    _id: null,
    email: "",
    username: "",
    password: "",
    role: "staff",
    department: [],
  });

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/auth/register",
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        }
      );
      setStaff(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch staff");
      console.error("Error fetching staff:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStaff = () => {
    setEditMode(false);
    setCurrentStaff({
      _id: null,
      email: "",
      username: "",
      password: "",
      role: "", // Set to empty string instead of "staff"
      department: [],
    });
    setShowModal(true);
  };

  const handleEditStaff = (staffMember) => {
    setEditMode(true);
    setCurrentStaff({
      _id: staffMember._id,
      email: staffMember.email,
      username: staffMember.username,
      password: "",
      role: staffMember.role,
      department: staffMember.department,
    });
    setShowModal(true);
  };

  const handleDeleteStaff = async (id) => {
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      try {
        await axios.delete(`http://localhost:5000/api/auth/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        });
        setStaff(staff.filter((staffMember) => staffMember._id !== id));
      } catch (err) {
        console.error("Error deleting staff:", err);
        alert("Failed to delete staff member");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const staffData = { ...currentStaff };
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      };

      if (editMode) {
        // If password is empty, remove it from the request
        if (!staffData.password) {
          delete staffData.password;
        }

        const response = await axios.put(
          `http://localhost:5000/api/auth/update/${currentStaff._id}`,
          staffData,
          config
        );
        setStaff(
          staff.map((s) => (s._id === currentStaff._id ? response.data : s))
        );
      } else {
        // Make sure department is properly formatted for staff role
        if (staffData.role === "staff" && staffData.department.length === 0) {
          alert("Please select a department for staff member");
          return;
        }

        // For admin role, ensure department is an empty array
        if (staffData.role === "admin") {
          staffData.department = [];
        }

        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          staffData,
          config
        );

        // Add the new staff member to the list
        if (response.data) {
          setStaff([...staff, response.data]);
        }
      }

      setShowModal(false);
    } catch (err) {
      console.error("Error saving staff:", err);
      alert(err.response?.data?.message || "Failed to save staff member");
    }
  };

  const getDepartmentName = (departments) => {
    if (!departments || departments.length === 0) return "None";
    return departments
      .map((dept) => dept.name.charAt(0).toUpperCase() + dept.name.slice(1))
      .join(", ");
  };

  return (
    <div className="p-6 overflow-auto h-full bg-background">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-text">Staff</h1>
        <button
          onClick={handleAddStaff}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" /> Add Staff
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading staff...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {staff.map((staffMember) => (
                <tr key={staffMember._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                        {staffMember.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium">{staffMember.username}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {staffMember.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">
                    {staffMember.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getDepartmentName(staffMember.department)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditStaff(staffMember)}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteStaff(staffMember._id)}
                        className="p-1 rounded-full text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {staff.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No staff found. Add staff members to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <StaffForm
        showModal={showModal}
        setShowModal={setShowModal}
        currentStaff={currentStaff}
        setCurrentStaff={setCurrentStaff}
        handleSubmit={handleSubmit}
        editMode={editMode}
      />
    </div>
  );
};

export default StaffList;
