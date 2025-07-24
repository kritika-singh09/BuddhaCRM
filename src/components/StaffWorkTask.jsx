// src/components/StaffWorkTask.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Clock, CheckCircle, AlertTriangle, Home, Filter } from "lucide-react";
import StaffWorkImageUpload from "./StaffWorkImageUpload";

const StaffWorkTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");
  const [expandedTask, setExpandedTask] = useState(null);

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const fetchUserTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const currentUserId = localStorage.getItem("userId");

      const response = await axios.get(
        "http://localhost:5000/api/housekeeping/tasks",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success && Array.isArray(response.data.tasks)) {
        const userTasks = response.data.tasks.filter(
          (task) => task.assignedTo && task.assignedTo._id === currentUserId
        );
        setTasks(userTasks);
      } else {
        setTasks([]);
      }
    } catch (err) {
      console.error("Error fetching user tasks:", err);
      setError("Failed to load your tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUploaded = (taskId, imageType, imageUrls) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === taskId
          ? {
              ...task,
              images: {
                ...task.images,
                [imageType]: imageUrls,
              },
            }
          : task
      )
    );
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/housekeeping/tasks/${taskId}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (err) {
      console.error("Error updating task status:", err);
    }
  };

  const startTask = async (taskId) => {
    await updateTaskStatus(taskId, "in-progress");
    setExpandedTask(taskId);
  };

  const completeTask = async (taskId) => {
    await updateTaskStatus(taskId, "completed");
    setExpandedTask(null);
  };

  const filteredTasks = tasks.filter((task) =>
    filter === "all" ? true : task.status === filter
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500 text-white";
      case "medium":
        return "bg-secondary text-text";
      case "low":
        return "bg-green-500 text-white";
      default:
        return "bg-primary text-text";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-accent text-text border-border";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8 bg-background min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <span className="text-lg text-text">Loading your tasks...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-background  ">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-extrabold text-[#1f2937]">
          My Assigned Tasks
        </h1>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#1f2937]/70" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-border px-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          >
            <option value="all">All Tasks</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Tasks Grid */}
      <div className="overflow-auto min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300  border border-border"
            >
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary to-secondary p-5 text-text relative ">
                <div className="absolute inset-0 bg-white/5"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-start space-x-3">
                      <div className="bg-white/25 p-2.5 rounded-xl shadow-sm">
                        <Home className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold leading-tight">
                          Room {task.roomId?.room_number || "N/A"}
                        </h3>
                        <p className="text-sm font-medium opacity-90 mt-0.5">
                          {task.cleaningType || "Standard"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span
                        className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority?.toUpperCase() || "MEDIUM"}
                      </span>
                      <div className="bg-white px-2 py-1 rounded-md">
                        <p className="text-xs font-semibold">
                          {task.department || "Housekeeping"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4">
                {/* Notes */}
                <div className="mb-4 p-3 bg-background rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-semibold text-text">Notes:</span>
                    <button
                      onClick={() => {
                        /* Add your issue functionality here */
                      }}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-colors"
                    >
                      Issue
                    </button>
                  </div>
                  {task.notes ? (
                    <p className="text-sm text-text/80">{task.notes}</p>
                  ) : (
                    <p className="text-sm text-text/50 italic">No notes yet</p>
                  )}
                </div>

                {/* Images */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-center">
                    <p className="text-xs font-semibold text-text/70 mb-2">
                      Before
                    </p>
                    {task.images?.before?.[0] ? (
                      <img
                        src={task.images.before[0]}
                        alt="Before"
                        className="w-full h-24 object-cover rounded-lg border-2 border-border shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-24 bg-background rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                        <span className="text-xs text-text/50 font-medium">
                          No photo
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-text/70 mb-2">
                      After
                    </p>
                    {task.images?.after?.[0] ? (
                      <img
                        src={task.images.after[0]}
                        alt="After"
                        className="w-full h-24 object-cover rounded-lg border-2 border-border shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-24 bg-background rounded-lg border-2 border-dashed border-border flex items-center justify-center">
                        <span className="text-xs text-text/50 font-medium">
                          No photo
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex justify-between items-center mb-4">
                  <div
                    className={`flex items-center px-3 py-1 rounded-full border ${getStatusBadge(
                      task.status
                    )}`}
                  >
                    {getStatusIcon(task.status)}
                    <span className="ml-2 capitalize text-sm font-semibold">
                      {task.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {task.status === "pending" && (
                      <button
                        onClick={() => startTask(task._id)}
                        className="px-4 py-2 bg-primary hover:bg-hover text-text text-sm font-semibold rounded-lg transition-colors shadow-sm"
                      >
                        Start Task
                      </button>
                    )}
                    {task.status === "in-progress" && (
                      <button
                        onClick={() => completeTask(task._id)}
                        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
                      >
                        Complete
                      </button>
                    )}
                  </div>
                </div>

                {/* Image Upload */}
                {task.status === "in-progress" && (
                  <div className="border-t border-border pt-4">
                    <StaffWorkImageUpload
                      taskId={task._id}
                      onImageUploaded={handleImageUploaded}
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto border border-border">
            <AlertTriangle className="w-16 h-16 text-text/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-text mb-2">
              No Tasks Found
            </h3>
            <p className="text-text/60">
              {filter === "all"
                ? "You don't have any assigned tasks yet."
                : `No ${filter} tasks found.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffWorkTask;
