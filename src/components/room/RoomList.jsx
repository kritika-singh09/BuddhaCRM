import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, BedDouble } from "lucide-react";
import RoomForm from "./RoomForm";
import axios from "axios";

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentRoom, setCurrentRoom] = useState({
    _id: null,
    title: "",
    category: "",
    room_number: "",
    price: "",
    exptra_bed: false,
    is_reserved: false,
    status: "",
    description: "",
    images: [],
  });
  const [categories, setCategories] = useState({});

  const getAuthToken = () => {
    return localStorage.getItem("token"); // Assuming your token is stored in localStorage
  };

  // Fetch all rooms and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRooms(), fetchCategories()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const fetchRooms = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5000/api/rooms/all", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      setRooms(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch rooms");
      console.error("Error fetching rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      // Check if categories are already cached in localStorage
      const cachedCategories = localStorage.getItem("roomCategories");
      if (cachedCategories) {
        setCategories(JSON.parse(cachedCategories));
        return;
      }

      const response = await axios.get(
        "http://localhost:5000/api/categories/all"
      );
      const categoryMap = {};
      response.data.forEach((category) => {
        categoryMap[category._id] = category.name;
      });
      setCategories(categoryMap);

      // Cache the categories in localStorage
      localStorage.setItem("roomCategories", JSON.stringify(categoryMap));
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const handleAddRoom = () => {
    setEditMode(false);
    setCurrentRoom({
      _id: null,
      title: "",
      category: "",
      room_number: "",
      price: "",
      exptra_bed: false,
      is_reserved: false,
      status: "",
      description: "",
      images: [],
    });
    setShowModal(true);
  };

  const handleEditRoom = (room) => {
    setEditMode(true);
    setCurrentRoom({
      _id: room._id,
      title: room.title,
      category: room.category,
      room_number: room.room_number,
      price: room.price,
      exptra_bed: room.exptra_bed,
      is_reserved: room.is_reserved,
      status: room.status,
      description: room.description,
      images: room.images,
      imageUrl: room.images && room.images.length > 0 ? room.images[0] : "",
    });
    setShowModal(true);
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`,
          },
        };

        await axios.delete(
          `http://localhost:5000/api/rooms/delete/${id}`,
          config
        );
        setRooms(rooms.filter((room) => room._id !== id));
      } catch (err) {
        console.error("Error deleting room:", err);
        alert("Failed to delete room");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const roomData = {
        title: currentRoom.title,
        category: currentRoom.category,
        room_number: currentRoom.room_number,
        price: currentRoom.price,
        extra_bed: currentRoom.exptra_bed, // Note: API expects "extra_bed" not "exptra_bed"
        status: currentRoom.status,
        description: currentRoom.description,
        images: currentRoom.images,
      };

      // Set authorization headers for all requests
      const config = {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      };

      if (editMode) {
        // Update existing room with authorization
        const response = await axios.put(
          `http://localhost:5000/api/rooms/update/${currentRoom._id}`,
          roomData,
          config
        );

        setRooms(
          rooms.map((room) =>
            room._id === currentRoom._id ? response.data : room
          )
        );
      } else {
        // Create new room with authorization
        const response = await axios.post(
          "http://localhost:5000/api/rooms/add",
          roomData,
          config
        );
        // The API returns response.room for the new room
        setRooms([...rooms, response.data.room]);
      }

      setShowModal(false);
    } catch (err) {
      console.error("Error saving room:", err);
      alert("Failed to save room");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-blue-100 text-blue-800";
      case "maintenance":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 overflow-auto h-full bg-background">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-text">Rooms</h1>
        <button
          onClick={handleAddRoom}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus size={18} className="mr-2" /> Add Room
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading rooms...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rooms.map((room) => (
                <tr key={room._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {room.images && room.images.length > 0 ? (
                        <img
                          src={room.images[0]}
                          alt={room.title}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                          <BedDouble size={16} />
                        </div>
                      )}
                      <div>
                        <div className="font-medium">{room.title}</div>
                        <div className="text-xs text-gray-500">
                          {room.exptra_bed
                            ? "Extra bed available"
                            : "No extra bed"}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.category &&
                    typeof room.category === "object" &&
                    room.category.name
                      ? room.category.name
                      : categories[room.category] || "Unknown"}
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {room.room_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">₹{room.price}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${getStatusClass(room.status)}`}
                    >
                      {room.status
                        ? room.status.charAt(0).toUpperCase() +
                          room.status.slice(1)
                        : "Unknown"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditRoom(room)}
                        className="p-1 rounded-full text-blue-600 hover:bg-blue-50"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteRoom(room._id)}
                        className="p-1 rounded-full text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rooms.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No rooms found. Add a new room to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <RoomForm
        showModal={showModal}
        setShowModal={setShowModal}
        currentRoom={currentRoom}
        setCurrentRoom={setCurrentRoom}
        handleSubmit={handleSubmit}
        editMode={editMode}
      />
    </div>
  );
};

export default RoomList;
