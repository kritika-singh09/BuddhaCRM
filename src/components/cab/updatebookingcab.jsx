import React, { useState, useEffect } from 'react';

// Main App component that renders the UpdateCabBookingForm
export default function App() {
  // Hardcoded bookingId for demonstration purposes.
  // In a real application, this would typically come from URL parameters (e.g., React Router)
  // or be passed as a prop from a parent component.
  const bookingId = '68820ae9859f65e16cf8122d';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <UpdateCabBookingForm bookingId={bookingId} />
    </div>
  );
}

// UpdateCabBookingForm component
function UpdateCabBookingForm({ bookingId }) {
  // State to hold form data
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
    createdBy: '', // Will be fetched from existing data
  });

  // State for managing loading, errors, and success messages
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Effect to fetch existing booking data when the component mounts or bookingId changes
  useEffect(() => {
    const fetchBookingData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`https://backend-hazel-xi.vercel.app/api/cab/bookings/${bookingId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
          estimatedFare: data.estimatedFare || '',
          actualFare: data.actualFare || '',
          distanceInKm: data.distanceInKm || '',
          paymentStatus: data.paymentStatus || 'unpaid',
          vehicleNumber: data.vehicleNumber || '',
          driverName: data.driverName || '',
          driverContact: data.driverContact || '',
          status: data.status || 'pending',
          cancellationReason: data.cancellationReason || '',
          createdBy: data.createdBy || '', // Preserve the createdBy ID
        });
      } catch (e) {
        setError(`Failed to fetch booking data: ${e.message}. Please ensure the ID is valid.`);
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBookingData();
    }
  }, [bookingId]); // Re-run effect if bookingId changes

  // Handle input changes for all form fields
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission (PUT request for update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');

    // Prepare data for submission, ensuring correct types for numbers
    const dataToSend = {
      ...formData,
      estimatedFare: formData.estimatedFare ? parseFloat(formData.estimatedFare) : undefined,
      actualFare: formData.actualFare ? parseFloat(formData.actualFare) : undefined,
      distanceInKm: formData.distanceInKm ? parseFloat(formData.distanceInKm) : undefined,
      // Convert pickupTime to ISO string if it exists
      pickupTime: formData.pickupTime ? new Date(formData.pickupTime).toISOString() : undefined,
      // createdBy should be sent back as it's a required field in the schema
      // If it's empty, use a placeholder or handle as per your backend's logic
      createdBy: formData.createdBy || '60d5ec49f8c7e20015f8e2e1', // Fallback placeholder
    };

    // Remove empty strings or undefined values for optional fields if the backend expects it
    Object.keys(dataToSend).forEach(key => {
      if (dataToSend[key] === '' || dataToSend[key] === undefined || dataToSend[key] === null) {
        delete dataToSend[key];
      }
    });

    try {
      const response = await fetch(`https://backend-hazel-xi.vercel.app/api/cab/bookings/${bookingId}`, {
        method: 'PUT', // Use PUT for updates
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Cab booking successfully updated!');
        setMessageType('success');
        console.log('Update Success:', result);
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

  // Determine if guest-related fields should be shown
  const showGuestInfo = formData.purpose === 'guest_transport' || formData.purpose === 'sightseeing';
  // Determine if cancellation reason should be shown
  const showCancellationReason = formData.status === 'cancelled';

  if (loading) {
    return (
      <div className="text-center text-lg font-semibold text-gray-700">Loading booking data...</div>
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
    <div className="w-full max-w-4xl bg-white p-8 rounded-xl shadow-2xl border border-gray-200">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">Update Cab Booking (ID: {bookingId})</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Message Display */}
        {message && (
          <div className={`p-3 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
          </div>
        )}

        {/* Purpose Section */}
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

        {/* Guest or Room Info (Conditional Rendering) */}
        {showGuestInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="col-span-full text-lg font-semibold text-blue-800 mb-2">Guest Information</h3>
            <div>
              <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-1">Guest Name</label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="roomNumber" className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
              <input
                type="text"
                id="roomNumber"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="grcNo" className="block text-sm font-medium text-gray-700 mb-1">GRC No. (Optional)</label>
              <input
                type="text"
                id="grcNo"
                name="grcNo"
                value={formData.grcNo}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              />
            </div>
            <div className="col-span-full">
              <label htmlFor="guestType" className="block text-sm font-medium text-gray-700 mb-1">Guest Type</label>
              <select
                id="guestType"
                name="guestType"
                value={formData.guestType}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              >
                <option value="inhouse">Inhouse</option>
                <option value="external">External</option>
              </select>
            </div>
          </div>
        )}

        {/* Ride Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Ride Details</h3>
          <div>
            <label htmlFor="pickupLocation" className="block text-sm font-medium text-gray-700 mb-1">Pickup Location <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="pickupLocation"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">Destination <span className="text-red-500">*</span></label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div className="md:col-span-2">
            <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 mb-1">Pickup Time <span className="text-red-500">*</span></label>
            <input
              type="datetime-local"
              id="pickupTime"
              name="pickupTime"
              value={formData.pickupTime}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="cabType" className="block text-sm font-medium text-gray-700 mb-1">Cab Type</label>
            <select
              id="cabType"
              name="cabType"
              value={formData.cabType}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            >
              <option value="standard">Standard</option>
              <option value="premium">Premium</option>
              <option value="suv">SUV</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="specialInstructions" className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            ></textarea>
          </div>
          <div className="flex items-center md:col-span-2">
            <input
              id="scheduled"
              name="scheduled"
              type="checkbox"
              checked={formData.scheduled}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="scheduled" className="ml-2 block text-sm font-medium text-gray-700">Scheduled Ride</label>
          </div>
        </div>

        {/* Fare & Payment Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Fare & Payment</h3>
          <div>
            <label htmlFor="estimatedFare" className="block text-sm font-medium text-gray-700 mb-1">Estimated Fare</label>
            <input
              type="number"
              id="estimatedFare"
              name="estimatedFare"
              value={formData.estimatedFare}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="actualFare" className="block text-sm font-medium text-gray-700 mb-1">Actual Fare</label>
            <input
              type="number"
              id="actualFare"
              name="actualFare"
              value={formData.actualFare}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="distanceInKm" className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
            <input
              type="number"
              id="distanceInKm"
              name="distanceInKm"
              value={formData.distanceInKm}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="paymentStatus" className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              id="paymentStatus"
              name="paymentStatus"
              value={formData.paymentStatus}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="not_required">Not Required</option>
            </select>
          </div>
        </div>

        {/* Cab Vehicle & Driver Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Cab & Driver Info</h3>
          <div>
            <label htmlFor="vehicleNumber" className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
            <input
              type="text"
              id="vehicleNumber"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="driverName" className="block text-sm font-medium text-gray-700 mb-1">Driver Name</label>
            <input
              type="text"
              id="driverName"
              name="driverName"
              value={formData.driverName}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
          <div>
            <label htmlFor="driverContact" className="block text-sm font-medium text-gray-700 mb-1">Driver Contact</label>
            <input
              type="text"
              id="driverContact"
              name="driverContact"
              value={formData.driverContact}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        {/* Status Tracking Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="col-span-full text-lg font-semibold text-gray-800 mb-2">Status Tracking</h3>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
            >
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
              <textarea
                id="cancellationReason"
                name="cancellationReason"
                value={formData.cancellationReason}
                onChange={handleChange}
                rows="3"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition duration-150 ease-in-out"
              ></textarea>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out transform hover:scale-105"
          >
            Update Cab Request
          </button>
        </div>
      </form>
    </div>
  );
}