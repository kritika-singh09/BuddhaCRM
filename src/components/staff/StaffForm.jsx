import React from "react";

const StaffForm = ({
  showModal,
  setShowModal,
  currentStaff,
  setCurrentStaff,
  handleSubmit,
  editMode,
}) => {
  if (!showModal) return null;

  const departments = [
    { id: 1, name: "kitchen" },
    { id: 2, name: "laundry" },
    { id: 3, name: "reception" },
    { id: 4, name: "maintenance" },
    { id: 5, name: "other" },
  ];

  const handleDepartmentChange = (e) => {
    const deptId = parseInt(e.target.value);
    if (deptId) {
      const selectedDept = departments.find((d) => d.id === deptId);
      if (selectedDept) {
        setCurrentStaff({
          ...currentStaff,
          department: [{ id: selectedDept.id, name: selectedDept.name }],
        });
      }
    } else {
      setCurrentStaff({ ...currentStaff, department: [] });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">
          {editMode ? "Edit Staff" : "Add Staff"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={currentStaff.username}
              onChange={(e) =>
                setCurrentStaff({ ...currentStaff, username: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={currentStaff.email}
              onChange={(e) =>
                setCurrentStaff({ ...currentStaff, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={currentStaff.password}
              onChange={(e) =>
                setCurrentStaff({ ...currentStaff, password: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              required={!editMode}
            />
            {editMode && (
              <p className="text-xs text-gray-500 mt-1">
                Leave blank to keep current password
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={currentStaff.role}
              onChange={(e) =>
                setCurrentStaff({
                  ...currentStaff,
                  role: e.target.value,
                  // Clear department if changing to admin
                  department:
                    e.target.value === "admin" ? [] : currentStaff.department,
                })
              }
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Only show department selection for staff role */}
          {currentStaff.role === "staff" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Department
              </label>
              <select
                value={currentStaff.department?.[0]?.id || ""}
                onChange={handleDepartmentChange}
                className="w-full px-3 py-2 border rounded-md"
                required={currentStaff.role === "admin"}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name.charAt(0).toUpperCase() + dept.name.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-md"
            >
              {editMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffForm;
