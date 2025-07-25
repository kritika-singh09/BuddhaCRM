import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, User, Briefcase, Phone, Mail, Calendar, DollarSign, X, Save } from 'lucide-react';

// Main App Component for Employee Management
const App = () => {
  // State to hold all employee records
  const [employees, setEmployees] = useState(() => {
    // Initialize employees from localStorage or with dummy data if not found
    const savedEmployees = localStorage.getItem('laundryEmployees');
    return savedEmployees ? JSON.parse(savedEmployees) : [
      {
        id: 'EMP001',
        name: 'John Doe',
        role: 'Laundry Technician',
        contactEmail: 'john.doe@example.com',
        contactPhone: '123-456-7890',
        hireDate: '2023-01-15',
        salary: 35000,
      },
      {
        id: 'EMP002',
        name: 'Jane Smith',
        role: 'Customer Service',
        contactEmail: 'jane.smith@example.com',
        contactPhone: '098-765-4321',
        hireDate: '2023-03-01',
        salary: 30000,
      },
      {
        id: 'EMP003',
        name: 'Peter Jones',
        role: 'Delivery Driver',
        contactEmail: 'peter.jones@example.com',
        contactPhone: '555-123-4567',
        hireDate: '2023-06-10',
        salary: 32000,
      },
      {
        id: 'EMP004',
        name: 'Alice Brown',
        role: 'Manager',
        contactEmail: 'alice.brown@example.com',
        contactPhone: '111-222-3333',
        hireDate: '2022-11-01',
        salary: 45000,
      },
    ];
  });

  // Effect to save employees to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('laundryEmployees', JSON.stringify(employees));
  }, [employees]);

  // State for controlling the visibility of the employee form modal
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  // State to hold the employee being edited (null if adding a new employee)
  const [editingEmployee, setEditingEmployee] = useState(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to open the employee form for adding a new employee
  const handleAddEmployee = () => {
    setEditingEmployee(null); // Clear any existing editing employee
    setShowEmployeeForm(true); // Show the form
  };

  // Function to open the employee form for editing an existing employee
  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee); // Set the employee to be edited
    setShowEmployeeForm(true); // Show the form
  };

  // Function to delete an employee record
  const handleDeleteEmployee = (id) => {
    // Show a custom confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this employee record?");
    if (confirmDelete) {
      setEmployees(employees.filter(employee => employee.id !== id)); // Remove the employee from the list
    }
  };

  // Function to save (add or update) an employee record
  const handleSaveEmployee = (newEmployee) => {
    if (editingEmployee) {
      // If editing an existing employee, update it
      setEmployees(employees.map(employee => (employee.id === newEmployee.id ? newEmployee : employee)));
    } else {
      // If adding a new employee, generate a new ID and add it
      const newId = 'EMP' + (employees.length + 1).toString().padStart(3, '0');
      setEmployees([...employees, { ...newEmployee, id: newId }]);
    }
    setShowEmployeeForm(false); // Close the form
    setEditingEmployee(null); // Clear editing state
  };

  // Filter employee records based on search query
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.contactEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.contactPhone.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

  // Component for the Employee Form (Modal)
  const EmployeeForm = ({ employee, onSave, onClose }) => {
    // State for form fields, initialized with existing employee data or empty values
    const [formData, setFormData] = useState({
      id: employee?.id || '',
      name: employee?.name || '',
      role: employee?.role || '',
      contactEmail: employee?.contactEmail || '',
      contactPhone: employee?.contactPhone || '',
      hireDate: employee?.hireDate || '',
      salary: employee?.salary || 0,
    });

    // Handle changes in form input fields
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData); // Call the onSave prop with the form data
    };

    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative transform transition-all duration-300 scale-100 opacity-100">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-3">
            {employee ? 'Edit Employee' : 'Add New Employee'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Employee Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                <User size={16} className="inline-block mr-1 text-blue-500" /> Employee Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                <Briefcase size={16} className="inline-block mr-1 text-purple-500" /> Role
              </label>
              <input
                type="text"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Laundry Technician, Customer Service"
                required
              />
            </div>

            {/* Contact Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail size={16} className="inline-block mr-1 text-teal-500" /> Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone size={16} className="inline-block mr-1 text-orange-500" /> Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>

            {/* Hire Date and Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hireDate" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar size={16} className="inline-block mr-1 text-green-500" /> Hire Date
                </label>
                <input
                  type="date"
                  id="hireDate"
                  name="hireDate"
                  value={formData.hireDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign size={16} className="inline-block mr-1 text-yellow-600" /> Salary
                </label>
                <input
                  type="number"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="0"
                  step="100"
                  required
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4 border-t mt-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              >
                <Save size={16} className="mr-2" /> Save Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Laundry Employee Management</h1>
        <button
          onClick={handleAddEmployee}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} className="mr-2" /> Add New Employee
        </button>
      </header>

      {/* Search Section */}
      <div className="flex items-center bg-white p-4 rounded-xl shadow-md mb-6">
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search employees by name, role, email, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Employee List Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredEmployees.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No employee records found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Hire Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {employee.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.contactEmail}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.contactPhone}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {employee.hireDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${employee.salary.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditEmployee(employee)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition-colors"
                          aria-label={`Edit employee ${employee.name}`}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteEmployee(employee.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                          aria-label={`Delete employee ${employee.name}`}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Employee Form Modal */}
      {showEmployeeForm && (
        <EmployeeForm
          employee={editingEmployee}
          onSave={handleSaveEmployee}
          onClose={() => setShowEmployeeForm(false)}
        />
      )}
    </div>
  );
};

export default App;