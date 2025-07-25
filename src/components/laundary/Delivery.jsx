import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, User, MapPin, Phone, Calendar, Clock, Truck, List, X, Save, CheckCircle, Package } from 'lucide-react';

// Main App Component for Pickup and Delivery Management
const App = () => {
  // State to hold all pickup/delivery requests
  const [requests, setRequests] = useState(() => {
    // Initialize requests from localStorage or with dummy data if not found
    const savedRequests = localStorage.getItem('laundryPickupDeliveryRequests');
    return savedRequests ? JSON.parse(savedRequests) : [
      {
        id: 'REQ001',
        customerName: 'Alice Smith',
        contactPhone: '111-222-3333',
        address: '123 Main St, City, State',
        type: 'Pickup',
        date: '2025-07-29',
        time: '10:00 AM - 12:00 PM',
        status: 'Scheduled',
        notes: 'Please call 15 mins before arrival.',
      },
      {
        id: 'REQ002',
        customerName: 'Bob Johnson',
        contactPhone: '444-555-6666',
        address: '456 Oak Ave, Town, State',
        type: 'Delivery',
        date: '2025-07-29',
        time: '02:00 PM - 04:00 PM',
        status: 'In Progress',
        notes: 'Deliver to back door.',
      },
      {
        id: 'REQ003',
        customerName: 'Charlie Brown',
        contactPhone: '777-888-9999',
        address: '789 Pine Ln, Village, State',
        type: 'Pickup',
        date: '2025-07-28',
        time: '09:00 AM - 11:00 AM',
        status: 'Completed',
        notes: '',
      },
      {
        id: 'REQ004',
        customerName: 'Diana Prince',
        contactPhone: '000-111-2222',
        address: '101 Hero Blvd, Metropolis, State',
        type: 'Delivery',
        date: '2025-07-28',
        time: '01:00 PM - 03:00 PM',
        status: 'Cancelled',
        notes: 'Customer rescheduled.',
      },
    ];
  });

  // Effect to save requests to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('laundryPickupDeliveryRequests', JSON.stringify(requests));
  }, [requests]);

  // State for controlling the visibility of the request form modal
  const [showRequestForm, setShowRequestForm] = useState(false);
  // State to hold the request being edited (null if adding a new request)
  const [editingRequest, setEditingRequest] = useState(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for filter type (Pickup, Delivery, All)
  const [filterType, setFilterType] = useState('All');
  // State for filter status (Scheduled, In Progress, Completed, Cancelled, All)
  const [filterStatus, setFilterStatus] = useState('All');

  // Function to open the request form for adding a new request
  const handleAddRequest = () => {
    setEditingRequest(null); // Clear any existing editing request
    setShowRequestForm(true); // Show the form
  };

  // Function to open the request form for editing an existing request
  const handleEditRequest = (request) => {
    setEditingRequest(request); // Set the request to be edited
    setShowRequestForm(true); // Show the form
  };

  // Function to delete a request record
  const handleDeleteRequest = (id) => {
    // Show a custom confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this request record?");
    if (confirmDelete) {
      setRequests(requests.filter(request => request.id !== id)); // Remove the request from the list
    }
  };

  // Function to save (add or update) a request record
  const handleSaveRequest = (newRequest) => {
    if (editingRequest) {
      // If editing an existing request, update it
      setRequests(requests.map(request => (request.id === newRequest.id ? newRequest : request)));
    } else {
      // If adding a new request, generate a new ID and add it
      const newId = 'REQ' + (requests.length + 1).toString().padStart(3, '0');
      setRequests([...requests, { ...newRequest, id: newId }]);
    }
    setShowRequestForm(false); // Close the form
    setEditingRequest(null); // Clear editing state
  };

  // Filter and sort requests based on search query, type, and status
  const filteredRequests = requests
    .filter(request => {
      // Filter by type
      if (filterType !== 'All' && request.type !== filterType) {
        return false;
      }
      // Filter by status
      if (filterStatus !== 'All' && request.status !== filterStatus) {
        return false;
      }
      // Filter by search query (customer name, address, or request ID)
      if (searchQuery && !request.customerName.toLowerCase().includes(searchQuery.toLowerCase()) && !request.address.toLowerCase().includes(searchQuery.toLowerCase()) && !request.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by date and then time (earliest first)
      const dateA = new Date(`${a.date} ${a.time.split(' - ')[0]}`);
      const dateB = new Date(`${b.date} ${b.time.split(' - ')[0]}`);
      return dateA - dateB;
    });

  // Helper function to get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Scheduled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Clock size={12} className="mr-1"/> Scheduled</span>;
      case 'In Progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Truck size={12} className="mr-1"/> In Progress</span>;
      case 'Completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={12} className="mr-1"/> Completed</span>;
      case 'Cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><X size={12} className="mr-1"/> Cancelled</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  // Component for the Pickup/Delivery Request Form (Modal)
  const RequestForm = ({ request, onSave, onClose }) => {
    // State for form fields, initialized with existing request data or empty values
    const [formData, setFormData] = useState({
      id: request?.id || '',
      customerName: request?.customerName || '',
      contactPhone: request?.contactPhone || '',
      address: request?.address || '',
      type: request?.type || 'Pickup',
      date: request?.date || '',
      time: request?.time || '',
      status: request?.status || 'Scheduled',
      notes: request?.notes || '',
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
            {request ? 'Edit Request' : 'Create New Request'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Customer Name */}
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                <User size={16} className="inline-block mr-1 text-blue-500" /> Customer Name
              </label>
              <input
                type="text"
                id="customerName"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Contact Phone */}
            <div>
              <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                <Phone size={16} className="inline-block mr-1 text-purple-500" /> Contact Phone
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

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin size={16} className="inline-block mr-1 text-green-500" /> Address
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

            {/* Type (Pickup/Delivery) */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                <Package size={16} className="inline-block mr-1 text-orange-500" /> Request Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Pickup">Pickup</option>
                <option value="Delivery">Delivery</option>
              </select>
            </div>

            {/* Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar size={16} className="inline-block mr-1 text-teal-500" /> Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                  <Clock size={16} className="inline-block mr-1 text-red-500" /> Time Slot
                </label>
                <input
                  type="text"
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., 10:00 AM - 12:00 PM"
                  required
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                <List size={16} className="inline-block mr-1 text-indigo-500" /> Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              ></textarea>
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
                <Save size={16} className="mr-2" /> Save Request
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
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Laundry Pickup & Delivery</h1>
        <button
          onClick={handleAddRequest}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} className="mr-2" /> Schedule New Request
        </button>
      </header>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center w-full md:w-auto">
          <Truck size={20} className="text-gray-500 mr-2" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="block w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="All">All Types</option>
            <option value="Pickup">Pickup</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>
        <div className="flex items-center w-full md:w-auto">
          <List size={20} className="text-gray-500 mr-2" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Scheduled">Scheduled</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by Customer, Address, or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Request List Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No pickup or delivery requests found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {request.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.contactPhone}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      {request.address}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {request.date} <br/> {request.time}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditRequest(request)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition-colors"
                          aria-label={`Edit request ${request.id}`}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteRequest(request.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                          aria-label={`Delete request ${request.id}`}
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

      {/* Request Form Modal */}
      {showRequestForm && (
        <RequestForm
          request={editingRequest}
          onSave={handleSaveRequest}
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </div>
  );
};

export default App;