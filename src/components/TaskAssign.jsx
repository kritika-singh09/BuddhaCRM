import React, { useState } from "react";
import {
  ClipboardList,
  Search,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle,
  Home,
  Shirt,
  Coffee,
  UserPlus,
  Wrench,
} from "lucide-react";
import {
  departments,
  staffMembers,
  initialTasks,
} from "../components/dashboardData.js";
import TaskList from "../components/table/TaskList.jsx";

const TaskAssign = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    department: "",
    staff: "",
    priority: "medium",
  });

  const departmentIcons = {
    Housekeeping: Home,
    Maintenance: Wrench,
    Laundry: Shirt,
    "Room Service": Coffee,
    Reception: UserPlus,
  };

  const departmentColors = {
    Housekeeping: "bg-primary",
    Maintenance: "bg-primary",
    Laundry: "bg-primary",
    "Room Service": "bg-primary",
    Reception: "bg-primary",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.staff) return;

    const task = {
      id: tasks.length + 1,
      title: newTask.title,
      department: newTask.department,
      staff: newTask.staff,
      status: "pending",
      priority: newTask.priority,
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: "",
      department: "",
      staff: "",
      priority: "medium",
    });
    setShowAddModal(false);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id, status) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const openAddTaskModal = (department) => {
    setSelectedDepartment(department);
    setNewTask({
      ...newTask,
      department: department,
    });
    setShowAddModal(true);
  };

  const statusCounts = {
    pending: tasks.filter((t) => t.status === "pending").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const departmentTaskCounts = {};
  departments.forEach((dept) => {
    departmentTaskCounts[dept.name] = tasks.filter(
      (t) => t.department === dept.name
    ).length;
  });

  return (
    <div className="p-6 overflow-auto h-full bg-background">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#1f2937]">
          Task Assignment
        </h1>
        {/* <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search tasks..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div> */}
      </div>

      {/* Status Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
            <span className="text-sm">
              {statusCounts.pending} Pending Tasks
            </span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-blue-500 mr-2" />
            <span className="text-sm">
              {statusCounts["in-progress"]} In Progress
            </span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm">
              {statusCounts.completed} Completed Tasks
            </span>
          </div>
        </div>
      </div>

      {/* Department Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {departments.map((dept) => {
          const IconComponent = departmentIcons[dept.name] || Home;
          const colorClass = departmentColors[dept.name] || "bg-primary";
          return (
            <div
              key={dept.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer"
              onClick={() => openAddTaskModal(dept.name)}
            >
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className={`p-2 rounded-lg ${colorClass} text-white`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
                    {departmentTaskCounts[dept.name]} Tasks
                  </span>
                </div>
                <h3 className="text-sm text-text/70">{dept.name}</h3>
                <p className="text-lg font-bold text-[#1f2937]">
                  {dept.action}
                </p>
              </div>
              <div className={`h-1 ${colorClass}`}></div>
            </div>
          );
        })}
      </div>

      {/* Task List Component */}
      <TaskList
        tasks={tasks}
        filter={filter}
        setFilter={setFilter}
        handleStatusChange={handleStatusChange}
        handleDeleteTask={handleDeleteTask}
      />

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Add New {selectedDepartment} Task
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  placeholder="Enter task description"
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">
                  Assign To
                </label>
                <select
                  name="staff"
                  value={newTask.staff}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select staff member</option>
                  {staffMembers[selectedDepartment]?.map((staff) => (
                    <option key={staff} value={staff}>
                      {staff}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-text/70">
                  Priority
                </label>
                <select
                  name="priority"
                  value={newTask.priority}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
                disabled={!newTask.title || !newTask.staff}
              >
                <Plus size={18} className="mr-1" /> Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskAssign;
