
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

const getAuthToken = () => {
 
  return localStorage.getItem("token");
};


function UpdateCabBookingForm({ bookingId, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    purpose: 'guest_transport',
    guestName: '',
    roomNumber: '',
    grcNo: '',
    guestType: 'inhouse',
    pickupLocation: '',
    destination: '',
    pickupTime: '',
    cabType: 'standard',
    specialInstructions: '',
    scheduled: false,
    estimatedFare: '',
    actualFare: '',
    distanceInKm: '',
    paymentStatus: 'unpaid',
    vehicleNumber: '',
    driverName: '',
    driverContact: '',
    status: 'pending',
    cancellationReason: '',
    createdBy: '', // This might be an ObjectId, consider if it's truly editable or just displayed
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Effect to fetch existing booking data when component mounts or bookingId changes
  useEffect(() => {
    const fetchBookingData = async () => {
      setLoading(true);
      setError('');
      const token = getAuthToken();

      if (!token) {
        setError('Authentication token not found. Please log in.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://backend-hazel-xi.vercel.app/api/cab/bookings/${bookingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            throw new Error('Unauthorized: Please log in or check your permissions.');
          }
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }
        const data = await response.json();

        // Format pickupTime for datetime-local input
        const formattedPickupTime = data.pickupTime ? new Date(data.pickupTime).toISOString().slice(0, 16) : '';

        // Update form data with fetched values
        setFormData({
          purpose: data.purpose || 'guest_transport',
          guestName: data.guestName || '',
          roomNumber: data.roomNumber || '',
          grcNo: data.grcNo || '',
          guestType: data.guestType || 'inhouse',
          pickupLocation: data.pickupLocation || '',
          destination: data.destination || '',
          pickupTime: formattedPickupTime,
          cabType: data.cabType || 'standard',
          specialInstructions: data.specialInstructions || '',
          scheduled: data.scheduled || false,
          // Ensure numbers are converted to string for input value, handle null/undefined
          estimatedFare: data.estimatedFare !== undefined && data.estimatedFare !== null ? data.estimatedFare.toString() : '',
          actualFare: data.actualFare !== undefined && data.actualFare !== null ? data.actualFare.toString() : '',
          distanceInKm: data.distanceInKm !== undefined && data.distanceInKm !== null ? data.distanceInKm.toString() : '',
          paymentStatus: data.paymentStatus || 'unpaid',
          vehicleNumber: data.vehicleNumber || '',
          driverName: data.driverName || '',
          driverContact: data.driverContact || '',
          status: data.status || 'pending',
          cancellationReason: data.cancellationReason || '',
          createdBy: data.createdBy || '',
        });
      } catch (e) {
        setError(`Failed to fetch booking data: ${e.message}. Please ensure the ID is valid and you are authorized.`);
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setMessageType('');

    const token = getAuthToken();
    if (!token) {
      setMessage('Authentication token not found. Please log in.');
      setMessageType('error');
      return;
    }

    // Prepare data to send, converting numbers and dates where necessary
    const dataToSend = {
      ...formData,
      // Convert string numbers from input back to actual numbers for the API
      estimatedFare: formData.estimatedFare ? parseFloat(formData.estimatedFare) : undefined,
      actualFare: formData.actualFare ? parseFloat(formData.actualFare) : undefined,
      distanceInKm: formData.distanceInKm ? parseFloat(formData.distanceInKm) : undefined,
      // Convert datetime-local string to ISO string for the API
      pickupTime: formData.pickupTime ? new Date(formData.pickupTime).toISOString() : undefined,
      // createdBy should probably not be sent on update unless explicitly allowed/needed by backend
      // delete dataToSend.createdBy; // Uncomment if createdBy should not be sent
    };

    // Remove empty string/undefined/null values if your backend doesn't expect them for updates
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === '' || dataToSend[key] === undefined || dataToSend[key] === null) {
        delete dataToSend[key];
      }
    });

    try {
      const response = await fetch(`https://backend-hazel-xi.vercel.app/api/cab/bookings/${bookingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Cab booking successfully updated!');
        setMessageType('success');
        console.log('Update Success:', result);
        if (onSuccess) onSuccess(); // Call success callback to return to list and refresh
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to update cab booking.'}`);
        setMessageType('error');
        console.error('Update Error:', errorData);
      }
    } catch (err) {
      setMessage(`Network error during update: ${err.message}`);
      setMessageType('error');
      console.error('Network error:', err);
    }
  };

  // Conditional rendering flags
  const showGuestInfo = formData.purpose === 'guest_transport' || formData.purpose === 'sightseeing';
  const showCancellationReason = formData.status === 'cancelled';

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-700 p-8 bg-white rounded-xl shadow-2xl">
        Loading booking data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-lg font-semibold text-red-600 p-4 bg-red-100 rounded-md shadow-md">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Update Cab Booking (ID: {bookingId})</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {message && (
          <div className={`p-3 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        <div>
          <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
          <select
            id="purpose"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
          >
            <option value="guest_transport">Guest Transport</option>
            <option value="hotel_supply">Hotel Supply</option>
            <option value="staff_pickup">Staff Pickup</option>
            <option value="sightseeing">Sightseeing</option>
            <option value="other">Other</option>
          </select>
        </div>

        {showGuestInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="col-span-full text-lg font-semibold text-blue-800 mb-2">Guest Information</h3>
            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
              <input type="text" id="guestName" name="guestName" value={formData.guestName} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
            </div>
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
              <input type="text" id="roomNumber" name="roomNumber" value={formData.roomNumber} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
            </div>
            <div>
              <label htmlFor="grcNo" className="block text-sm font-medium text-gray-700 mb-1">GRC No. (Optional)</label>
              <input type="text" id="grcNo" name="grcNo" value={formData.grcNo} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
            </div>
            <div className="col-span-full">
              <label htmlFor="guestType" className="block text-sm font-medium text-gray-700 mb-1">Guest Type</label>
              <select id="guestType" name="guestType" value={formData.guestType} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out">
                <option value="inhouse">Inhouse</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Ride Details</h3>
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location <span className="text-red-500">*</span></label>
            <input type="text" id="pickupLocation" name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination <span className="text-red-500">*</span></label>
            <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">Pickup Time <span className="text-red-500">*</span></label>
            <input type="datetime-local" id="pickupTime" name="pickupTime" value={formData.pickupTime} onChange={handleChange} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div>
            <label htmlFor="cabType" className="block text-sm font-medium text-gray-700 mb-1">Cab Type</label>
            <select id="cabType" name="cabType" value={formData.cabType} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out">
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="suv">SUV</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
            <textarea id="specialInstructions" name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows="3" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"></textarea>
          </div>
          <div className="flex items-center md:col-span-2">
            <input id="scheduled" name="scheduled" type="checkbox" checked={formData.scheduled} onChange={handleChange} className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
            <label htmlFor="scheduled" className="ml-2 block text-sm font-medium text-gray-700">Scheduled Ride</label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Fare & Payment</h3>
          <div>
            <label htmlFor="estimatedFare" className="block text-sm font-medium text-gray-700 mb-1">Estimated Fare</label>
            <input type="number" id="estimatedFare" name="estimatedFare" value={formData.estimatedFare} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div>
            <label htmlFor="actualFare" className="block text-sm font-medium text-gray-700 mb-1">Actual Fare</label>
            <input type="number" id="actualFare" name="actualFare" value={formData.actualFare} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div>
            <label htmlFor="distanceInKm" className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
            <input type="number" id="distanceInKm" name="distanceInKm" value={formData.distanceInKm} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select id="paymentStatus" name="paymentStatus" value={formData.paymentStatus} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out">
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="not_required">Not Required</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Cab & Driver Info</h3>
          <div>
            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
            <input type="text" id="vehicleNumber" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div>
            <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
            <input type="text" id="driverName" name="driverName" value={formData.driverName} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
          <div>
            <label htmlFor="driverContact" className="block text-sm font-medium text-gray-700 mb-1">Driver Contact</label>
            <input type="text" id="driverContact" name="driverContact" value={formData.driverContact} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Status Tracking</h3>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out">
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="on_route">On Route</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          {showCancellationReason && (
            <div>
              <label htmlFor="cancellationReason" className="block text-sm font-medium text-gray-700 mb-1">Cancellation Reason</label>
              <textarea id="cancellationReason" name="cancellationReason" value={formData.cancellationReason} onChange={handleChange} rows="3" className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"></textarea>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-8 space-x-4">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Update Cab Booking
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// ======================================================
// Component: CabBookingList
// Purpose: Displays a list of cab bookings with filtering, search, and actions.
// ======================================================
const CabBookingList = forwardRef(({ onEditBooking, onCreateBooking, onBookingActionSuccess }, ref) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCabType, setFilterCabType] = useState('all');
  const [filterPurpose, setFilterPurpose] = useState('all');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Function to fetch all bookings from the API
  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    const token = getAuthToken();

    if (!token) {
      setError('Authentication token not found. Please log in.');
      setLoading(false);
      setBookings([]);
      return;
    }

    try {
      const response = await fetch('https://backend-hazel-xi.vercel.app/api/cab/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error('Unauthorized: Please log in or check your permissions.');
        }
        const errorBody = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}. Message: ${errorBody || 'Unknown error'}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setBookings(data);
      } else {
        console.warn("API response for bookings was not an array:", data);
        setBookings([]);
      }
    } catch (e) {
      setError(`Failed to fetch bookings: ${e.message}`);
      console.error('Fetch error:', e);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  // Expose fetchBookings function to parent component via ref
  useImperativeHandle(ref, () => ({
    fetchBookings: fetchBookings
  }));

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Handle delete booking action
  const handleDelete = async (id) => {
    setMessage('');
    setMessageType('');
    if (!window.confirm('Are you sure you want to delete this booking?')) {
      return;
    }

    const token = getAuthToken();
    if (!token) {
      setMessage('Authentication token not found. Please log in.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch(`https://backend-hazel-xi.vercel.app/api/cab/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMessage('Booking successfully deleted!');
        setMessageType('success');
        fetchBookings(); // Refresh the list after deletion
        if (onBookingActionSuccess) onBookingActionSuccess(); // Notify parent of success
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to delete booking.'}`);
        setMessageType('error');
      }
    } catch (e) {
      setMessage(`Network error during delete: ${e.message}`);
      setMessageType('error');
      console.error('Delete error:', e);
    }
  };

  // Filter and search logic for bookings
  const filteredBookings = (bookings || []).filter((booking) => {
    const matchesSearch = searchTerm === '' ||
      Object.values(booking).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus = filterStatus === 'all' || booking.status === filterStatus;
    const matchesCabType = filterCabType === 'all' || booking.cabType === filterCabType;
    const matchesPurpose = filterPurpose === 'all' || booking.purpose === filterPurpose;

    return matchesSearch && matchesStatus && matchesCabType && matchesPurpose;
  });

  return (
    <div className="w-full max-w-7xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mx-auto">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Cab Booking List</h2>

      {message && (
        <div className={`p-3 rounded-md text-center mb-4 ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* Controls: Search, Filters, Book Cab Button */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search bookings..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow min-w-[200px] px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="on_route">On Route</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filterCabType}
          onChange={(e) => setFilterCabType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Cab Types</option>
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="suv">SUV</option>
        </select>

        <select
          value={filterPurpose}
          onChange={(e) => setFilterPurpose(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          <option value="all">All Purposes</option>
          <option value="guest_transport">Guest Transport</option>
          <option value="hotel_supply">Hotel Supply</option>
          <option value="staff_pickup">Staff Pickup</option>
          <option value="sightseeing">Sightseeing</option>
          <option value="other">Other</option>
        </select>

        {/* This button will trigger the onCreateBooking callback in App.jsx */}
        <button
          onClick={onCreateBooking}
          className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
        >
          Book New Cab
        </button>
      </div>

      {loading ? (
        <div className="text-center text-lg font-semibold text-gray-700">Loading bookings...</div>
      ) : error ? (
        <div className="text-center text-lg font-semibold text-red-600 p-4 bg-red-100 rounded-md shadow-md">
          {error}
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="text-center text-lg text-gray-600 p-4 bg-gray-50 rounded-md">No bookings found matching your criteria.</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup/Destination</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pickup Time</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cab Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guest Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking._id.slice(-6)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{booking.purpose.replace(/_/g, ' ')}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.pickupLocation} to {booking.destination}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.pickupTime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : ''}
                      ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : ''}
                      ${booking.status === 'on_route' ? 'bg-purple-100 text-purple-800' : ''}
                      ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                      capitalize`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{booking.cabType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.guestName || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => onEditBooking(booking._id)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4 transition duration-150 ease-in-out"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking._id)}
                      className="text-red-600 hover:text-red-900 transition duration-150 ease-in-out"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
});



function App() {
  const [editingBookingId, setEditingBookingId] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const cabBookingListRef = useRef(); // Create a ref to access methods of CabBookingList

  const handleEditBooking = (id) => {
    setEditingBookingId(id);
    setShowCreateForm(false); // Hide create form if editing
  };

  // Callback to show the create new booking form
  const handleCreateNewBooking = () => {
    setEditingBookingId(null); // Clear any editing state
    setShowCreateForm(true);
  };

  // Callback for when an update or create operation is successful, or when cancelling
  const handleFormActionComplete = () => {
    setEditingBookingId(null); // Exit editing mode
    setShowCreateForm(false); // Hide create form
    // After an action, tell the list to re-fetch its data
    if (cabBookingListRef.current && cabBookingListRef.current.fetchBookings) {
      cabBookingListRef.current.fetchBookings();
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen font-sans">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-tight">
        Cab Booking Management Dashboard
      </h1>

      {editingBookingId ? (
        <UpdateCabBookingForm
          bookingId={editingBookingId}
          onSuccess={handleFormActionComplete} // Pass the refresh callback
          onCancel={handleFormActionComplete}  // Pass the refresh callback for cancel too
        />
      ) : showCreateForm ? (
        // Placeholder for a CreateCabBookingForm component
        <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200 mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Create New Cab Booking</h2>
          <p className="text-center text-gray-600 mb-6">
            This section would contain your `CreateCabBookingForm` component.
            For now, just a placeholder.
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleFormActionComplete}
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              ← Back to Booking List
            </button>
          </div>
        </div>
      ) : (
        <CabBookingList
          ref={cabBookingListRef} // Attach ref to CabBookingList
          onEditBooking={handleEditBooking}
          onCreateBooking={handleCreateNewBooking}
          onBookingActionSuccess={handleFormActionComplete} // Pass the refresh callback to the list
        />
      )}
    </div>
  );
}

export default App;