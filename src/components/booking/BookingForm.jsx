
// import React, { useState, useEffect } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { Link } from "react-router-dom"; // Import Link for navigation

// const initialFormState = {
//   name: "",
//   roomNumber: "",
//   checkIn: "",
//   checkOut: "",
// };

// // Component for displaying booking details in a modal
// const BookingDetailsModal = ({ booking, onClose }) => {
//   if (!booking) return null;

//   // Helper to render sections
//   const renderSection = (title, data) => {
//     if (!data || Object.keys(data).length === 0) return null;
//     return (
//       <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//         <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
//           {Object.entries(data).map(([key, value]) => {
//             // Format dates if they look like ISO strings
//             let displayValue = value;
//             if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
//               displayValue = new Date(value).toLocaleString();
//             } else if (typeof value === 'boolean') {
//               displayValue = value ? 'Yes' : 'No';
//             } else if (Array.isArray(value)) {
//               displayValue = value.join(', ');
//             } else if (typeof value === 'object' && value !== null) {
//               displayValue = JSON.stringify(value); // Fallback for nested objects not explicitly handled
//             }

//             return (
//               <div key={key} className="flex flex-col">
//                 <span className="font-medium text-gray-600 capitalize">
//                   {key.replace(/([A-Z])/g, ' $1').trim()}:
//                 </span>
//                 <span className="text-gray-900">{displayValue || 'N/A'}</span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
//           title="Close"
//         >
//           &times;
//         </button>
//         <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Booking Details</h3>

//         <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long content */}
//           {renderSection("Guest Details", booking.guestDetails)}
//           {renderSection("Contact Details", booking.contactDetails)}
//           {renderSection("Identity Details", booking.identityDetails)}
//           {renderSection("Booking Information", booking.bookingInfo)}
//           {renderSection("Payment Details", booking.paymentDetails)}
//           {renderSection("Vehicle Details", booking.vehicleDetails)}

//           {/* Other top-level details */}
//           <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
//             <h4 className="font-semibold text-lg mb-2 text-gray-800">General Information</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-600">Category ID:</span>
//                 <span className="text-gray-900">{booking.categoryId || 'N/A'}</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-600">Reservation ID:</span>
//                 <span className="text-gray-900">{booking.reservationId || 'N/A'}</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-600">Count:</span>
//                 <span className="text-gray-900">{booking.count || 'N/A'}</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-600">VIP:</span>
//                 <span className="text-gray-900">{booking.vip ? 'Yes' : 'No'}</span>
//               </div>
//               <div className="flex flex-col">
//                 <span className="font-medium text-gray-600">Foreign Guest:</span>
//                 <span className="text-gray-900">{booking.isForeignGuest ? 'Yes' : 'No'}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// const BookingPage = () => { // Renamed from BookingList to BookingPage to match original file name
//   const [formData, setFormData] = useState(initialFormState);
//   const [bookings, setBookings] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(true); // Set to true as we are attempting to fetch
//   const [error, setError] = useState(null);    // Added error state
//   const [message, setMessage] = useState(null); // State for custom messages
//   const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
//   const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete
//   const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
//   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // State for selected booking details

