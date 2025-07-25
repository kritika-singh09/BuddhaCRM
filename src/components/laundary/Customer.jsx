import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, User, Mail, Phone, MapPin, Calendar, X, Save } from 'lucide-react';

// Main App Component for Customer Management
const App = () => {
  // State to hold all customer records
  const [customers, setCustomers] = useState(() => {
    // Initialize customers from localStorage or with dummy data if not found
    const savedCustomers = localStorage.getItem('laundryCustomers');
    return savedCustomers ? JSON.parse(savedCustomers) : [
      {
        id: 'CUST001',
        name: 'Alice Smith',
        email: 'alice.smith@example.com',
        phone: '111-222-3333',
        address: '123 Main St, City, State, 12345',
        registrationDate: '2023-01-10',
      },
      {
        id: 'CUST002',
        name: 'Bob Johnson',
        email: 'bob.johnson@example.com',
        phone: '444-555-6666',
        address: '456 Oak Ave, Town, State, 67890',
        registrationDate: '2023-03-05',
      },
      {
        id: 'CUST003',
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        phone: '777-888-9999',
        address: '789 Pine Ln, Village, State, 10112',
        registrationDate: '2023-06-12',
      },
      {
        id: 'CUST004',
        name: 'Diana Prince',
        email: 'diana.prince@example.com',
        phone: '000-111-2222',
        address: '101 Hero Blvd, Metropolis, State, 13141',
        registrationDate: '2023-09-20',
      },
    ];
  });

  // Effect to save customers to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('laundryCustomers', JSON.stringify(customers));
  }, [customers]);

  // State for controlling the visibility of the customer form modal
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  // State to hold the customer being edited (null if adding a new customer)
  const [editingCustomer, setEditingCustomer] = useState(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');

  // Function to open the customer form for adding a new customer
  const handleAddCustomer = () => {
    setEditingCustomer(null); // Clear any existing editing customer
    setShowCustomerForm(true); // Show the form
  };

  // Function to open the customer form for editing an existing customer
  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer); // Set the customer to be edited
    setShowCustomerForm(true); // Show the form
  };

  // Function to delete a customer record
  const handleDeleteCustomer = (id) => {
    // Show a custom confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this customer record?");
    if (confirmDelete) {
      setCustomers(customers.filter(customer => customer.id !== id)); // Remove the customer from the list
    }
  };

  // Function to save (add or update) a customer record
  const handleSaveCustomer = (newCustomer) => {
    if (editingCustomer) {
      // If editing an existing customer, update it
      setCustomers(customers.map(customer => (customer.id === newCustomer.id ? newCustomer : customer)));
    } else {
      // If adding a new customer, generate a new ID and add it
      const newId = 'CUST' + (customers.length + 1).toString().padStart(3, '0');
      setCustomers([...customers, { ...newCustomer, id: newId }]);
    }
    setShowCustomerForm(false); // Close the form
    setEditingCustomer(null); // Clear editing state
  };

  // Filter customer records based on search query
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically by name

  // Component for the Customer Form (Modal)
  const CustomerForm = ({ customer, onSave, onClose }) => {
    // State for form fields, initialized with existing customer data or empty values
    const [formData, setFormData] = useState({
      id: customer?.id || '',
      name: customer?.name || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      address: customer?.address || '',
      registrationDate: customer?.registrationDate || '',
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
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                <User size={16} className="inline-block mr-1 text-blue-500" /> Customer Name
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

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                <Mail size={16} className="inline-block mr-1 text-purple-500" /> Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                <Phone size={16} className="inline-block mr-1 text-green-500" /> Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin size={16} className="inline-block mr-1 text-orange-500" /> Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Registration Date */}
            <div>
              <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar size={16} className="inline-block mr-1 text-teal-500" /> Registration Date
              </label>
              <input
                type="date"
                id="registrationDate"
                name="registrationDate"
                value={formData.registrationDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
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
                <Save size={16} className="mr-2" /> Save Customer
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
        <h1 className="text-3xl font-extrabold text-black mb-4 sm:mb-0">Laundry Customer Management</h1>
        <button
          onClick={handleAddCustomer}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} className="mr-2" /> Add New Customer
        </button>
      </header>

      {/* Search Section */}
      <div className="flex items-center bg-white p-4 rounded-xl shadow-md mb-6">
        <Search size={20} className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Search customers by name, email, phone, address, or ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Customer List Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredCustomers.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No customer records found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reg. Date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {customer.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.phone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {customer.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {customer.registrationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditCustomer(customer)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition-colors"
                          aria-label={`Edit customer ${customer.name}`}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                          aria-label={`Delete customer ${customer.name}`}
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

      {/* Customer Form Modal */}
      {showCustomerForm && (
        <CustomerForm
          customer={editingCustomer}
          onSave={handleSaveCustomer}
          onClose={() => setShowCustomerForm(false)}
        />
      )}
    </div>
  );
};

export default App;