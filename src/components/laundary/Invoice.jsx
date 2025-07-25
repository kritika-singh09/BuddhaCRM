import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, FileText, DollarSign, Calendar, User, List, X, Save, CheckCircle, Clock } from 'lucide-react';

// Main App Component for Billing and Invoicing
const App = () => {
  // State to hold all invoice records
  const [invoices, setInvoices] = useState(() => {
    // Initialize invoices from localStorage or with dummy data if not found
    const savedInvoices = localStorage.getItem('laundryInvoices');
    return savedInvoices ? JSON.parse(savedInvoices) : [
      {
        id: 'INV001',
        orderId: 'ORD001',
        customerName: 'Alice Smith',
        amount: 45.00,
        issueDate: '2025-07-28',
        dueDate: '2025-08-04',
        status: 'Pending',
      },
      {
        id: 'INV002',
        orderId: 'ORD002',
        customerName: 'Bob Johnson',
        amount: 30.50,
        issueDate: '2025-07-27',
        dueDate: '2025-08-03',
        status: 'Paid',
      },
      {
        id: 'INV003',
        orderId: 'ORD003',
        customerName: 'Charlie Brown',
        amount: 22.00,
        issueDate: '2025-07-26',
        dueDate: '2025-08-02',
        status: 'Overdue',
      },
      {
        id: 'INV004',
        orderId: 'ORD004',
        customerName: 'Diana Prince',
        amount: 38.00,
        issueDate: '2025-07-25',
        dueDate: '2025-08-01',
        status: 'Paid',
      },
    ];
  });

  // Effect to save invoices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('laundryInvoices', JSON.stringify(invoices));
  }, [invoices]);

  // State for controlling the visibility of the invoice form modal
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  // State to hold the invoice being edited (null if adding a new invoice)
  const [editingInvoice, setEditingInvoice] = useState(null);
  // State for search query
  const [searchQuery, setSearchQuery] = useState('');
  // State for filter status
  const [filterStatus, setFilterStatus] = useState('All');

  // Function to open the invoice form for adding a new invoice
  const handleAddInvoice = () => {
    setEditingInvoice(null); // Clear any existing editing invoice
    setShowInvoiceForm(true); // Show the form
  };

  // Function to open the invoice form for editing an existing invoice
  const handleEditInvoice = (invoice) => {
    setEditingInvoice(invoice); // Set the invoice to be edited
    setShowInvoiceForm(true); // Show the form
  };

  // Function to delete an invoice record
  const handleDeleteInvoice = (id) => {
    // Show a custom confirmation dialog
    const confirmDelete = window.confirm("Are you sure you want to delete this invoice record?");
    if (confirmDelete) {
      setInvoices(invoices.filter(invoice => invoice.id !== id)); // Remove the invoice from the list
    }
  };

  // Function to save (add or update) an invoice record
  const handleSaveInvoice = (newInvoice) => {
    if (editingInvoice) {
      // If editing an existing invoice, update it
      setInvoices(invoices.map(invoice => (invoice.id === newInvoice.id ? newInvoice : invoice)));
    } else {
      // If adding a new invoice, generate a new ID and add it
      const newId = 'INV' + (invoices.length + 1).toString().padStart(3, '0');
      setInvoices([...invoices, { ...newInvoice, id: newId }]);
    }
    setShowInvoiceForm(false); // Close the form
    setEditingInvoice(null); // Clear editing state
  };

  // Filter and sort invoices based on search query and status
  const filteredInvoices = invoices
    .filter(invoice => {
      // Filter by status
      if (filterStatus !== 'All' && invoice.status !== filterStatus) {
        return false;
      }
      // Filter by search query (customer name, order ID, or invoice ID)
      if (searchQuery && !invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) && !invoice.orderId.toLowerCase().includes(searchQuery.toLowerCase()) && !invoice.id.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort by issue date (newest first)
      return new Date(b.issueDate) - new Date(a.issueDate);
    });

  // Helper function to get status badge color
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock size={12} className="mr-1"/> Pending</span>;
      case 'Paid':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle size={12} className="mr-1"/> Paid</span>;
      case 'Overdue':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"><X size={12} className="mr-1"/> Overdue</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Unknown</span>;
    }
  };

  // Component for the Invoice Form (Modal)
  const InvoiceForm = ({ invoice, onSave, onClose }) => {
    // State for form fields, initialized with existing invoice data or empty values
    const [formData, setFormData] = useState({
      id: invoice?.id || '',
      orderId: invoice?.orderId || '',
      customerName: invoice?.customerName || '',
      amount: invoice?.amount || 0,
      issueDate: invoice?.issueDate || '',
      dueDate: invoice?.dueDate || '',
      status: invoice?.status || 'Pending',
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
            {invoice ? 'Edit Invoice' : 'Create New Invoice'}
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

            {/* Order ID */}
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                <FileText size={16} className="inline-block mr-1 text-purple-500" /> Associated Order ID
              </label>
              <input
                type="text"
                id="orderId"
                name="orderId"
                value={formData.orderId}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., ORD001"
                required
              />
            </div>

            {/* Amount and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  <DollarSign size={16} className="inline-block mr-1 text-green-500" /> Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  <List size={16} className="inline-block mr-1 text-teal-500" /> Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Issue Date and Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar size={16} className="inline-block mr-1 text-orange-500" /> Issue Date
                </label>
                <input
                  type="date"
                  id="issueDate"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar size={16} className="inline-block mr-1 text-red-500" /> Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
                <Save size={16} className="mr-2" /> Save Invoice
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
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Laundry Billing & Invoicing</h1>
        <button
          onClick={handleAddInvoice}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-105"
        >
          <Plus size={20} className="mr-2" /> Create New Invoice
        </button>
      </header>

      {/* Filter and Search Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-xl shadow-md mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center w-full md:w-auto">
          <List size={20} className="text-gray-500 mr-2" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="block w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by Customer, Order ID, or Invoice ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full px-4 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Invoice List Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {filteredInvoices.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No invoice records found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issue Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
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
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {invoice.orderId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {invoice.customerName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ${invoice.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {invoice.issueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {invoice.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleEditInvoice(invoice)}
                          className="text-indigo-600 hover:text-indigo-900 p-2 rounded-full hover:bg-indigo-100 transition-colors"
                          aria-label={`Edit invoice ${invoice.id}`}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteInvoice(invoice.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-100 transition-colors"
                          aria-label={`Delete invoice ${invoice.id}`}
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

      {/* Invoice Form Modal */}
      {showInvoiceForm && (
        <InvoiceForm
          invoice={editingInvoice}
          onSave={handleSaveInvoice}
          onClose={() => setShowInvoiceForm(false)}
        />
      )}
    </div>
  );
};

export default App;