//   // Hardcoded data based on the JSON provided, used as fallback
//   const staticBookingData = {
//     "categoryId": "687b82f752e72c222f76ec8a",
//     "reservationId": "687d9ef51cd0ea2a5344d319",
//     "count": 1,
//     "guestDetails": {
//       "salutation": "Mr",
//       "name": "Kumar",
//       "age": 39,
//       "gender": "Male",
//       "photoUrl": "https://cdn.com/images/guests/ravi.jpg"
//     },
//     "contactDetails": {
//       "phone": "9876555560",
//       "email": "kumar@example.com",
//       "address": "12A, Block C, South City",
//       "city": "Gurgaon ncr",
//       "state": "Haryana",
//       "country": "India",
//       "pinCode": "122001"
//     },
//     "identityDetails": {
//       "idType": "Aadhaar",
//       "idNumber": "1234-5678-9012",
//       "idPhotoFront": "https://cdn.com/id/guests/adhar-front.jpg",
//       "idPhotoBack": "https://cdn.com/id/guests/adhar-back.jpg"
//     },
//     "bookingInfo": {
//       "checkIn": "2025-09-20T12:00:00.000Z",
//       "checkOut": "2025-09-23T11:00:00.000Z",
//       "arrivalFrom": "Lucknow up",
//       "bookingType": "Online",
//       "purposeOfVisit": "Business",
//       "remarks": "Need early check-in",
//       "adults": 1,
//       "children": 1
//     },
//     "paymentDetails": {
//       "totalAmount": 4500,
//       "advancePaid": 2500,
//       "paymentMode": "UPI",
//       "billingName": "Ravi Kumar",
//       "billingAddress": "ABC Pvt Ltd, CP, New Delhi",
//       "gstNumber": "07ABCDE1234A1Z1"
//     },
//     "vehicleDetails": {
//       "vehicleNumber": "DL01AB3456",
//       "vehicleType": "Sedan",
//       "vehicleModel": "Hyundai",
//       "driverName": "ramu Singh",
//       "driverMobile": "9876512345"
//     },
//     "vip": true,
//     "isForeignGuest": false
//   };

//   // Function to get the authentication token from localStorage
//   const getAuthToken = () => {
//     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
//   };

//   // Function to fetch bookings (attempts API first, then falls back to static data)
//   const fetchBookings = async () => {
//     setLoading(true);
//     setError(null);
//     setMessage(null); // Clear previous messages
//     const token = getAuthToken();

//     try {
//       if (!token) {
//         throw new Error("Authentication token not found.");
//       }

//       // Attempt to fetch from the API as requested
//       const res = await fetch("https://backend-hazel-xi.vercel.app/api/booking/all", {
//         headers: {
//           "Authorization": `Bearer ${token}`
//         }
//       });

//       const clonedRes = res.clone();

//       if (!res.ok) {
//         let errorBody;
//         try {
//           errorBody = await res.json();
//           throw new Error(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
//         } catch (jsonError) {
//           errorBody = await clonedRes.text();
//           throw new Error(`Failed to load bookings: ${res.status} - ${errorBody}`);
//         }
//       }

//       const data = await res.json();
//       // Adjust this line based on the actual structure if the API starts working
//       // If the API returns an array of bookings directly, use 'data'
//       // If it returns { bookings: [...] }, use 'data.bookings'
//       // If it returns { rooms: [...] }, use 'data.rooms'
//       const bookingsData = data.bookings || data.rooms || [];

//       if (Array.isArray(bookingsData) && bookingsData.length > 0) {
//         setBookings(bookingsData.map(b => ({
//           name: b.guestDetails?.name || "",
//           roomNumber: b.roomAssigned || "N/A", // Assuming roomAssigned is the room number
//           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
//           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
//           _raw: b // Store raw data for view/edit operations if needed
//         })));
//       } else {
//         // If API returns an empty array or unexpected structure, fall back to static data
//         console.warn("API response for bookings was empty or unexpected. Displaying static data as fallback.");
//         setError("API returned no data.");
//         setBookings([
//           {
//             name: staticBookingData.guestDetails.name,
//             roomNumber: "101", // Assign a dummy room number for static data
//             checkIn: staticBookingData.bookingInfo.checkIn.slice(0, 10),
//             checkOut: staticBookingData.bookingInfo.checkOut.slice(0, 10),
//             _raw: staticBookingData
//           }
//         ]);
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError(`${err.message}. Displaying static data as fallback.`);
//       // Fallback to static data on any error (network, auth, API error, etc.)
//       setBookings([
//         {
//           name: staticBookingData.guestDetails.name,
//           roomNumber: "101", // Assign a dummy room number for static data
//           checkIn: staticBookingData.bookingInfo.checkIn.slice(0, 10),
//           checkOut: staticBookingData.bookingInfo.checkOut.slice(0, 10),
//           _raw: staticBookingData
//         }
//       ]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch bookings on component mount
//   useEffect(() => {
//     fetchBookings();
//   }, []); // Empty dependency array means this runs once on component mount

