// In HousekeepingForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const HousekeepingForm = ({ onClose, onTaskAdded }) => {
  const [housekeepingTask, setHousekeepingTask] = useState({
    roomId: "",
    cleaningType: "daily",
    notes: "",
    priority: "medium",
    assignedTo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState([]);
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get auth token from localStorage
        const token = localStorage.getItem("token");

        // Set up headers with the token
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Fetch rooms
        const roomsResponse = await axios.get(
          "http://localhost:5000/api/rooms/all",
          config
        );
        setRooms(roomsResponse.data);

        // Fetch staff with proper error handling
        const staffResponse = await axios.get(
          "http://localhost:5000/api/housekeeping/available-staff",
          config
        );
        console.log("Staff response:", staffResponse.data);

        if (
          staffResponse.data &&
          staffResponse.data.success &&
          Array.isArray(staffResponse.data.availableStaff)
        ) {
          setStaff(staffResponse.data.availableStaff);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHousekeepingTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Get auth token from localStorage
      const token = localStorage.getItem("token");

      // Set up headers with the token
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5000/api/housekeeping/tasks",
        housekeepingTask,
        config
      );

      onTaskAdded(response.data);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
      console.error("Error saving task:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Add Housekeeping Task</h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Room
            </label>
            <select
              name="roomId"
              value={housekeepingTask.roomId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room._id} value={room._id}>
                  Room {room.room_number}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cleaning Type
            </label>
            <select
              name="cleaningType"
              value={housekeepingTask.cleaningType}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="daily">Daily Cleaning</option>
              <option value="deep">Deep Cleaning</option>
              <option value="checkout">Checkout Cleaning</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              name="notes"
              value={housekeepingTask.notes}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows="3"
              placeholder="Add any special instructions here"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={housekeepingTask.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Assign To
            </label>
            <select
              name="assignedTo"
              value={housekeepingTask.assignedTo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            >
              <option value="">Select Staff</option>
              {staff && staff.length > 0 ? (
                staff.map((person) => (
                  <option key={person._id} value={person._id}>
                    {person.username}
                  </option>
                ))
              ) : (
                <option value="default-staff">No staff available</option>
              )}
            </select>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HousekeepingForm;