//   const handleView = (bookingRawData) => {
//     setSelectedBookingDetails(bookingRawData._raw); // Set the raw data for the modal
//     setShowDetailsModal(true); // Show the modal
//   };

//   const handleEdit = (index) => {
//     const selected = bookings[index];
//     setFormData(selected);
//     setMessage("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
//   };

//   const handleDelete = (index) => {
//     setDeleteIndex(index);
//     setShowConfirm(true);
//   };

//   const confirmDelete = () => {
//     if (deleteIndex !== null) {
//       // In a real app, you'd make an API call to delete the booking by its _id
//       const updated = [...bookings];
//       updated.splice(deleteIndex, 1);
//       setBookings(updated);
//       setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
//     }
//     setShowConfirm(false);
//     setDeleteIndex(null);
//   };

//   const cancelDelete = () => {
//     setShowConfirm(false);
//     setDeleteIndex(null);
//   };

//   const filteredBookings = bookings.filter((b) =>
//     b.name.toLowerCase().includes(search.toLowerCase()) ||
//     b.roomNumber.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-semibold">Bookings</h2>
//         <div className="flex gap-3">
//           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
//             <Link to="/bookingform">Add Booking</Link>
//           </button>
//           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
//             <Link to="/reservation">Reservation</Link>
//           </button>
//         </div>
//       </div>

//       {/* Search */}
//       <div className="mb-6 flex justify-start">
//         <input
//           type="text"
//           placeholder="Search by guest name or room number..."
//           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Custom Message Display */}
//       {message && (
//         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
//           <span className="block sm:inline">{message}</span>
//           <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
//             <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
//           </span>
//         </div>
//       )}

//       {loading ? (
//         <div className="text-center py-8">Loading bookings...</div>
//       ) : error ? (
//         <div className="text-center py-8 text-red-600">{error}</div>
//       ) : (
//         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
//           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
//                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {filteredBookings.length > 0 ? (
//                 filteredBookings.map((b, i) => (
//                   <tr key={i} className="hover:bg-gray-50">
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
//                     <td className="px-6 py-4 text-center">
//                       <div className="flex justify-center gap-2 text-sm">
//                         <button
//                           onClick={() => handleView(b)} // Pass the raw booking data
//                           title="View"
//                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
//                         >
//                           <FaEye />
//                         </button>
//                         <button
//                           onClick={() => handleEdit(i)}
//                           title="Edit"
//                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
//                         >
//                           <FaEdit />
//                         </button>
//                         <button
//                           onClick={() => handleDelete(i)}
//                           title="Delete"
//                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
//                     No bookings found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Confirmation Modal */}
//       {showConfirm && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
//           <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
//             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
//             <p className="mb-6">Are you sure you want to delete this booking?</p>
//             <div className="flex justify-end gap-4">
//               <button
//                 onClick={cancelDelete}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Booking Details Modal */}
//       <BookingDetailsModal
//         booking={selectedBookingDetails}
//         onClose={() => setShowDetailsModal(false)}
//       />
//     </div>
//   );
// };

// export default BookingPage;
import React, { useState, useRef, useEffect } from "react";
import {
  FaUser, FaPhone, FaCity, FaMapMarkedAlt, FaBuilding, FaGlobe,
  FaRegAddressCard, FaMobileAlt, FaEnvelope, FaMoneyCheckAlt,
  FaCalendarAlt, FaClock, FaDoorOpen, FaUsers, FaConciergeBell,
  FaInfoCircle, FaSuitcase, FaComments, FaFileInvoiceDollar,
  FaCheckCircle, FaSignInAlt, FaPassport, FaIdCard, FaCreditCard,
  FaCashRegister, FaAddressBook
} from "react-icons/fa";

// InputWithIcon component remains unchanged
const InputWithIcon = ({ icon, ...props }) => (
  <div className="relative w-full">
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      {icon}
    </span>
    <input
      {...props}
      className="bg-white border border-secondary rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
    />
  </div>
);

// BookingForm component now accepts onBookingSuccess prop
const BookingForm = ({ onBookingSuccess }) => {
  // Initialize selectedCategoryName in formData to store the chosen category's name
  const [formData, setFormData] = useState({
    idImages: [],
    selectedCategoryName: "", // Room Category
    guestName: "",           // Guest Name
    checkInDate: "",         // Check-In Date
    checkOutDate: "",        // Check-Out Date
  });
  const [showCamera, setShowCamera] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  // Categories will now be fetched from API
  const [categories, setCategories] = useState([]);
  const [grcNo, setGrcNo] = useState("");
  // Removed local 'bookings' state as it will be managed by a parent component
  // const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState(null); // For displaying success/error messages
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Function to get the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token"); // Assuming your token is stored in localStorage
  };

  // useEffect hook for fetching available rooms
  useEffect(() => {
    const token = getAuthToken(); // Get the token
    if (!token) {
      console.error("Authentication token not found.");
      // You might want to redirect to a login page here or show an error to the user
      return;
    }

    fetch("https://backend-hazel-xi.vercel.app/api/rooms/available", {
      headers: {
        "Authorization": `Bearer ${token}` // Use the dynamically fetched token
      }
    })
      .then(res => res.json())
      .then(data => setAvailableRooms(data.rooms || []))
      .catch(error => console.error("Error fetching available rooms:", error));
  }, []); // Empty dependency array means this runs once on component mount

  // NEW: useEffect hook for fetching categories from the specified API
  useEffect(() => {
    const token = getAuthToken(); // Get the token
    if (!token) {
      console.error("Authentication token not found.");
      // You might want to redirect to a login page here or show an error to the user
      return;
    }

    fetch("https://backend-hazel-xi.vercel.app/api/categories/all", {
      headers: {
        "Authorization": `Bearer ${token}` // Use the dynamically fetched token
      }
    })
      .then(res => res.json())
      .then(data => {
        // Corrected: Check if data is an array directly
        if (Array.isArray(data)) {
          setCategories(data); // Set data directly as it's the array of categories
        } else {
          console.error("Categories API response unexpected or empty:", data);
          setCategories([]); // Fallback to empty array
        }
      })
      .catch(error => console.error("Error fetching categories:", error));
  }, []); // Empty dependency array means this runs once on component mount

  // Handles changes to form input fields
  const handleChange = (field, value) => {
    // Simplified handleChange: directly store the value for the field.
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setMessage(null); // Clear previous messages

    const token = getAuthToken(); // Get the token for submission
    if (!token) {
      console.error("Authentication token not found. Cannot submit booking.");
      setMessage("Authentication required. Please log in.");
      return;
    }

    // Basic validation for required fields
    if (!formData.selectedCategoryName || !formData.guestName || !formData.checkInDate || !formData.checkOutDate) {
      setMessage("Please fill all required fields: Room Category, Guest Name, Check-In, Check-Out.");
      return;
    }

    // Construct the payload for the API request
    const payload = {
      // Sending the category _id as 'categoryId'.
      categoryId: formData.selectedCategoryName,
      roomAssigned: formData.roomAssigned,
      guestDetails: {
        salutation: formData.salutation || "",
        name: formData.guestName || "",
        age: Number(formData.age) || undefined,
        gender: formData.gender || undefined,
      },
      contactDetails: { // Keep contactDetails based on current UI elements still present
        phone: formData.phoneNo || undefined,
        email: formData.email || undefined,
        address: formData.address || undefined,
        city: formData.city || undefined,
        state: formData.state || undefined,
        country: formData.country || undefined,
        pinCode: formData.pinCode || undefined
      },
      identityDetails: {
        idType: formData.idType || undefined,
        idNumber: formData.idNumber || undefined,
        // Assuming idImages are base64 strings, you might need to send them as an array of strings
        // or convert them to file uploads if the API expects that.
        // For now, sending the first image as idPhotoFront, and others are ignored or need separate fields.
        idPhotoFront: formData.idImages[0] || undefined,
        idPhotoBack: formData.idImages[1] || undefined, // Example for a second image
      },
      bookingInfo: {
        checkIn: formData.checkInDate,
        checkOut: formData.checkOutDate,
        arrivalFrom: formData.arrivalFrom || undefined,
        bookingType: formData.reservationType || undefined,
        purposeOfVisit: formData.purposeOfVisit || undefined,
        remarks: formData.remarks || undefined,
        adults: Number(formData.noOfAdults) || undefined,
        children: Number(formData.noOfChildren) || undefined
      },
      paymentDetails: {
        totalAmount: Number(formData.totalAmount) || undefined,
        amount: Number(formData.advanceAmount) || undefined, // Renamed advancePaid to amount
        method: formData.paymentMode || undefined, // Renamed paymentMode to method
      },
    };

    try {
      // API call to book a room, including the Authorization header
      const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Use the dynamically fetched token
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json(); // Parse the JSON response
      if (res.ok && data && data.booking) {
        setGrcNo(data.booking.grcNo); // Update GRC number if booking is successful
        setMessage("Booking successful! GRC No: " + data.booking.grcNo);
        // Call the prop to notify parent about new booking
        if (onBookingSuccess) {
          onBookingSuccess(data.booking);
        }
        // Optionally clear form data after successful submission
        setFormData({
          idImages: [],
          selectedCategoryName: "",
          guestName: "",
          checkInDate: "",
          checkOutDate: "",
          salutation: "",
          nationality: "",
          city: "",
          address: "",
          phoneNo: "",
          mobileNo: "",
          email: "",
          contactPerson: "",
          contactMobile: "",
          contactEmail: "",
          idType: "",
          idNumber: "",
          reservationType: "",
          checkInTime: "",
          checkOutTime: "",
          noOfRooms: "",
          noOfAdults: "",
          noOfChildren: "",
          rate: "",
          paymentMode: "",
          advanceAmount: "",
          totalAmount: "",
        });
      } else {
        console.error("Booking failed:", data); // Log error details
        setMessage(`Booking failed: ${data.error || "Please check the console for details or try again."}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      setMessage(`Error submitting booking: ${error.message}.`);
    }
  };

  // Function to start the camera for ID image capture
  const startCamera = async () => {
    setShowCamera(true); // Show camera preview
    setTimeout(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true }); // Request access to camera
        streamRef.current = stream; // Store stream reference
        if (videoRef.current) {
          videoRef.current.srcObject = stream; // Set video source to camera stream
          videoRef.current.play(); // Play the video stream
        }
      } catch (err) {
        setShowCamera(false); // Hide camera if access fails
        console.error("Error accessing camera: ", err); // Log the error
        setMessage("Could not access camera. Please ensure camera permissions are granted."); // User-friendly error
      }
    }, 100); // Small delay to ensure videoRef is ready
  };

  // Function to stop the camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop()); // Stop all tracks in the stream
      streamRef.current = null; // Clear stream reference
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setShowCamera(false); // Hide camera preview
  };

  // Function to capture a photo from the video stream
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d'); // Get 2D rendering context
      // Set canvas dimensions to match video dimensions
      canvasRef.current.width = videoRef.current.videoWidth || 320;
      canvasRef.current.height = videoRef.current.videoHeight || 240;
      // Draw the current video frame onto the canvas
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      const imageDataURL = canvasRef.current.toDataURL('image/png'); // Get image data as Data URL
      setFormData(prev => ({
        ...prev,
        idImages: [...(prev.idImages || []), imageDataURL] // Add captured image to idImages array
      }));
      stopCamera(); // Stop camera after capturing
    }
  };

  // Function to remove a captured image
  const removeImage = (idx) => {
    setFormData(prev => ({
      ...prev,
      idImages: prev.idImages.filter((_, i) => i !== idx) // Filter out the image at the given index
    }));
  };

  // Cleanup effect for camera stream when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className="w-full min-h-screen p-4 sm:p-6 md:p-8 text-[color:var(--color-text)] font-sans" style={{ backgroundColor: '#fff9e6' }}>
      <div className="w-full max-w-[1300px] mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Booking Form</h1>

        {/* Custom Message Display */}
        {message && (
          <div className={`px-4 py-3 rounded relative mb-4 ${message.includes("successful") ? "bg-green-100 border border-green-400 text-green-700" : "bg-red-100 border border-red-400 text-red-700"}`} role="alert">
            <span className="block sm:inline">{message}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
              <svg className="fill-current h-6 w-6" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-10 w-full" autoComplete="off">
          {/* Guest Details Section */}
          <section className="rounded-2xl shadow p-6 border border-[color:var(--color-border)] w-full">
            <h3 className="text-xl font-bold mb-6  text-[color:var(--color-text)] flex items-center gap-2">
              <FaUser /> Guest Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <FaUser />
                </span>
                <select
                  className="bg-white border border-secondary rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                  onChange={e => handleChange("salutation", e.target.value)}
                  value={formData.salutation || ""}
                >
                  <option value="">Select Salutation</option>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                  <option value="Prof">Prof</option>
                </select>
              </div>
              <InputWithIcon icon={<FaUser />} type="text" placeholder="Guest Name" onChange={(e) => handleChange("guestName", e.target.value)} value={formData.guestName || ''} />
              <InputWithIcon icon={<FaGlobe />} type="text" placeholder="Nationality" onChange={(e) => handleChange("nationality", e.target.value)} value={formData.nationality || ''} />
              <InputWithIcon icon={<FaCity />} type="text" placeholder="City" onChange={(e) => handleChange("city", e.target.value)} value={formData.city || ''} />
              <InputWithIcon icon={<FaMapMarkedAlt />} type="text" placeholder="Address" onChange={(e) => handleChange("address", e.target.value)} value={formData.address || ''} />
              <InputWithIcon icon={<FaPhone />} type="text" placeholder="Phone No" onChange={(e) => handleChange("phoneNo", e.target.value)} value={formData.phoneNo || ''} />
              <InputWithIcon icon={<FaMobileAlt />} type="text" placeholder="Mobile No" onChange={(e) => handleChange("mobileNo", e.target.value)} value={formData.mobileNo || ''} />
              <InputWithIcon icon={<FaEnvelope />} type="email" placeholder="Email" onChange={(e) => handleChange("email", e.target.value)} value={formData.email || ''} />
            </div>
          </section>

          {/* Contact Details Section - Retained as per current UI */}
          <section className="rounded-2xl shadow p-6 border border-[color:var(--color-border)] w-full">
            <h3 className="text-xl font-bold mb-6  text-[color:var(--color-text)]flex items-center gap-2">
              <FaAddressBook /> Contact Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputWithIcon icon={<FaUser />} type="text" placeholder="Contact Person" onChange={(e) => handleChange("contactPerson", e.target.value)} value={formData.contactPerson || ''} />
              <InputWithIcon icon={<FaMobileAlt />} type="text" placeholder="Contact Mobile No" onChange={(e) => handleChange("contactMobile", e.target.value)} value={formData.contactMobile || ''} />
              <InputWithIcon icon={<FaEnvelope />} type="email" placeholder="Contact Email" onChange={(e) => handleChange("contactEmail", e.target.value)} value={formData.contactEmail || ''} />
            </div>
          </section>

          {/* Identity Details Section */}
          <section className="rounded-2xl shadow p-6 border border-[color:var(--color-border)] w-full">
            <h3 className="text-xl font-bold mb-6  text-[color:var(--color-text)] flex items-center gap-2">
              <FaIdCard /> Identity Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputWithIcon icon={<FaIdCard />} type="text" placeholder="ID Type (e.g. Aadhar, Passport)" onChange={(e) => handleChange("idType", e.target.value)} value={formData.idType || ''} />
              <InputWithIcon icon={<FaIdCard />} type="text" placeholder="ID Number" onChange={(e) => handleChange("idNumber", e.target.value)} value={formData.idNumber || ''} />
            </div>
            <div className="mt-4 flex items-center gap-4">
              <input
                type="file"
                id="idImageUpload"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      // Add new image to idImages array
                      setFormData(prev => ({
                        ...prev,
                        idImages: [...(prev.idImages || []), reader.result]
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => document.getElementById('idImageUpload').click()}
              >
                Upload Image
              </button>
              <button
                type="button"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={startCamera}
              >
                Use Camera
              </button>
            </div>
            {showCamera && (
              <div className="mt-4 p-4 border border-gray-300 rounded-md flex flex-col items-center">
                <video ref={videoRef} className="w-full max-w-md rounded-md" autoPlay playsInline></video>
                <button
                  type="button"
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition-all"
                  onClick={capturePhoto}
                >
                  Capture Photo
                </button>
                <button
                  type="button"
                  className="mt-2 bg-red-500 text-white px-6 py-2 rounded-lg shadow hover:bg-red-600 transition-all"
                  onClick={stopCamera}
                >
                  Close Camera
                </button>
              </div>
            )}
            {formData.idImages && formData.idImages.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-4">
                {formData.idImages.map((img, idx) => (
                  <div key={idx} className="relative inline-block">
                    <img src={img} alt={`ID Proof ${idx + 1}`} className="max-w-xs h-auto rounded-md" />
                    <button
                      type="button"
                      onClick={() => removeImage(idx)}
                      className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center shadow hover:bg-red-800"
                      title="Remove"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          </section>

          {/* Booking Info Section */}
          <section className="rounded-2xl shadow p-6 border border-[color:var(--color-border)] w-full">
            <h3 className="text-xl font-bold mb-6  text-[color:var(--color-text)] flex items-center gap-2">
              <FaFileInvoiceDollar /> Booking Info
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Room Category Dropdown */}
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <FaDoorOpen />
                </span>
                <select
                  className="bg-white border border-secondary rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary w-full"
                  onChange={e => handleChange("selectedCategoryName", e.target.value)}
                  value={formData.selectedCategoryName || ""}
                >
                  <option value="">Select Room Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <InputWithIcon icon={<FaInfoCircle />} type="text" placeholder="Reservation Type" onChange={(e) => handleChange("reservationType", e.target.value)} value={formData.reservationType || ''} />

              <InputWithIcon icon={<FaCalendarAlt />} type="date" placeholder="Check-In Date" onChange={(e) => handleChange("checkInDate", e.target.value)} value={formData.checkInDate || ''} />
              <InputWithIcon icon={<FaClock />} type="time" placeholder="Check-In Time" onChange={(e) => handleChange("checkInTime", e.target.value)} value={formData.checkInTime || ''} />
              <InputWithIcon icon={<FaCalendarAlt />} type="date" placeholder="Check-Out Date" onChange={(e) => handleChange("checkOutDate", e.target.value)} value={formData.checkOutDate || ''} />
              <InputWithIcon icon={<FaClock />} type="time" placeholder="Check-Out Time" onChange={(e) => handleChange("checkOutTime", e.target.value)} value={formData.checkOutTime || ''} />
              <InputWithIcon icon={<FaUsers />} type="number" placeholder="No. of Rooms" onChange={(e) => handleChange("noOfRooms", e.target.value)} value={formData.noOfRooms || ''} />
              <InputWithIcon icon={<FaUsers />} type="number" placeholder="No. of Adults" onChange={(e) => handleChange("noOfAdults", e.target.value)} value={formData.noOfAdults || ''} />
              <InputWithIcon icon={<FaUsers />} type="number" placeholder="No. of Children" onChange={(e) => handleChange("noOfChildren", e.target.value)} value={formData.noOfChildren || ''} />

              <InputWithIcon icon={<FaMoneyCheckAlt />} type="number" placeholder="Rate" onChange={(e) => handleChange("rate", e.target.value)} value={formData.rate || ''} />
            </div>
          </section>

          {/* Payment Details Section */}
          <section className="rounded-2xl shadow p-6 border border-[color:var(--color-border)] w-full">
            <h3 className="text-xl font-bold mb-6  text-[color:var(--color-text)] flex items-center gap-2">
              <FaCreditCard /> Payment Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InputWithIcon icon={<FaCashRegister />} type="text" placeholder="Payment Mode" onChange={(e) => handleChange("paymentMode", e.target.value)} value={formData.paymentMode || ''} />
              <InputWithIcon icon={<FaMoneyCheckAlt />} type="number" placeholder="Advance Amount" onChange={(e) => handleChange("advanceAmount", e.target.value)} value={formData.advanceAmount || ''} />
            </div>
          </section>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition"
            >
              Submit Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm; 