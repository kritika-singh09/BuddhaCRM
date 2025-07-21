
// // // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // // // // // // // // import { Link } from "react-router-dom";

// // // // // // // // // // // const initialFormState = {
// // // // // // // // // // //   name: "",
// // // // // // // // // // //   roomNumber: "",
// // // // // // // // // // //   checkIn: "",
// // // // // // // // // // //   checkOut: "",
// // // // // // // // // // // };

// // // // // // // // // // // const dummyData = [
// // // // // // // // // // //   {
// // // // // // // // // // //     name: "John Doe",
// // // // // // // // // // //     roomNumber: "101",
// // // // // // // // // // //     checkIn: "2025-07-20",
// // // // // // // // // // //     checkOut: "2025-07-22",
// // // // // // // // // // //   },
// // // // // // // // // // //   {
// // // // // // // // // // //     name: "Jane Smith",
// // // // // // // // // // //     roomNumber: "102",
// // // // // // // // // // //     checkIn: "2025-07-21",
// // // // // // // // // // //     checkOut: "2025-07-23",
// // // // // // // // // // //   },
// // // // // // // // // // // ];

// // // // // // // // // // // const BookingPage = () => {
// // // // // // // // // // //   const [formData, setFormData] = useState(initialFormState);
// // // // // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // // // // //   const [search, setSearch] = useState("");

// // // // // // // // // // //   useEffect(() => {
// // // // // // // // // // //     fetch("https://backend-hazel-xi.vercel.app/api/bookings", {
// // // // // // // // // // //       headers: {
// // // // // // // // // // //         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NzBmNThmYjBiMzNjZGU2MmI0ZTU2YyIsInVzZXJuYW1lIjoiQWRtaW4xMjMiLCJyb2xlIjoiYWRtaW4iLCJkZXBhcnRtZW50IjpbImtpdGNoZW4iLCJsYXVuZHJ5IiwicmVjZXB0aW9uIiwibWFpbnRlbmFuY2UiLCJvdGhlciJdLCJpYXQiOjE3NTMwNzgwMzEsImV4cCI6MTc1MzE2NDQzMX0.pnfwu8DE3N1dQuCC9sPYYAJIO22KDKBWy6hEjzyVEgE"
// // // // // // // // // // //       }
// // // // // // // // // // //     })
// // // // // // // // // // //       .then(res => res.json())
// // // // // // // // // // //       .then(data => {
// // // // // // // // // // //         // Map API data to table format
// // // // // // // // // // //         if (Array.isArray(data.bookings)) {
// // // // // // // // // // //           setBookings(data.bookings.map(b => ({
// // // // // // // // // // //             name: b.guestDetails?.name || "",
// // // // // // // // // // //             roomNumber: b.roomNumber || "",
// // // // // // // // // // //             checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // // // // // // // // // //             checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // // // // // // // // // //             _raw: b
// // // // // // // // // // //           })));
// // // // // // // // // // //         }
// // // // // // // // // // //       });
// // // // // // // // // // //   }, []);

// // // // // // // // // // //   const handleView = (data) => {
// // // // // // // // // // //     alert("Viewing: " + JSON.stringify(data, null, 2));
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleEdit = (index) => {
// // // // // // // // // // //     const selected = bookings[index];
// // // // // // // // // // //     setFormData(selected);
// // // // // // // // // // //   };

// // // // // // // // // // //   const handleDelete = (index) => {
// // // // // // // // // // //     const updated = [...bookings];
// // // // // // // // // // //     updated.splice(index, 1);
// // // // // // // // // // //     setBookings(updated);
// // // // // // // // // // //   };

// // // // // // // // // // //   const filteredBookings = bookings.filter((b) =>
// // // // // // // // // // //     b.name.toLowerCase().includes(search.toLowerCase())
// // // // // // // // // // //   );

// // // // // // // // // // //   return (
// // // // // // // // // // //     // <div className="p-6 text-[color:var(--color-text)]">
// // // // // // // // // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">

// // // // // // // // // // //       <div className="flex justify-between items-center mb-4">
// // // // // // // // // // //         <h2 className="text-2xl font-semibold">Bookings</h2>
      


// // // // // // // // // // //   <div className="flex gap-3">
// // // // // // // // // // //     <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // // // // //       <Link to="/bookingform">Add Booking</Link>
// // // // // // // // // // //     </button>
// // // // // // // // // // //     <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // // // // //       <Link to="/reservation">Reservation</Link>
// // // // // // // // // // //     </button>
// // // // // // // // // // //   {/* </div> */}
// // // // // // // // // // // </div>

// // // // // // // // // // //       </div>

// // // // // // // // // // //       {/* Search */}
// // // // // // // // // // //       <div className="mb-6 flex justify-start">
// // // // // // // // // // //         <input
// // // // // // // // // // //           type="text"
// // // // // // // // // // //           placeholder="Search by guest name..."
// // // // // // // // // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // // // // // // // // //           value={search}
// // // // // // // // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // // // // // // // //         />
// // // // // // // // // // //       </div>

// // // // // // // // // // // {/* Table */}
// // // // // // // // // // // {/* Table */}
// // // // // // // // // // // <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // // // // // // // // //   <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // // // // // // // // //     <thead className="bg-gray-50">
// // // // // // // // // // //       <tr>
// // // // // // // // // // //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // // // // // // // // // //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // // // // // // // // // //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // // // // // // // // // //         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // // // // // // // // // //         <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // // // // // // // // //       </tr>
// // // // // // // // // // //     </thead>
// // // // // // // // // // //     <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // // // //       {filteredBookings.map((b, i) => (
// // // // // // // // // // //         <tr key={i} className="hover:bg-gray-50">
// // // // // // // // // // //           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // // // // // // // // //           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // // // // // // // // //           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // // // // // // // // // //           <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // // // // // // // // // //           <td className="px-6 py-4 text-center">
// // // // // // // // // // //             <div className="flex justify-center gap-2 text-sm">
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => handleView(b)}
// // // // // // // // // // //                 title="View"
// // // // // // // // // // //                 className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // // // // // // // // //               >
// // // // // // // // // // //                 <FaEye />
// // // // // // // // // // //               </button>
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => handleEdit(i)}
// // // // // // // // // // //                 title="Edit"
// // // // // // // // // // //                 className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // // // // // // // // //               >
// // // // // // // // // // //                 <FaEdit />
// // // // // // // // // // //               </button>
// // // // // // // // // // //               <button
// // // // // // // // // // //                 onClick={() => handleDelete(i)}
// // // // // // // // // // //                 title="Delete"
// // // // // // // // // // //                 className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // // // // // // // // //               >
// // // // // // // // // // //                 <FaTrash />
// // // // // // // // // // //               </button>
// // // // // // // // // // //             </div>
// // // // // // // // // // //           </td>
// // // // // // // // // // //         </tr>
// // // // // // // // // // //       ))}
// // // // // // // // // // //     </tbody>
// // // // // // // // // // //   </table>
// // // // // // // // // // // </div>



// // // // // // // // // // //     </div>
// // // // // // // // // // //   );
// // // // // // // // // // // };

// // // // // // // // // // // export default BookingPage;
// // // // // // // // // // // BookingPage.jsx
// // // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // // // // // // // import { Link } from "react-router-dom";

// // // // // // // // // // const initialFormState = {
// // // // // // // // // //   name: "",
// // // // // // // // // //   roomNumber: "",
// // // // // // // // // //   checkIn: "",
// // // // // // // // // //   checkOut: "",
// // // // // // // // // // };

// // // // // // // // // // const BookingPage = () => {
// // // // // // // // // //   const [formData, setFormData] = useState(initialFormState);
// // // // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // // //   const [loading, setLoading] = useState(true); // Added loading state
// // // // // // // // // //   const [error, setError] = useState(null);   // Added error state

// // // // // // // // // //   // Function to get the authentication token from localStorage
// // // // // // // // // //   const getAuthToken = () => {
// // // // // // // // // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // // // // // // // // //   };

// // // // // // // // // //   // Function to fetch bookings
// // // // // // // // // //   const fetchBookings = async () => {
// // // // // // // // // //     setLoading(true);
// // // // // // // // // //     setError(null);
// // // // // // // // // //     const token = getAuthToken();
// // // // // // // // // //     if (!token) {
// // // // // // // // // //       console.error("Authentication token not found. Cannot fetch bookings.");
// // // // // // // // // //       setError("Authentication required. Please log in.");
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //       return;
// // // // // // // // // //     }

// // // // // // // // // //     try {
// // // // // // // // // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings", {
// // // // // // // // // //         headers: {
// // // // // // // // // //           "Authorization": `Bearer ${token}`
// // // // // // // // // //         }
// // // // // // // // // //       });

// // // // // // // // // //       // Check if the response is OK (status 200-299)
// // // // // // // // // //       if (!res.ok) {
// // // // // // // // // //         let errorData;
// // // // // // // // // //         try {
// // // // // // // // // //           // Try to parse error as JSON, if not, use response text
// // // // // // // // // //           errorData = await res.json();
// // // // // // // // // //         } catch (jsonError) {
// // // // // // // // // //           errorData = await res.text(); // Get raw text if not JSON
// // // // // // // // // //         }
// // // // // // // // // //         console.error("Failed to fetch bookings:", res.status, errorData);
// // // // // // // // // //         setError(`Failed to load bookings: ${res.status} - ${errorData.message || errorData.error || errorData}`);
// // // // // // // // // //         setLoading(false);
// // // // // // // // // //         return;
// // // // // // // // // //       }

// // // // // // // // // //       const data = await res.json();
      
// // // // // // // // // //       // Map API data to table format
// // // // // // // // // //       if (Array.isArray(data.bookings)) {
// // // // // // // // // //         setBookings(data.bookings.map(b => ({
// // // // // // // // // //           name: b.guestDetails?.name || "",
// // // // // // // // // //           roomNumber: b.roomNumber || "",
// // // // // // // // // //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // // // // // // // // //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // // // // // // // // //           _raw: b // Store raw data for view/edit operations if needed
// // // // // // // // // //         })));
// // // // // // // // // //       } else {
// // // // // // // // // //         console.warn("API response for bookings did not contain an array in 'bookings' property:", data);
// // // // // // // // // //         setBookings([]);
// // // // // // // // // //       }
// // // // // // // // // //     } catch (err) {
// // // // // // // // // //       console.error("Error fetching bookings:", err);
// // // // // // // // // //       setError(`Network error or invalid response: ${err.message}`);
// // // // // // // // // //     } finally {
// // // // // // // // // //       setLoading(false);
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   // Fetch bookings on component mount
// // // // // // // // // //   useEffect(() => {
// // // // // // // // // //     fetchBookings();
// // // // // // // // // //   }, []); // Empty dependency array means this runs once on component mount

// // // // // // // // // //   const handleView = (data) => {
// // // // // // // // // //     // Use a custom modal or a more sophisticated display instead of alert
// // // // // // // // // //     // For now, keeping alert as per previous code, but it's not ideal for complex data
// // // // // // // // // //     alert("Viewing: " + JSON.stringify(data, null, 2));
// // // // // // // // // //   };

// // // // // // // // // //   const handleEdit = (index) => {
// // // // // // // // // //     const selected = bookings[index];
// // // // // // // // // //     setFormData(selected);
// // // // // // // // // //     // In a real app, you'd likely navigate to an edit form with this data
// // // // // // // // // //     alert("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // // // // // // // // //   };

// // // // // // // // // //   const handleDelete = (index) => {
// // // // // // // // // //     // In a real app, you'd make an API call to delete the booking by its _id
// // // // // // // // // //     if (window.confirm("Are you sure you want to delete this booking?")) {
// // // // // // // // // //       const updated = [...bookings];
// // // // // // // // // //       updated.splice(index, 1);
// // // // // // // // // //       setBookings(updated);
// // // // // // // // // //       alert("Booking deleted from frontend (API call for backend deletion not implemented here).");
// // // // // // // // // //     }
// // // // // // // // // //   };

// // // // // // // // // //   const filteredBookings = bookings.filter((b) =>
// // // // // // // // // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // // // // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // // // // // // // // //   );

// // // // // // // // // //   return (
// // // // // // // // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // // // // // // // // //       <div className="flex justify-between items-center mb-4">
// // // // // // // // // //         <h2 className="text-2xl font-semibold">Bookings</h2>
// // // // // // // // // //         <div className="flex gap-3">
// // // // // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // // // //             <Link to="/bookingform">Add Booking</Link>
// // // // // // // // // //           </button>
// // // // // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // // // //             <Link to="/reservation">Reservation</Link>
// // // // // // // // // //           </button>
// // // // // // // // // //         </div>
// // // // // // // // // //       </div>

// // // // // // // // // //       {/* Search */}
// // // // // // // // // //       <div className="mb-6 flex justify-start">
// // // // // // // // // //         <input
// // // // // // // // // //           type="text"
// // // // // // // // // //           placeholder="Search by guest name or room number..."
// // // // // // // // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // // // // // // // //           value={search}
// // // // // // // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // // // // // // //         />
// // // // // // // // // //       </div>

// // // // // // // // // //       {loading ? (
// // // // // // // // // //         <div className="text-center py-8">Loading bookings...</div>
// // // // // // // // // //       ) : error ? (
// // // // // // // // // //         <div className="text-center py-8 text-red-600">{error}</div>
// // // // // // // // // //       ) : (
// // // // // // // // // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // // // // // // // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // // // // // // // //             <thead className="bg-gray-50">
// // // // // // // // // //               <tr>
// // // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // // // // // // // // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // // // // // // // //               </tr>
// // // // // // // // // //             </thead>
// // // // // // // // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // // //               {filteredBookings.length > 0 ? (
// // // // // // // // // //                 filteredBookings.map((b, i) => (
// // // // // // // // // //                   <tr key={i} className="hover:bg-gray-50">
// // // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // // // // // // // // //                     <td className="px-6 py-4 text-center">
// // // // // // // // // //                       <div className="flex justify-center gap-2 text-sm">
// // // // // // // // // //                         <button
// // // // // // // // // //                           onClick={() => handleView(b)}
// // // // // // // // // //                           title="View"
// // // // // // // // // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // // // // // // // //                         >
// // // // // // // // // //                           <FaEye />
// // // // // // // // // //                         </button>
// // // // // // // // // //                         <button
// // // // // // // // // //                           onClick={() => handleEdit(i)}
// // // // // // // // // //                           title="Edit"
// // // // // // // // // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // // // // // // // //                         >
// // // // // // // // // //                           <FaEdit />
// // // // // // // // // //                         </button>
// // // // // // // // // //                         <button
// // // // // // // // // //                           onClick={() => handleDelete(i)}
// // // // // // // // // //                           title="Delete"
// // // // // // // // // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // // // // // // // //                         >
// // // // // // // // // //                           <FaTrash />
// // // // // // // // // //                         </button>
// // // // // // // // // //                       </div>
// // // // // // // // // //                     </td>
// // // // // // // // // //                   </tr>
// // // // // // // // // //                 ))
// // // // // // // // // //               ) : (
// // // // // // // // // //                 <tr>
// // // // // // // // // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // // // // // // // // //                     No bookings found.
// // // // // // // // // //                   </td>
// // // // // // // // // //                 </tr>
// // // // // // // // // //               )}
// // // // // // // // // //             </tbody>
// // // // // // // // // //           </table>
// // // // // // // // // //         </div>
// // // // // // // // // //       )}
// // // // // // // // // //     </div>
// // // // // // // // // //   );
// // // // // // // // // // };

// // // // // // // // // // export default BookingPage;
// // // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // // // // // // import { Link } from "react-router-dom";

// // // // // // // // // const initialFormState = {
// // // // // // // // //   name: "",
// // // // // // // // //   roomNumber: "",
// // // // // // // // //   checkIn: "",
// // // // // // // // //   checkOut: "",
// // // // // // // // // };

// // // // // // // // // const BookingPage = () => {
// // // // // // // // //   const [formData, setFormData] = useState(initialFormState);
// // // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // // //   const [loading, setLoading] = useState(true); // Added loading state
// // // // // // // // //   const [error, setError] = useState(null);   // Added error state

// // // // // // // // //   // Function to get the authentication token from localStorage
// // // // // // // // //   const getAuthToken = () => {
// // // // // // // // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // // // // // // // //   };

// // // // // // // // //   // Function to fetch bookings
// // // // // // // // //   const fetchBookings = async () => {
// // // // // // // // //     setLoading(true);
// // // // // // // // //     setError(null);
// // // // // // // // //     const token = getAuthToken();
// // // // // // // // //     if (!token) {
// // // // // // // // //       console.error("Authentication token not found. Cannot fetch bookings.");
// // // // // // // // //       setError("Authentication required. Please log in.");
// // // // // // // // //       setLoading(false);
// // // // // // // // //       return;
// // // // // // // // //     }

// // // // // // // // //     try {
// // // // // // // // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings", {
// // // // // // // // //         headers: {
// // // // // // // // //           "Authorization": `Bearer ${token}`
// // // // // // // // //         }
// // // // // // // // //       });

// // // // // // // // //       // --- CRITICAL CHANGE STARTS HERE ---
// // // // // // // // //       // Clone the response so we can try to read it as text if JSON parsing fails
// // // // // // // // //       const clonedRes = res.clone(); 

// // // // // // // // //       // Check if the response is OK (status 200-299)
// // // // // // // // //       if (!res.ok) {
// // // // // // // // //         let errorBody;
// // // // // // // // //         try {
// // // // // // // // //           // Try to parse as JSON first (using the original res)
// // // // // // // // //           errorBody = await res.json();
// // // // // // // // //           // If it's JSON, errorBody will be an object
// // // // // // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// // // // // // // // //         } catch (jsonError) {
// // // // // // // // //           // If JSON parsing fails, it's likely not JSON, so read as text (using the cloned res)
// // // // // // // // //           errorBody = await clonedRes.text();
// // // // // // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody}`);
// // // // // // // // //         }
// // // // // // // // //         console.error("Failed to fetch bookings:", res.status, errorBody);
// // // // // // // // //         setLoading(false);
// // // // // // // // //         return;
// // // // // // // // //       }

// // // // // // // // //       // If response is OK, parse it as JSON
// // // // // // // // //       const data = await res.json(); 
// // // // // // // // //       // --- CRITICAL CHANGE ENDS HERE ---
      
// // // // // // // // //       // Map API data to table format
// // // // // // // // //       if (Array.isArray(data.bookings)) {
// // // // // // // // //         setBookings(data.bookings.map(b => ({
// // // // // // // // //           name: b.guestDetails?.name || "",
// // // // // // // // //           roomNumber: b.roomNumber || "",
// // // // // // // // //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // // // // // // // //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // // // // // // // //           _raw: b // Store raw data for view/edit operations if needed
// // // // // // // // //         })));
// // // // // // // // //       } else {
// // // // // // // // //         console.warn("API response for bookings did not contain an array in 'bookings' property:", data);
// // // // // // // // //         setBookings([]);
// // // // // // // // //       }
// // // // // // // // //     } catch (err) {
// // // // // // // // //       console.error("Error fetching bookings:", err);
// // // // // // // // //       setError(`Network error or invalid response: ${err.message}`);
// // // // // // // // //     } finally {
// // // // // // // // //       setLoading(false);
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   // Fetch bookings on component mount
// // // // // // // // //   useEffect(() => {
// // // // // // // // //     fetchBookings();
// // // // // // // // //   }, []); // Empty dependency array means this runs once on component mount

// // // // // // // // //   const handleView = (data) => {
// // // // // // // // //     alert("Viewing: " + JSON.stringify(data, null, 2));
// // // // // // // // //   };

// // // // // // // // //   const handleEdit = (index) => {
// // // // // // // // //     const selected = bookings[index];
// // // // // // // // //     setFormData(selected);
// // // // // // // // //     alert("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // // // // // // // //   };

// // // // // // // // //   const handleDelete = (index) => {
// // // // // // // // //     if (window.confirm("Are you sure you want to delete this booking?")) {
// // // // // // // // //       const updated = [...bookings];
// // // // // // // // //       updated.splice(index, 1);
// // // // // // // // //       setBookings(updated);
// // // // // // // // //       alert("Booking deleted from frontend (API call for backend deletion not implemented here).");
// // // // // // // // //     }
// // // // // // // // //   };

// // // // // // // // //   const filteredBookings = bookings.filter((b) =>
// // // // // // // // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // // // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // // // // // // // //   );

// // // // // // // // //   return (
// // // // // // // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // // // // // // // //       <div className="flex justify-between items-center mb-4">
// // // // // // // // //         <h2 className="text-2xl font-semibold">Bookings</h2>
// // // // // // // // //         <div className="flex gap-3">
// // // // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // // //             <Link to="/bookingform">Add Booking</Link>
// // // // // // // // //           </button>
// // // // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // // //             <Link to="/reservation">Reservation</Link>
// // // // // // // // //           </button>
// // // // // // // // //         </div>
// // // // // // // // //       </div>

// // // // // // // // //       {/* Search */}
// // // // // // // // //       <div className="mb-6 flex justify-start">
// // // // // // // // //         <input
// // // // // // // // //           type="text"
// // // // // // // // //           placeholder="Search by guest name or room number..."
// // // // // // // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // // // // // // //           value={search}
// // // // // // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // // // // // //         />
// // // // // // // // //       </div>

// // // // // // // // //       {loading ? (
// // // // // // // // //         <div className="text-center py-8">Loading bookings...</div>
// // // // // // // // //       ) : error ? (
// // // // // // // // //         <div className="text-center py-8 text-red-600">{error}</div>
// // // // // // // // //       ) : (
// // // // // // // // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // // // // // // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // // // // // // //             <thead className="bg-gray-50">
// // // // // // // // //               <tr>
// // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // // // // // // // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // // // // // // //               </tr>
// // // // // // // // //             </thead>
// // // // // // // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // // //               {filteredBookings.length > 0 ? (
// // // // // // // // //                 filteredBookings.map((b, i) => (
// // // // // // // // //                   <tr key={i} className="hover:bg-gray-50">
// // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // // // // // // // //                     <td className="px-6 py-4 text-center">
// // // // // // // // //                       <div className="flex justify-center gap-2 text-sm">
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={() => handleView(b)}
// // // // // // // // //                           title="View"
// // // // // // // // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // // // // // // //                         >
// // // // // // // // //                           <FaEye />
// // // // // // // // //                         </button>
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={() => handleEdit(i)}
// // // // // // // // //                           title="Edit"
// // // // // // // // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // // // // // // //                         >
// // // // // // // // //                           <FaEdit />
// // // // // // // // //                         </button>
// // // // // // // // //                         <button
// // // // // // // // //                           onClick={() => handleDelete(i)}
// // // // // // // // //                           title="Delete"
// // // // // // // // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // // // // // // //                         >
// // // // // // // // //                           <FaTrash />
// // // // // // // // //                         </button>
// // // // // // // // //                       </div>
// // // // // // // // //                     </td>
// // // // // // // // //                   </tr>
// // // // // // // // //                 ))
// // // // // // // // //               ) : (
// // // // // // // // //                 <tr>
// // // // // // // // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // // // // // // // //                     No bookings found.
// // // // // // // // //                   </td>
// // // // // // // // //                 </tr>
// // // // // // // // //               )}
// // // // // // // // //             </tbody>
// // // // // // // // //           </table>
// // // // // // // // //         </div>
// // // // // // // // //       )}
// // // // // // // // //     </div>
// // // // // // // // //   );
// // // // // // // // // };

// // // // // // // // // export default BookingPage;
// // // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // // // // // import { Link } from "react-router-dom";

// // // // // // // // const initialFormState = {
// // // // // // // //   name: "",
// // // // // // // //   roomNumber: "",
// // // // // // // //   checkIn: "",
// // // // // // // //   checkOut: "",
// // // // // // // // };

// // // // // // // // const BookingPage = () => {
// // // // // // // //   const [formData, setFormData] = useState(initialFormState);
// // // // // // // //   const [bookings, setBookings] = useState([]);
// // // // // // // //   const [search, setSearch] = useState("");
// // // // // // // //   const [loading, setLoading] = useState(true); // Added loading state
// // // // // // // //   const [error, setError] = useState(null);   // Added error state

// // // // // // // //   // Function to get the authentication token from localStorage
// // // // // // // //   const getAuthToken = () => {
// // // // // // // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // // // // // // //   };

// // // // // // // //   // Function to fetch bookings
// // // // // // // //   const fetchBookings = async () => {
// // // // // // // //     setLoading(true);
// // // // // // // //     setError(null);
// // // // // // // //     const token = getAuthToken();
// // // // // // // //     if (!token) {
// // // // // // // //       console.error("Authentication token not found. Cannot fetch bookings.");
// // // // // // // //       setError("Authentication required. Please log in.");
// // // // // // // //       setLoading(false);
// // // // // // // //       return;
// // // // // // // //     }

// // // // // // // //     try {
// // // // // // // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings", {
// // // // // // // //         headers: {
// // // // // // // //           "Authorization": `Bearer ${token}`
// // // // // // // //         }
// // // // // // // //       });

// // // // // // // //       // Clone the response so we can try to read it as text if JSON parsing fails
// // // // // // // //       const clonedRes = res.clone(); 

// // // // // // // //       // Check if the response is OK (status 200-299)
// // // // // // // //       if (!res.ok) {
// // // // // // // //         let errorBody;
// // // // // // // //         try {
// // // // // // // //           // Try to parse as JSON first (using the original res)
// // // // // // // //           errorBody = await res.json();
// // // // // // // //           // If it's JSON, errorBody will be an object
// // // // // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// // // // // // // //         } catch (jsonError) {
// // // // // // // //           // If JSON parsing fails, it's likely not JSON, so read as text (using the cloned res)
// // // // // // // //           errorBody = await clonedRes.text();
// // // // // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody}`);
// // // // // // // //         }
// // // // // // // //         console.error("Failed to fetch bookings:", res.status, errorBody);
// // // // // // // //         setLoading(false);
// // // // // // // //         return;
// // // // // // // //       }

// // // // // // // //       // If response is OK, parse it as JSON
// // // // // // // //       const data = await res.json(); 
      
// // // // // // // //       // Map API data to table format
// // // // // // // //       if (Array.isArray(data.bookings)) {
// // // // // // // //         setBookings(data.bookings.map(b => ({
// // // // // // // //           name: b.guestDetails?.name || "",
// // // // // // // //           roomNumber: b.roomNumber || "",
// // // // // // // //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // // // // // // //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // // // // // // //           _raw: b // Store raw data for view/edit operations if needed
// // // // // // // //         })));
// // // // // // // //       } else {
// // // // // // // //         console.warn("API response for bookings did not contain an array in 'bookings' property:", data);
// // // // // // // //         setBookings([]);
// // // // // // // //       }
// // // // // // // //     } catch (err) {
// // // // // // // //       console.error("Error fetching bookings:", err);
// // // // // // // //       setError(`Network error or invalid response: ${err.message}`);
// // // // // // // //     } finally {
// // // // // // // //       setLoading(false);
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   // Fetch bookings on component mount
// // // // // // // //   useEffect(() => {
// // // // // // // //     fetchBookings();
// // // // // // // //   }, []); // Empty dependency array means this runs once on component mount

// // // // // // // //   const handleView = (data) => {
// // // // // // // //     alert("Viewing: " + JSON.stringify(data, null, 2));
// // // // // // // //   };

// // // // // // // //   const handleEdit = (index) => {
// // // // // // // //     const selected = bookings[index];
// // // // // // // //     setFormData(selected);
// // // // // // // //     alert("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // // // // // // //   };

// // // // // // // //   const handleDelete = (index) => {
// // // // // // // //     if (window.confirm("Are you sure you want to delete this booking?")) {
// // // // // // // //       const updated = [...bookings];
// // // // // // // //       updated.splice(index, 1);
// // // // // // // //       setBookings(updated);
// // // // // // // //       alert("Booking deleted from frontend (API call for backend deletion not implemented here).");
// // // // // // // //     }
// // // // // // // //   };

// // // // // // // //   const filteredBookings = bookings.filter((b) =>
// // // // // // // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // // // // // // //   );

// // // // // // // //   return (
// // // // // // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // // // // // // //       <div className="flex justify-between items-center mb-4">
// // // // // // // //         <h2 className="text-2xl font-semibold">Bookings</h2>
// // // // // // // //         <div className="flex gap-3">
// // // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // //             <Link to="/bookingform">Add Booking</Link>
// // // // // // // //           </button>
// // // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // // //             <Link to="/reservation">Reservation</Link>
// // // // // // // //           </button>
// // // // // // // //         </div>
// // // // // // // //       </div>

// // // // // // // //       {/* Search */}
// // // // // // // //       <div className="mb-6 flex justify-start">
// // // // // // // //         <input
// // // // // // // //           type="text"
// // // // // // // //           placeholder="Search by guest name or room number..."
// // // // // // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // // // // // //           value={search}
// // // // // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // // // // //         />
// // // // // // // //       </div>

// // // // // // // //       {loading ? (
// // // // // // // //         <div className="text-center py-8">Loading bookings...</div>
// // // // // // // //       ) : error ? (
// // // // // // // //         <div className="text-center py-8 text-red-600">{error}</div>
// // // // // // // //       ) : (
// // // // // // // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // // // // // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // // // // // //             <thead className="bg-gray-50">
// // // // // // // //               <tr>
// // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // // // // // // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // // // // // //               </tr>
// // // // // // // //             </thead>
// // // // // // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // // // // // //               {filteredBookings.length > 0 ? (
// // // // // // // //                 filteredBookings.map((b, i) => (
// // // // // // // //                   <tr key={i} className="hover:bg-gray-50">
// // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // // // // // // //                     <td className="px-6 py-4 text-center">
// // // // // // // //                       <div className="flex justify-center gap-2 text-sm">
// // // // // // // //                         <button
// // // // // // // //                           onClick={() => handleView(b)}
// // // // // // // //                           title="View"
// // // // // // // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // // // // // //                         >
// // // // // // // //                           <FaEye />
// // // // // // // //                         </button>
// // // // // // // //                         <button
// // // // // // // //                           onClick={() => handleEdit(i)}
// // // // // // // //                           title="Edit"
// // // // // // // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // // // // // //                         >
// // // // // // // //                           <FaEdit />
// // // // // // // //                         </button>
// // // // // // // //                         <button
// // // // // // // //                           onClick={() => handleDelete(i)}
// // // // // // // //                           title="Delete"
// // // // // // // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // // // // // //                         >
// // // // // // // //                           <FaTrash />
// // // // // // // //                         </button>
// // // // // // // //                       </div>
// // // // // // // //                     </td>
// // // // // // // //                   </tr>
// // // // // // // //                 ))
// // // // // // // //               ) : (
// // // // // // // //                 <tr>
// // // // // // // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // // // // // // //                     No bookings found.
// // // // // // // //                   </td>
// // // // // // // //                 </tr>
// // // // // // // //               )}
// // // // // // // //             </tbody>
// // // // // // // //           </table>
// // // // // // // //         </div>
// // // // // // // //       )}
// // // // // // // //     </div>
// // // // // // // //   );
// // // // // // // // };

// // // // // // // // export default BookingPage;
// // // // // // // import React, { useState, useEffect } from "react";
// // // // // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // // // // import { Link } from "react-router-dom";

// // // // // // // const initialFormState = {
// // // // // // //   name: "",
// // // // // // //   roomNumber: "",
// // // // // // //   checkIn: "",
// // // // // // //   checkOut: "",
// // // // // // // };

// // // // // // // const BookingPage = () => {
// // // // // // //   const [formData, setFormData] = useState(initialFormState);
// // // // // // //   const [bookings, setBookings] = useState([]); // This will now hold available rooms mapped as bookings
// // // // // // //   const [search, setSearch] = useState("");
// // // // // // //   const [loading, setLoading] = useState(true);
// // // // // // //   const [error, setError] = useState(null);

// // // // // // //   // Function to get the authentication token from localStorage
// // // // // // //   const getAuthToken = () => {
// // // // // // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // // // // // //   };

// // // // // // //   // Function to fetch available rooms and map them to the table structure
// // // // // // //   const fetchAvailableRoomsForTable = async () => {
// // // // // // //     setLoading(true);
// // // // // // //     setError(null);
// // // // // // //     const token = getAuthToken();
// // // // // // //     if (!token) {
// // // // // // //       console.error("Authentication token not found. Cannot fetch available rooms.");
// // // // // // //       setError("Authentication required. Please log in.");
// // // // // // //       setLoading(false);
// // // // // // //       return;
// // // // // // //     }

// // // // // // //     try {
// // // // // // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/rooms/available", { // <<< USING THE NEW API
// // // // // // //         headers: {
// // // // // // //           "Authorization": `Bearer ${token}`
// // // // // // //         }
// // // // // // //       });

// // // // // // //       const clonedRes = res.clone();

// // // // // // //       if (!res.ok) {
// // // // // // //         let errorBody;
// // // // // // //         try {
// // // // // // //           errorBody = await res.json();
// // // // // // //           setError(`Failed to load rooms: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// // // // // // //         } catch (jsonError) {
// // // // // // //           errorBody = await clonedRes.text();
// // // // // // //           setError(`Failed to load rooms: ${res.status} - ${errorBody}`);
// // // // // // //         }
// // // // // // //         console.error("Failed to fetch available rooms:", res.status, errorBody);
// // // // // // //         setLoading(false);
// // // // // // //         return;
// // // // // // //       }

// // // // // // //       const data = await res.json();
      
// // // // // // //       if (data.success && Array.isArray(data.availableRooms)) {
// // // // // // //         // --- MAP availableRooms DATA TO BOOKINGS TABLE STRUCTURE ---
// // // // // // //         const mappedRooms = [];
// // // // // // //         data.availableRooms.forEach(category => {
// // // // // // //           category.rooms.forEach(room => {
// // // // // // //             mappedRooms.push({
// // // // // // //               name: room.title || `Room ${room.room_number}`, // Using room title for 'Name' column
// // // // // // //               roomNumber: room.room_number || "N/A",           // Using room number for 'Room' column
// // // // // // //               checkIn: "",                                    // Not available in this API
// // // // // // //               checkOut: "",                                   // Not available in this API
// // // // // // //               _raw: { ...room, categoryName: category.categoryName } // Keep raw data for potential future use
// // // // // // //             });
// // // // // // //           });
// // // // // // //         });
// // // // // // //         setBookings(mappedRooms);
// // // // // // //       } else {
// // // // // // //         console.warn("API response for available rooms did not contain expected structure:", data);
// // // // // // //         setBookings([]);
// // // // // // //       }
// // // // // // //     } catch (err) {
// // // // // // //       console.error("Error fetching available rooms:", err);
// // // // // // //       setError(`Network error or invalid response: ${err.message}`);
// // // // // // //     } finally {
// // // // // // //       setLoading(false);
// // // // // // //     }
// // // // // // //   };

// // // // // // //   // Fetch available rooms on component mount
// // // // // // //   useEffect(() => {
// // // // // // //     fetchAvailableRoomsForTable();
// // // // // // //   }, []);

// // // // // // //   const handleView = (data) => {
// // // // // // //     alert("Viewing: " + JSON.stringify(data, null, 2));
// // // // // // //   };

// // // // // // //   const handleEdit = (index) => {
// // // // // // //     const selected = bookings[index];
// // // // // // //     setFormData(selected);
// // // // // // //     alert("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // // // // // //   };

// // // // // // //   const handleDelete = (index) => {
// // // // // // //     if (window.confirm("Are you sure you want to delete this room entry from view?")) {
// // // // // // //       const updated = [...bookings];
// // // // // // //       updated.splice(index, 1);
// // // // // // //       setBookings(updated);
// // // // // // //       alert("Entry removed from table (no backend deletion for available rooms).");
// // // // // // //     }
// // // // // // //   };

// // // // // // //   const filteredBookings = bookings.filter((b) =>
// // // // // // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // // // // // //   );

// // // // // // //   return (
// // // // // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // // // // // //       <div className="flex justify-between items-center mb-4">
// // // // // // //         <h2 className="text-2xl font-semibold">Available Rooms</h2> {/* Changed title */}
// // // // // // //         <div className="flex gap-3">
// // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // //             <Link to="/bookingform">Add Booking</Link>
// // // // // // //           </button>
// // // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // // //             <Link to="/reservation">Reservation</Link>
// // // // // // //           </button>
// // // // // // //         </div>
// // // // // // //       </div>

// // // // // // //       {/* Search */}
// // // // // // //       <div className="mb-6 flex justify-start">
// // // // // // //         <input
// // // // // // //           type="text"
// // // // // // //           placeholder="Search by room title or room number..." // Changed placeholder
// // // // // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // // // // //           value={search}
// // // // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // // // //         />
// // // // // // //       </div>

// // // // // // //       {loading ? (
// // // // // // //         <div className="text-center py-8">Loading available rooms...</div>
// // // // // // //       ) : error ? (
// // // // // // //         <div className="text-center py-8 text-red-600">{error}</div>
// // // // // // //       ) : (
// // // // // // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // // // // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // // // // //             <thead className="bg-gray-50">
// // // // // // //               <tr>
// // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Title</th> {/* Changed header */}
// // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room Number</th> {/* Changed header */}
// // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (from API)</th> {/* Added Price */}
// // // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description (from API)</th> {/* Added Description */}
// // // // // // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // // // // //               </tr>
// // // // // // //             </thead>
// // // // // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // // // // //               {filteredBookings.length > 0 ? (
// // // // // // //                 filteredBookings.map((b, i) => (
// // // // // // //                   <tr key={i} className="hover:bg-gray-50">
// // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // // // // //                     {/* Displaying price and description from raw data */}
// // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b._raw.price || 'N/A'}</td>
// // // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b._raw.description || 'N/A'}</td>
// // // // // // //                     <td className="px-6 py-4 text-center">
// // // // // // //                       <div className="flex justify-center gap-2 text-sm">
// // // // // // //                         <button
// // // // // // //                           onClick={() => handleView(b)}
// // // // // // //                           title="View"
// // // // // // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // // // // //                         >
// // // // // // //                           <FaEye />
// // // // // // //                         </button>
// // // // // // //                         <button
// // // // // // //                           onClick={() => handleEdit(i)}
// // // // // // //                           title="Edit"
// // // // // // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // // // // //                         >
// // // // // // //                           <FaEdit />
// // // // // // //                         </button>
// // // // // // //                         <button
// // // // // // //                           onClick={() => handleDelete(i)}
// // // // // // //                           title="Delete"
// // // // // // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // // // // //                         >
// // // // // // //                           <FaTrash />
// // // // // // //                         </button>
// // // // // // //                       </div>
// // // // // // //                     </td>
// // // // // // //                   </tr>
// // // // // // //                 ))
// // // // // // //               ) : (
// // // // // // //                 <tr>
// // // // // // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // // // // // //                     No available rooms found.
// // // // // // //                   </td>
// // // // // // //                 </tr>
// // // // // // //               )}
// // // // // // //             </tbody>
// // // // // // //           </table>
// // // // // // //         </div>
// // // // // // //       )}
// // // // // // //     </div>
// // // // // // //   );
// // // // // // // };

// // // // // // // export default BookingPage;
// // // // // // import React, { useState, useEffect } from "react";
// // // // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // // // import { Link } from "react-router-dom"; // Import Link for navigation

// // // // // // const initialFormState = {
// // // // // //   name: "",
// // // // // //   roomNumber: "",
// // // // // //   checkIn: "",
// // // // // //   checkOut: "",
// // // // // // };

// // // // // // const BookingPage = () => {
// // // // // //   const [formData, setFormData] = useState(initialFormState);
// // // // // //   const [bookings, setBookings] = useState([]);
// // // // // //   const [search, setSearch] = useState("");
// // // // // //   const [loading, setLoading] = useState(true); // Added loading state
// // // // // //   const [error, setError] = useState(null);    // Added error state
// // // // // //   const [message, setMessage] = useState(null); // State for custom messages
// // // // // //   const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
// // // // // //   const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete

// // // // // //   // Function to get the authentication token from localStorage
// // // // // //   const getAuthToken = () => {
// // // // // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // // // // //   };

// // // // // //   // Function to fetch bookings
// // // // // //   const fetchBookings = async () => {
// // // // // //     setLoading(true);
// // // // // //     setError(null);
// // // // // //     setMessage(null); // Clear previous messages
// // // // // //     const token = getAuthToken();
// // // // // //     if (!token) {
// // // // // //       console.error("Authentication token not found. Cannot fetch bookings.");
// // // // // //       setError("Authentication required. Please log in.");
// // // // // //       setLoading(false);
// // // // // //       return;
// // // // // //     }

// // // // // //     try {
// // // // // //       // Changed API endpoint to /api/booking/all as requested
// // // // // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/booking/all", {
// // // // // //         headers: {
// // // // // //           "Authorization": `Bearer ${token}`
// // // // // //         }
// // // // // //       });

// // // // // //       const clonedRes = res.clone(); // Clone the response to read it twice if needed

// // // // // //       if (!res.ok) {
// // // // // //         let errorBody;
// // // // // //         try {
// // // // // //           errorBody = await res.json();
// // // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// // // // // //         } catch (jsonError) {
// // // // // //           errorBody = await clonedRes.text();
// // // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody}`);
// // // // // //         }
// // // // // //         console.error("Failed to fetch bookings:", res.status, errorBody);
// // // // // //         setLoading(false);
// // // // // //         return;
// // // // // //       }

// // // // // //       const data = await res.json();

// // // // // //       // Assuming the /api/booking/all endpoint returns an array directly or within a 'bookings' property
// // // // // //       // Based on the previous component, it returned 'data.rooms'. Let's adjust to be flexible.
// // // // // //       const bookingsData = data.bookings || data.rooms || []; // Try 'bookings', then 'rooms', then empty array

// // // // // //       if (Array.isArray(bookingsData)) {
// // // // // //         setBookings(bookingsData.map(b => ({
// // // // // //           name: b.guestDetails?.name || "",
// // // // // //           roomNumber: b.roomNumber || "",
// // // // // //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // // // // //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // // // // //           _raw: b // Store raw data for view/edit operations if needed
// // // // // //         })));
// // // // // //       } else {
// // // // // //         console.warn("API response for bookings did not contain an array in 'bookings' or 'rooms' property:", data);
// // // // // //         setBookings([]);
// // // // // //       }
// // // // // //     } catch (err) {
// // // // // //       console.error("Error fetching bookings:", err);
// // // // // //       setError(`Network error or invalid response: ${err.message}`);
// // // // // //     } finally {
// // // // // //       setLoading(false);
// // // // // //     }
// // // // // //   };

// // // // // //   // Fetch bookings on component mount
// // // // // //   useEffect(() => {
// // // // // //     fetchBookings();
// // // // // //   }, []); // Empty dependency array means this runs once on component mount

// // // // // //   const handleView = (data) => {
// // // // // //     setMessage("Viewing: " + JSON.stringify(data, null, 2));
// // // // // //   };

// // // // // //   const handleEdit = (index) => {
// // // // // //     const selected = bookings[index];
// // // // // //     setFormData(selected);
// // // // // //     setMessage("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // // // // //   };

// // // // // //   const handleDelete = (index) => {
// // // // // //     setDeleteIndex(index);
// // // // // //     setShowConfirm(true);
// // // // // //   };

// // // // // //   const confirmDelete = () => {
// // // // // //     if (deleteIndex !== null) {
// // // // // //       // In a real app, you'd make an API call to delete the booking by its _id
// // // // // //       const updated = [...bookings];
// // // // // //       updated.splice(deleteIndex, 1);
// // // // // //       setBookings(updated);
// // // // // //       setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
// // // // // //     }
// // // // // //     setShowConfirm(false);
// // // // // //     setDeleteIndex(null);
// // // // // //   };

// // // // // //   const cancelDelete = () => {
// // // // // //     setShowConfirm(false);
// // // // // //     setDeleteIndex(null);
// // // // // //   };

// // // // // //   const filteredBookings = bookings.filter((b) =>
// // // // // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // // // // //   );

// // // // // //   return (
// // // // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // // // // //       <div className="flex justify-between items-center mb-4">
// // // // // //         <h2 className="text-2xl font-semibold">Bookings</h2>
// // // // // //         <div className="flex gap-3">
// // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // //             <Link to="/bookingform">Add Booking</Link>
// // // // // //           </button>
// // // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // // //             <Link to="/reservation">Reservation</Link>
// // // // // //           </button>
// // // // // //         </div>
// // // // // //       </div>

// // // // // //       {/* Search */}
// // // // // //       <div className="mb-6 flex justify-start">
// // // // // //         <input
// // // // // //           type="text"
// // // // // //           placeholder="Search by guest name or room number..."
// // // // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // // // //           value={search}
// // // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // // //         />
// // // // // //       </div>

// // // // // //       {/* Custom Message Display */}
// // // // // //       {message && (
// // // // // //         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
// // // // // //           <span className="block sm:inline">{message}</span>
// // // // // //           <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
// // // // // //             <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
// // // // // //           </span>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {loading ? (
// // // // // //         <div className="text-center py-8">Loading bookings...</div>
// // // // // //       ) : error ? (
// // // // // //         <div className="text-center py-8 text-red-600">{error}</div>
// // // // // //       ) : (
// // // // // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // // // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // // // //             <thead className="bg-gray-50">
// // // // // //               <tr>
// // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // // // // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // // // //               </tr>
// // // // // //             </thead>
// // // // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // // // //               {filteredBookings.length > 0 ? (
// // // // // //                 filteredBookings.map((b, i) => (
// // // // // //                   <tr key={i} className="hover:bg-gray-50">
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // // // // //                     <td className="px-6 py-4 text-center">
// // // // // //                       <div className="flex justify-center gap-2 text-sm">
// // // // // //                         <button
// // // // // //                           onClick={() => handleView(b)}
// // // // // //                           title="View"
// // // // // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // // // //                         >
// // // // // //                           <FaEye />
// // // // // //                         </button>
// // // // // //                         <button
// // // // // //                           onClick={() => handleEdit(i)}
// // // // // //                           title="Edit"
// // // // // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // // // //                         >
// // // // // //                           <FaEdit />
// // // // // //                         </button>
// // // // // //                         <button
// // // // // //                           onClick={() => handleDelete(i)}
// // // // // //                           title="Delete"
// // // // // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // // // //                         >
// // // // // //                           <FaTrash />
// // // // // //                         </button>
// // // // // //                       </div>
// // // // // //                     </td>
// // // // // //                   </tr>
// // // // // //                 ))
// // // // // //               ) : (
// // // // // //                 <tr>
// // // // // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // // // // //                     No bookings found.
// // // // // //                   </td>
// // // // // //                 </tr>
// // // // // //               )}
// // // // // //             </tbody>
// // // // // //           </table>
// // // // // //         </div>
// // // // // //       )}

// // // // // //       {/* Confirmation Modal */}
// // // // // //       {showConfirm && (
// // // // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
// // // // // //           <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
// // // // // //             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
// // // // // //             <p className="mb-6">Are you sure you want to delete this booking?</p>
// // // // // //             <div className="flex justify-end gap-4">
// // // // // //               <button
// // // // // //                 onClick={cancelDelete}
// // // // // //                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// // // // // //               >
// // // // // //                 Cancel
// // // // // //               </button>
// // // // // //               <button
// // // // // //                 onClick={confirmDelete}
// // // // // //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
// // // // // //               >
// // // // // //                 Delete
// // // // // //               </button>
// // // // // //             </div>
// // // // // //           </div>
// // // // // //         </div>
// // // // // //       )}
// // // // // //     </div>
// // // // // //   );
// // // // // // };

// // // // // // export default BookingPage;
// // // // // import React, { useState, useEffect } from "react";
// // // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // // import { Link } from "react-router-dom"; // Import Link for navigation

// // // // // const initialFormState = {
// // // // //   name: "",
// // // // //   roomNumber: "",
// // // // //   checkIn: "",
// // // // //   checkOut: "",
// // // // // };

// // // // // // Component for displaying booking details in a modal
// // // // // const BookingDetailsModal = ({ booking, onClose }) => {
// // // // //   if (!booking) return null;

// // // // //   // Helper to render sections
// // // // //   const renderSection = (title, data) => {
// // // // //     if (!data || Object.keys(data).length === 0) return null;
// // // // //     return (
// // // // //       <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// // // // //         <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
// // // // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// // // // //           {Object.entries(data).map(([key, value]) => {
// // // // //             // Format dates if they look like ISO strings
// // // // //             let displayValue = value;
// // // // //             if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
// // // // //               displayValue = new Date(value).toLocaleString();
// // // // //             } else if (typeof value === 'boolean') {
// // // // //               displayValue = value ? 'Yes' : 'No';
// // // // //             } else if (Array.isArray(value)) {
// // // // //               displayValue = value.join(', ');
// // // // //             } else if (typeof value === 'object' && value !== null) {
// // // // //               displayValue = JSON.stringify(value); // Fallback for nested objects not explicitly handled
// // // // //             }

// // // // //             return (
// // // // //               <div key={key} className="flex flex-col">
// // // // //                 <span className="font-medium text-gray-600 capitalize">
// // // // //                   {key.replace(/([A-Z])/g, ' $1').trim()}:
// // // // //                 </span>
// // // // //                 <span className="text-gray-900">{displayValue || 'N/A'}</span>
// // // // //               </div>
// // // // //             );
// // // // //           })}
// // // // //         </div>
// // // // //       </div>
// // // // //     );
// // // // //   };

// // // // //   return (
// // // // //     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
// // // // //       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 relative">
// // // // //         <button
// // // // //           onClick={onClose}
// // // // //           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
// // // // //           title="Close"
// // // // //         >
// // // // //           &times;
// // // // //         </button>
// // // // //         <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Booking Details</h3>

// // // // //         <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long content */}
// // // // //           {renderSection("Guest Details", booking.guestDetails)}
// // // // //           {renderSection("Contact Details", booking.contactDetails)}
// // // // //           {renderSection("Identity Details", booking.identityDetails)}
// // // // //           {renderSection("Booking Information", booking.bookingInfo)}
// // // // //           {renderSection("Payment Details", booking.paymentDetails)}
// // // // //           {renderSection("Vehicle Details", booking.vehicleDetails)}

// // // // //           {/* Other top-level details */}
// // // // //           <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// // // // //             <h4 className="font-semibold text-lg mb-2 text-gray-800">General Information</h4>
// // // // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// // // // //               <div className="flex flex-col">
// // // // //                 <span className="font-medium text-gray-600">Category ID:</span>
// // // // //                 <span className="text-gray-900">{booking.categoryId || 'N/A'}</span>
// // // // //               </div>
// // // // //               <div className="flex flex-col">
// // // // //                 <span className="font-medium text-gray-600">Reservation ID:</span>
// // // // //                 <span className="text-gray-900">{booking.reservationId || 'N/A'}</span>
// // // // //               </div>
// // // // //               <div className="flex flex-col">
// // // // //                 <span className="font-medium text-gray-600">Count:</span>
// // // // //                 <span className="text-gray-900">{booking.count || 'N/A'}</span>
// // // // //               </div>
// // // // //               <div className="flex flex-col">
// // // // //                 <span className="font-medium text-gray-600">VIP:</span>
// // // // //                 <span className="text-gray-900">{booking.vip ? 'Yes' : 'No'}</span>
// // // // //               </div>
// // // // //               <div className="flex flex-col">
// // // // //                 <span className="font-medium text-gray-600">Foreign Guest:</span>
// // // // //                 <span className="text-gray-900">{booking.isForeignGuest ? 'Yes' : 'No'}</span>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // };


// // // // // const BookingPage = () => {
// // // // //   const [formData, setFormData] = useState(initialFormState);
// // // // //   const [bookings, setBookings] = useState([]);
// // // // //   const [search, setSearch] = useState("");
// // // // //   const [loading, setLoading] = useState(true); // Added loading state
// // // // //   const [error, setError] = useState(null);    // Added error state
// // // // //   const [message, setMessage] = useState(null); // State for custom messages
// // // // //   const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
// // // // //   const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete
// // // // //   const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
// // // // //   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // State for selected booking details

// // // // //   // Function to get the authentication token from localStorage
// // // // //   const getAuthToken = () => {
// // // // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // // // //   };

// // // // //   // Function to fetch bookings
// // // // //   const fetchBookings = async () => {
// // // // //     setLoading(true);
// // // // //     setError(null);
// // // // //     setMessage(null); // Clear previous messages
// // // // //     const token = getAuthToken();
// // // // //     if (!token) {
// // // // //       console.error("Authentication token not found. Cannot fetch bookings.");
// // // // //       setError("Authentication required. Please log in.");
// // // // //       setLoading(false);
// // // // //       return;
// // // // //     }

// // // // //     try {
// // // // //       // Changed API endpoint to /api/booking/all as requested
// // // // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/booking/all", {
// // // // //         headers: {
// // // // //           "Authorization": `Bearer ${token}`
// // // // //         }
// // // // //       });

// // // // //       const clonedRes = res.clone(); // Clone the response to read it twice if needed

// // // // //       if (!res.ok) {
// // // // //         let errorBody;
// // // // //         try {
// // // // //           errorBody = await res.json();
// // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// // // // //         } catch (jsonError) {
// // // // //           errorBody = await clonedRes.text();
// // // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody}`);
// // // // //         }
// // // // //         console.error("Failed to fetch bookings:", res.status, errorBody);
// // // // //         setLoading(false);
// // // // //         return;
// // // // //       }

// // // // //       const data = await res.json();

// // // // //       // Assuming the /api/booking/all endpoint returns an array directly or within a 'bookings' property
// // // // //       // Based on the previous component, it returned 'data.rooms'. Let's adjust to be flexible.
// // // // //       const bookingsData = data.bookings || data.rooms || []; // Try 'bookings', then 'rooms', then empty array

// // // // //       if (Array.isArray(bookingsData)) {
// // // // //         setBookings(bookingsData.map(b => ({
// // // // //           name: b.guestDetails?.name || "",
// // // // //           roomNumber: b.roomNumber || "",
// // // // //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // // // //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // // // //           _raw: b // Store raw data for view/edit operations if needed
// // // // //         })));
// // // // //       } else {
// // // // //         console.warn("API response for bookings did not contain an array in 'bookings' or 'rooms' property:", data);
// // // // //         setBookings([]);
// // // // //       }
// // // // //     } catch (err) {
// // // // //       console.error("Error fetching bookings:", err);
// // // // //       setError(`Network error or invalid response: ${err.message}`);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   // Fetch bookings on component mount
// // // // //   useEffect(() => {
// // // // //     fetchBookings();
// // // // //   }, []); // Empty dependency array means this runs once on component mount

// // // // //   const handleView = (bookingRawData) => {
// // // // //     setSelectedBookingDetails(bookingRawData._raw); // Set the raw data for the modal
// // // // //     setShowDetailsModal(true); // Show the modal
// // // // //   };

// // // // //   const handleEdit = (index) => {
// // // // //     const selected = bookings[index];
// // // // //     setFormData(selected);
// // // // //     setMessage("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // // // //   };

// // // // //   const handleDelete = (index) => {
// // // // //     setDeleteIndex(index);
// // // // //     setShowConfirm(true);
// // // // //   };

// // // // //   const confirmDelete = () => {
// // // // //     if (deleteIndex !== null) {
// // // // //       // In a real app, you'd make an API call to delete the booking by its _id
// // // // //       const updated = [...bookings];
// // // // //       updated.splice(deleteIndex, 1);
// // // // //       setBookings(updated);
// // // // //       setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
// // // // //     }
// // // // //     setShowConfirm(false);
// // // // //     setDeleteIndex(null);
// // // // //   };

// // // // //   const cancelDelete = () => {
// // // // //     setShowConfirm(false);
// // // // //     setDeleteIndex(null);
// // // // //   };

// // // // //   const filteredBookings = bookings.filter((b) =>
// // // // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // // // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // // // //   );

// // // // //   return (
// // // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // // // //       <div className="flex justify-between items-center mb-4">
// // // // //         <h2 className="text-2xl font-semibold">Bookings</h2>
// // // // //         <div className="flex gap-3">
// // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // //             <Link to="/bookingform">Add Booking</Link>
// // // // //           </button>
// // // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // // //             <Link to="/reservation">Reservation</Link>
// // // // //           </button>
// // // // //         </div>
// // // // //       </div>

// // // // //       {/* Search */}
// // // // //       <div className="mb-6 flex justify-start">
// // // // //         <input
// // // // //           type="text"
// // // // //           placeholder="Search by guest name or room number..."
// // // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // // //           value={search}
// // // // //           onChange={(e) => setSearch(e.target.value)}
// // // // //         />
// // // // //       </div>

// // // // //       {/* Custom Message Display */}
// // // // //       {message && (
// // // // //         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
// // // // //           <span className="block sm:inline">{message}</span>
// // // // //           <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
// // // // //             <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
// // // // //           </span>
// // // // //         </div>
// // // // //       )}

// // // // //       {loading ? (
// // // // //         <div className="text-center py-8">Loading bookings...</div>
// // // // //       ) : error ? (
// // // // //         <div className="text-center py-8 text-red-600">{error}</div>
// // // // //       ) : (
// // // // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // // //             <thead className="bg-gray-50">
// // // // //               <tr>
// // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // // // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // // //               </tr>
// // // // //             </thead>
// // // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // // //               {filteredBookings.length > 0 ? (
// // // // //                 filteredBookings.map((b, i) => (
// // // // //                   <tr key={i} className="hover:bg-gray-50">
// // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // // // //                     <td className="px-6 py-4 text-center">
// // // // //                       <div className="flex justify-center gap-2 text-sm">
// // // // //                         <button
// // // // //                           onClick={() => handleView(b)} // Pass the raw booking data
// // // // //                           title="View"
// // // // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // // //                         >
// // // // //                           <FaEye />
// // // // //                         </button>
// // // // //                         <button
// // // // //                           onClick={() => handleEdit(i)}
// // // // //                           title="Edit"
// // // // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // // //                         >
// // // // //                           <FaEdit />
// // // // //                         </button>
// // // // //                         <button
// // // // //                           onClick={() => handleDelete(i)}
// // // // //                           title="Delete"
// // // // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // // //                         >
// // // // //                           <FaTrash />
// // // // //                         </button>
// // // // //                       </div>
// // // // //                     </td>
// // // // //                   </tr>
// // // // //                 ))
// // // // //               ) : (
// // // // //                 <tr>
// // // // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // // // //                     No bookings found.
// // // // //                   </td>
// // // // //                 </tr>
// // // // //               )}
// // // // //             </tbody>
// // // // //           </table>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Confirmation Modal */}
// // // // //       {showConfirm && (
// // // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
// // // // //           <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
// // // // //             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
// // // // //             <p className="mb-6">Are you sure you want to delete this booking?</p>
// // // // //             <div className="flex justify-end gap-4">
// // // // //               <button
// // // // //                 onClick={cancelDelete}
// // // // //                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// // // // //               >
// // // // //                 Cancel
// // // // //               </button>
// // // // //               <button
// // // // //                 onClick={confirmDelete}
// // // // //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
// // // // //               >
// // // // //                 Delete
// // // // //               </button>
// // // // //             </div>
// // // // //           </div>
// // // // //         </div>
// // // // //       )}

// // // // //       {/* Booking Details Modal */}
// // // // //       <BookingDetailsModal
// // // // //         booking={selectedBookingDetails}
// // // // //         onClose={() => setShowDetailsModal(false)}
// // // // //       />
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default BookingPage;
// // // // import React, { useState, useEffect } from "react";
// // // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // // import { Link } from "react-router-dom"; // Import Link for navigation

// // // // const initialFormState = {
// // // //   name: "",
// // // //   roomNumber: "",
// // // //   checkIn: "",
// // // //   checkOut: "",
// // // // };

// // // // // Component for displaying booking details in a modal
// // // // const BookingDetailsModal = ({ booking, onClose }) => {
// // // //   if (!booking) return null;

// // // //   // Helper to render sections
// // // //   const renderSection = (title, data) => {
// // // //     if (!data || Object.keys(data).length === 0) return null;
// // // //     return (
// // // //       <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// // // //         <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// // // //           {Object.entries(data).map(([key, value]) => {
// // // //             // Format dates if they look like ISO strings
// // // //             let displayValue = value;
// // // //             if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
// // // //               displayValue = new Date(value).toLocaleString();
// // // //             } else if (typeof value === 'boolean') {
// // // //               displayValue = value ? 'Yes' : 'No';
// // // //             } else if (Array.isArray(value)) {
// // // //               displayValue = value.join(', ');
// // // //             } else if (typeof value === 'object' && value !== null) {
// // // //               displayValue = JSON.stringify(value); // Fallback for nested objects not explicitly handled
// // // //             }

// // // //             return (
// // // //               <div key={key} className="flex flex-col">
// // // //                 <span className="font-medium text-gray-600 capitalize">
// // // //                   {key.replace(/([A-Z])/g, ' $1').trim()}:
// // // //                 </span>
// // // //                 <span className="text-gray-900">{displayValue || 'N/A'}</span>
// // // //               </div>
// // // //             );
// // // //           })}
// // // //         </div>
// // // //       </div>
// // // //     );
// // // //   };

// // // //   return (
// // // //     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
// // // //       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 relative">
// // // //         <button
// // // //           onClick={onClose}
// // // //           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
// // // //           title="Close"
// // // //         >
// // // //           &times;
// // // //         </button>
// // // //         <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Booking Details</h3>

// // // //         <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long content */}
// // // //           {renderSection("Guest Details", booking.guestDetails)}
// // // //           {renderSection("Contact Details", booking.contactDetails)}
// // // //           {renderSection("Identity Details", booking.identityDetails)}
// // // //           {renderSection("Booking Information", booking.bookingInfo)}
// // // //           {renderSection("Payment Details", booking.paymentDetails)}
// // // //           {renderSection("Vehicle Details", booking.vehicleDetails)}

// // // //           {/* Other top-level details */}
// // // //           <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// // // //             <h4 className="font-semibold text-lg mb-2 text-gray-800">General Information</h4>
// // // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// // // //               <div className="flex flex-col">
// // // //                 <span className="font-medium text-gray-600">Category ID:</span>
// // // //                 <span className="text-gray-900">{booking.categoryId || 'N/A'}</span>
// // // //               </div>
// // // //               <div className="flex flex-col">
// // // //                 <span className="font-medium text-gray-600">Reservation ID:</span>
// // // //                 <span className="text-gray-900">{booking.reservationId || 'N/A'}</span>
// // // //               </div>
// // // //               <div className="flex flex-col">
// // // //                 <span className="font-medium text-gray-600">Count:</span>
// // // //                 <span className="text-gray-900">{booking.count || 'N/A'}</span>
// // // //               </div>
// // // //               <div className="flex flex-col">
// // // //                 <span className="font-medium text-gray-600">VIP:</span>
// // // //                 <span className="text-gray-900">{booking.vip ? 'Yes' : 'No'}</span>
// // // //               </div>
// // // //               <div className="flex flex-col">
// // // //                 <span className="font-medium text-gray-600">Foreign Guest:</span>
// // // //                 <span className="text-gray-900">{booking.isForeignGuest ? 'Yes' : 'No'}</span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };


// // // // const BookingPage = () => {
// // // //   const [formData, setFormData] = useState(initialFormState);
// // // //   const [bookings, setBookings] = useState([]);
// // // //   const [search, setSearch] = useState("");
// // // //   const [loading, setLoading] = useState(true); // Added loading state
// // // //   const [error, setError] = useState(null);    // Added error state
// // // //   const [message, setMessage] = useState(null); // State for custom messages
// // // //   const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
// // // //   const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete
// // // //   const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
// // // //   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // State for selected booking details

// // // //   // Function to get the authentication token from localStorage
// // // //   const getAuthToken = () => {
// // // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // // //   };

// // // //   // Function to fetch bookings
// // // //   const fetchBookings = async () => {
// // // //     setLoading(true);
// // // //     setError(null);
// // // //     setMessage(null); // Clear previous messages
// // // //     const token = getAuthToken();
// // // //     if (!token) {
// // // //       console.error("Authentication token not found. Cannot fetch bookings.");
// // // //       setError("Authentication required. Please log in.");
// // // //       setLoading(false);
// // // //       return;
// // // //     }

// // // //     try {
// // // //       // Changed API endpoint back to /api/bookings (plural)
// // // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings", {
// // // //         headers: {
// // // //           "Authorization": `Bearer ${token}`
// // // //         }
// // // //       });

// // // //       const clonedRes = res.clone(); // Clone the response to read it twice if needed

// // // //       if (!res.ok) {
// // // //         let errorBody;
// // // //         try {
// // // //           errorBody = await res.json();
// // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// // // //         } catch (jsonError) {
// // // //           errorBody = await clonedRes.text();
// // // //           setError(`Failed to load bookings: ${res.status} - ${errorBody}`);
// // // //         }
// // // //         console.error("Failed to fetch bookings:", res.status, errorBody);
// // // //         setLoading(false);
// // // //         return;
// // // //       }

// // // //       const data = await res.json();

// // // //       // Assuming the /api/bookings endpoint returns an array within a 'bookings' property
// // // //       const bookingsData = data.bookings || []; // Now specifically expecting 'bookings'

// // // //       if (Array.isArray(bookingsData)) {
// // // //         setBookings(bookingsData.map(b => ({
// // // //           name: b.guestDetails?.name || "",
// // // //           roomNumber: b.roomNumber || "",
// // // //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // // //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // // //           _raw: b // Store raw data for view/edit operations if needed
// // // //         })));
// // // //       } else {
// // // //         console.warn("API response for bookings did not contain an array in 'bookings' property:", data);
// // // //         setBookings([]);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error("Error fetching bookings:", err);
// // // //       setError(`Network error or invalid response: ${err.message}`);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   // Fetch bookings on component mount
// // // //   useEffect(() => {
// // // //     fetchBookings();
// // // //   }, []); // Empty dependency array means this runs once on component mount

// // // //   const handleView = (bookingRawData) => {
// // // //     setSelectedBookingDetails(bookingRawData._raw); // Set the raw data for the modal
// // // //     setShowDetailsModal(true); // Show the modal
// // // //   };

// // // //   const handleEdit = (index) => {
// // // //     const selected = bookings[index];
// // // //     setFormData(selected);
// // // //     setMessage("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // // //   };

// // // //   const handleDelete = (index) => {
// // // //     setDeleteIndex(index);
// // // //     setShowConfirm(true);
// // // //   };

// // // //   const confirmDelete = () => {
// // // //     if (deleteIndex !== null) {
// // // //       // In a real app, you'd make an API call to delete the booking by its _id
// // // //       const updated = [...bookings];
// // // //       updated.splice(deleteIndex, 1);
// // // //       setBookings(updated);
// // // //       setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
// // // //     }
// // // //     setShowConfirm(false);
// // // //     setDeleteIndex(null);
// // // //   };

// // // //   const cancelDelete = () => {
// // // //     setShowConfirm(false);
// // // //     setDeleteIndex(null);
// // // //   };

// // // //   const filteredBookings = bookings.filter((b) =>
// // // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // // //   );

// // // //   return (
// // // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // // //       <div className="flex justify-between items-center mb-4">
// // // //         <h2 className="text-2xl font-semibold">Bookings</h2>
// // // //         <div className="flex gap-3">
// // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // //             <Link to="/bookingform">Add Booking</Link>
// // // //           </button>
// // // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // // //             <Link to="/reservation">Reservation</Link>
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Search */}
// // // //       <div className="mb-6 flex justify-start">
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search by guest name or room number..."
// // // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // // //           value={search}
// // // //           onChange={(e) => setSearch(e.target.value)}
// // // //         />
// // // //       </div>

// // // //       {/* Custom Message Display */}
// // // //       {message && (
// // // //         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
// // // //           <span className="block sm:inline">{message}</span>
// // // //           <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
// // // //             <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
// // // //           </span>
// // // //         </div>
// // // //       )}

// // // //       {loading ? (
// // // //         <div className="text-center py-8">Loading bookings...</div>
// // // //       ) : error ? (
// // // //         <div className="text-center py-8 text-red-600">{error}</div>
// // // //       ) : (
// // // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // // //             <thead className="bg-gray-50">
// // // //               <tr>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // // //               </tr>
// // // //             </thead>
// // // //             <tbody className="bg-white divide-y divide-gray-200">
// // // //               {filteredBookings.length > 0 ? (
// // // //                 filteredBookings.map((b, i) => (
// // // //                   <tr key={i} className="hover:bg-gray-50">
// // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // // //                     <td className="px-6 py-4 text-center">
// // // //                       <div className="flex justify-center gap-2 text-sm">
// // // //                         <button
// // // //                           onClick={() => handleView(b)} // Pass the raw booking data
// // // //                           title="View"
// // // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // // //                         >
// // // //                           <FaEye />
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => handleEdit(i)}
// // // //                           title="Edit"
// // // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // // //                         >
// // // //                           <FaEdit />
// // // //                         </button>
// // // //                         <button
// // // //                           onClick={() => handleDelete(i)}
// // // //                           title="Delete"
// // // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // // //                         >
// // // //                           <FaTrash />
// // // //                         </button>
// // // //                       </div>
// // // //                     </td>
// // // //                   </tr>
// // // //                 ))
// // // //               ) : (
// // // //                 <tr>
// // // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // // //                     No bookings found.
// // // //                   </td>
// // // //                 </tr>
// // // //               )}
// // // //             </tbody>
// // // //           </table>
// // // //         </div>
// // // //       )}

// // // //       {/* Confirmation Modal */}
// // // //       {showConfirm && (
// // // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
// // // //           <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
// // // //             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
// // // //             <p className="mb-6">Are you sure you want to delete this booking?</p>
// // // //             <div className="flex justify-end gap-4">
// // // //               <button
// // // //                 onClick={cancelDelete}
// // // //                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //               <button
// // // //                 onClick={confirmDelete}
// // // //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
// // // //               >
// // // //                 Delete
// // // //               </button>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       )}

// // // //       {/* Booking Details Modal */}
// // // //       <BookingDetailsModal
// // // //         booking={selectedBookingDetails}
// // // //         onClose={() => setShowDetailsModal(false)}
// // // //       />
// // // //     </div>
// // // //   );
// // // // };

// // // // export default BookingPage;
// // // import React, { useState, useEffect } from "react";
// // // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // // import { Link } from "react-router-dom"; // Import Link for navigation

// // // const initialFormState = {
// // //   name: "",
// // //   roomNumber: "",
// // //   checkIn: "",
// // //   checkOut: "",
// // // };

// // // // Component for displaying booking details in a modal
// // // const BookingDetailsModal = ({ booking, onClose }) => {
// // //   if (!booking) return null;

// // //   // Helper to render sections
// // //   const renderSection = (title, data) => {
// // //     if (!data || Object.keys(data).length === 0) return null;
// // //     return (
// // //       <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// // //         <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// // //           {Object.entries(data).map(([key, value]) => {
// // //             // Format dates if they look like ISO strings
// // //             let displayValue = value;
// // //             if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
// // //               displayValue = new Date(value).toLocaleString();
// // //             } else if (typeof value === 'boolean') {
// // //               displayValue = value ? 'Yes' : 'No';
// // //             } else if (Array.isArray(value)) {
// // //               displayValue = value.join(', ');
// // //             } else if (typeof value === 'object' && value !== null) {
// // //               displayValue = JSON.stringify(value); // Fallback for nested objects not explicitly handled
// // //             }

// // //             return (
// // //               <div key={key} className="flex flex-col">
// // //                 <span className="font-medium text-gray-600 capitalize">
// // //                   {key.replace(/([A-Z])/g, ' $1').trim()}:
// // //                 </span>
// // //                 <span className="text-gray-900">{displayValue || 'N/A'}</span>
// // //               </div>
// // //             );
// // //           })}
// // //         </div>
// // //       </div>
// // //     );
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
// // //       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 relative">
// // //         <button
// // //           onClick={onClose}
// // //           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
// // //           title="Close"
// // //         >
// // //           &times;
// // //         </button>
// // //         <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Booking Details</h3>

// // //         <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long content */}
// // //           {renderSection("Guest Details", booking.guestDetails)}
// // //           {renderSection("Contact Details", booking.contactDetails)}
// // //           {renderSection("Identity Details", booking.identityDetails)}
// // //           {renderSection("Booking Information", booking.bookingInfo)}
// // //           {renderSection("Payment Details", booking.paymentDetails)}
// // //           {renderSection("Vehicle Details", booking.vehicleDetails)}

// // //           {/* Other top-level details */}
// // //           <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// // //             <h4 className="font-semibold text-lg mb-2 text-gray-800">General Information</h4>
// // //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// // //               <div className="flex flex-col">
// // //                 <span className="font-medium text-gray-600">Category ID:</span>
// // //                 <span className="text-gray-900">{booking.categoryId || 'N/A'}</span>
// // //               </div>
// // //               <div className="flex flex-col">
// // //                 <span className="font-medium text-gray-600">Reservation ID:</span>
// // //                 <span className="text-gray-900">{booking.reservationId || 'N/A'}</span>
// // //               </div>
// // //               <div className="flex flex-col">
// // //                 <span className="font-medium text-gray-600">Count:</span>
// // //                 <span className="text-gray-900">{booking.count || 'N/A'}</span>
// // //               </div>
// // //               <div className="flex flex-col">
// // //                 <span className="font-medium text-gray-600">VIP:</span>
// // //                 <span className="text-gray-900">{booking.vip ? 'Yes' : 'No'}</span>
// // //               </div>
// // //               <div className="flex flex-col">
// // //                 <span className="font-medium text-gray-600">Foreign Guest:</span>
// // //                 <span className="text-gray-900">{booking.isForeignGuest ? 'Yes' : 'No'}</span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };


// // // const BookingPage = () => {
// // //   const [formData, setFormData] = useState(initialFormState);
// // //   const [bookings, setBookings] = useState([]);
// // //   const [search, setSearch] = useState("");
// // //   const [loading, setLoading] = useState(true); // Added loading state
// // //   const [error, setError] = useState(null);    // Added error state
// // //   const [message, setMessage] = useState(null); // State for custom messages
// // //   const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
// // //   const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete
// // //   const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
// // //   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // State for selected booking details

// // //   // Dummy data for fallback if API fails
// // //   const dummyBookingData = {
// // //     "categoryId": "687b82f752e72c222f76ec8a",
// // //     "reservationId": "687d9ef51cd0ea2a5344d319",
// // //     "count": 1,
// // //     "guestDetails": {
// // //       "salutation": "Mr",
// // //       "name": "Kumar",
// // //       "age": 39,
// // //       "gender": "Male",
// // //       "photoUrl": "https://cdn.com/images/guests/ravi.jpg"
// // //     },
// // //     "contactDetails": {
// // //       "phone": "9876555560",
// // //       "email": "kumar@example.com",
// // //       "address": "12A, Block C, South City",
// // //       "city": "Gurgaon ncr",
// // //       "state": "Haryana",
// // //       "country": "India",
// // //       "pinCode": "122001"
// // //     },
// // //     "identityDetails": {
// // //       "idType": "Aadhaar",
// // //       "idNumber": "1234-5678-9012",
// // //       "idPhotoFront": "https://cdn.com/id/guests/adhar-front.jpg",
// // //       "idPhotoBack": "https://cdn.com/id/guests/adhar-back.jpg"
// // //     },
// // //     "bookingInfo": {
// // //       "checkIn": "2025-09-20T12:00:00.000Z",
// // //       "checkOut": "2025-09-23T11:00:00.000Z",
// // //       "arrivalFrom": "Lucknow up",
// // //       "bookingType": "Online",
// // //       "purposeOfVisit": "Business",
// // //       "remarks": "Need early check-in",
// // //       "adults": 1,
// // //       "children": 1
// // //     },
// // //     "paymentDetails": {
// // //       "totalAmount": 4500,
// // //       "advancePaid": 2500,
// // //       "paymentMode": "UPI",
// // //       "billingName": "Ravi Kumar",
// // //       "billingAddress": "ABC Pvt Ltd, CP, New Delhi",
// // //       "gstNumber": "07ABCDE1234A1Z1"
// // //     },
// // //     "vehicleDetails": {
// // //       "vehicleNumber": "DL01AB3456",
// // //       "vehicleType": "Sedan",
// // //       "vehicleModel": "Hyundai",
// // //       "driverName": "ramu Singh",
// // //       "driverMobile": "9876512345"
// // //     },
// // //     "vip": true,
// // //     "isForeignGuest": false
// // //   };

// // //   // Function to get the authentication token from localStorage
// // //   const getAuthToken = () => {
// // //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// // //   };

// // //   // Function to fetch bookings
// // //   const fetchBookings = async () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     setMessage(null); // Clear previous messages
// // //     const token = getAuthToken();
// // //     if (!token) {
// // //       console.error("Authentication token not found. Cannot fetch bookings.");
// // //       setError("Authentication required. Please log in.");
// // //       setLoading(false);
// // //       // Fallback to dummy data if no token
// // //       setBookings([
// // //         {
// // //           name: dummyBookingData.guestDetails.name,
// // //           roomNumber: dummyBookingData.roomAssigned || "N/A", // Use roomAssigned from dummy data
// // //           checkIn: dummyBookingData.bookingInfo.checkIn.slice(0, 10),
// // //           checkOut: dummyBookingData.bookingInfo.checkOut.slice(0, 10),
// // //           _raw: dummyBookingData
// // //         }
// // //       ]);
// // //       return;
// // //     }

// // //     try {
// // //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings", {
// // //         headers: {
// // //           "Authorization": `Bearer ${token}`
// // //         }
// // //       });

// // //       const clonedRes = res.clone();

// // //       if (!res.ok) {
// // //         let errorBody;
// // //         try {
// // //           errorBody = await res.json();
// // //           setError(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// // //         } catch (jsonError) {
// // //           errorBody = await clonedRes.text();
// // //           setError(`Failed to load bookings: ${res.status} - ${errorBody}`);
// // //         }
// // //         console.error("Failed to fetch bookings:", res.status, errorBody);
        
// // //         // Fallback to dummy data on API error
// // //         setBookings([
// // //           {
// // //             name: dummyBookingData.guestDetails.name,
// // //             roomNumber: dummyBookingData.roomAssigned || "N/A", // Use roomAssigned from dummy data
// // //             checkIn: dummyBookingData.bookingInfo.checkIn.slice(0, 10),
// // //             checkOut: dummyBookingData.bookingInfo.checkOut.slice(0, 10),
// // //             _raw: dummyBookingData
// // //           }
// // //         ]);
// // //         setLoading(false);
// // //         return;
// // //       }

// // //       const data = await res.json();
// // //       const bookingsData = data.bookings || [];

// // //       if (Array.isArray(bookingsData)) {
// // //         setBookings(bookingsData.map(b => ({
// // //           name: b.guestDetails?.name || "",
// // //           roomNumber: b.roomAssigned || "N/A", // Assuming roomAssigned is the room number
// // //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// // //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// // //           _raw: b // Store raw data for view/edit operations if needed
// // //         })));
// // //       } else {
// // //         console.warn("API response for bookings did not contain an array in 'bookings' property:", data);
// // //         setBookings([]);
// // //       }
// // //     } catch (err) {
// // //       console.error("Error fetching bookings:", err);
// // //       setError(`Network error or invalid response: ${err.message}`);
// // //       // Fallback to dummy data on network/parsing error
// // //       setBookings([
// // //         {
// // //           name: dummyBookingData.guestDetails.name,
// // //           roomNumber: dummyBookingData.roomAssigned || "N/A", // Use roomAssigned from dummy data
// // //           checkIn: dummyBookingData.bookingInfo.checkIn.slice(0, 10),
// // //           checkOut: dummyBookingData.bookingInfo.checkOut.slice(0, 10),
// // //           _raw: dummyBookingData
// // //         }
// // //       ]);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   // Fetch bookings on component mount
// // //   useEffect(() => {
// // //     fetchBookings();
// // //   }, []); // Empty dependency array means this runs once on component mount

// // //   const handleView = (bookingRawData) => {
// // //     setSelectedBookingDetails(bookingRawData._raw); // Set the raw data for the modal
// // //     setShowDetailsModal(true); // Show the modal
// // //   };

// // //   const handleEdit = (index) => {
// // //     const selected = bookings[index];
// // //     setFormData(selected);
// // //     setMessage("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// // //   };

// // //   const handleDelete = (index) => {
// // //     setDeleteIndex(index);
// // //     setShowConfirm(true);
// // //   };

// // //   const confirmDelete = () => {
// // //     if (deleteIndex !== null) {
// // //       // In a real app, you'd make an API call to delete the booking by its _id
// // //       const updated = [...bookings];
// // //       updated.splice(deleteIndex, 1);
// // //       setBookings(updated);
// // //       setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
// // //     }
// // //     setShowConfirm(false);
// // //     setDeleteIndex(null);
// // //   };

// // //   const cancelDelete = () => {
// // //     setShowConfirm(false);
// // //     setDeleteIndex(null);
// // //   };

// // //   const filteredBookings = bookings.filter((b) =>
// // //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// // //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// // //   );

// // //   return (
// // //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// // //       <div className="flex justify-between items-center mb-4">
// // //         <h2 className="text-2xl font-semibold">Bookings</h2>
// // //         <div className="flex gap-3">
// // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // //             <Link to="/bookingform">Add Booking</Link>
// // //           </button>
// // //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// // //             <Link to="/reservation">Reservation</Link>
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Search */}
// // //       <div className="mb-6 flex justify-start">
// // //         <input
// // //           type="text"
// // //           placeholder="Search by guest name or room number..."
// // //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// // //           value={search}
// // //           onChange={(e) => setSearch(e.target.value)}
// // //         />
// // //       </div>

// // //       {/* Custom Message Display */}
// // //       {message && (
// // //         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
// // //           <span className="block sm:inline">{message}</span>
// // //           <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
// // //             <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
// // //           </span>
// // //         </div>
// // //       )}

// // //       {loading ? (
// // //         <div className="text-center py-8">Loading bookings...</div>
// // //       ) : error ? (
// // //         <div className="text-center py-8 text-red-600">{error}. Displaying dummy data as fallback.</div>
// // //       ) : (
// // //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// // //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// // //             <thead className="bg-gray-50">
// // //               <tr>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// // //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// // //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// // //               </tr>
// // //             </thead>
// // //             <tbody className="bg-white divide-y divide-gray-200">
// // //               {filteredBookings.length > 0 ? (
// // //                 filteredBookings.map((b, i) => (
// // //                   <tr key={i} className="hover:bg-gray-50">
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// // //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// // //                     <td className="px-6 py-4 text-center">
// // //                       <div className="flex justify-center gap-2 text-sm">
// // //                         <button
// // //                           onClick={() => handleView(b)} // Pass the raw booking data
// // //                           title="View"
// // //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// // //                         >
// // //                           <FaEye />
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleEdit(i)}
// // //                           title="Edit"
// // //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// // //                         >
// // //                           <FaEdit />
// // //                         </button>
// // //                         <button
// // //                           onClick={() => handleDelete(i)}
// // //                           title="Delete"
// // //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// // //                         >
// // //                           <FaTrash />
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr>
// // //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// // //                     No bookings found.
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>
// // //       )}

// // //       {/* Confirmation Modal */}
// // //       {showConfirm && (
// // //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
// // //           <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
// // //             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
// // //             <p className="mb-6">Are you sure you want to delete this booking?</p>
// // //             <div className="flex justify-end gap-4">
// // //               <button
// // //                 onClick={cancelDelete}
// // //                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// // //               >
// // //                 Cancel
// // //               </button>
// // //               <button
// // //                 onClick={confirmDelete}
// // //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
// // //               >
// // //                 Delete
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>
// // //       )}

// // //       {/* Booking Details Modal */}
// // //       <BookingDetailsModal
// // //         booking={selectedBookingDetails}
// // //         onClose={() => setShowDetailsModal(false)}
// // //       />
// // //     </div>
// // //   );
// // // };

// // // export default BookingPage;

// // import React, { useState, useEffect } from "react";
// // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // import { Link } from "react-router-dom"; // Import Link for navigation

// // const initialFormState = {
// //   name: "",
// //   roomNumber: "",
// //   checkIn: "",
// //   checkOut: "",
// // };

// // // Component for displaying booking details in a modal
// // const BookingDetailsModal = ({ booking, onClose }) => {
// //   if (!booking) return null;

// //   // Helper to render sections
// //   const renderSection = (title, data) => {
// //     if (!data || Object.keys(data).length === 0) return null;
// //     return (
// //       <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// //         <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// //           {Object.entries(data).map(([key, value]) => {
// //             // Format dates if they look like ISO strings
// //             let displayValue = value;
// //             if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
// //               displayValue = new Date(value).toLocaleString();
// //             } else if (typeof value === 'boolean') {
// //               displayValue = value ? 'Yes' : 'No';
// //             } else if (Array.isArray(value)) {
// //               displayValue = value.join(', ');
// //             } else if (typeof value === 'object' && value !== null) {
// //               displayValue = JSON.stringify(value); // Fallback for nested objects not explicitly handled
// //             }

// //             return (
// //               <div key={key} className="flex flex-col">
// //                 <span className="font-medium text-gray-600 capitalize">
// //                   {key.replace(/([A-Z])/g, ' $1').trim()}:
// //                 </span>
// //                 <span className="text-gray-900">{displayValue || 'N/A'}</span>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 relative">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
// //           title="Close"
// //         >
// //           &times;
// //         </button>
// //         <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Booking Details</h3>

// //         <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long content */}
// //           {renderSection("Guest Details", booking.guestDetails)}
// //           {renderSection("Contact Details", booking.contactDetails)}
// //           {renderSection("Identity Details", booking.identityDetails)}
// //           {renderSection("Booking Information", booking.bookingInfo)}
// //           {renderSection("Payment Details", booking.paymentDetails)}
// //           {renderSection("Vehicle Details", booking.vehicleDetails)}

// //           {/* Other top-level details */}
// //           <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// //             <h4 className="font-semibold text-lg mb-2 text-gray-800">General Information</h4>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Category ID:</span>
// //                 <span className="text-gray-900">{booking.categoryId || 'N/A'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Reservation ID:</span>
// //                 <span className="text-gray-900">{booking.reservationId || 'N/A'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Count:</span>
// //                 <span className="text-gray-900">{booking.count || 'N/A'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">VIP:</span>
// //                 <span className="text-gray-900">{booking.vip ? 'Yes' : 'No'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Foreign Guest:</span>
// //                 <span className="text-gray-900">{booking.isForeignGuest ? 'Yes' : 'No'}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // const BookingPage = () => {
// //   const [formData, setFormData] = useState(initialFormState);
// //   const [bookings, setBookings] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true); // Set to true as we are attempting to fetch
// //   const [error, setError] = useState(null);    // Added error state
// //   const [message, setMessage] = useState(null); // State for custom messages
// //   const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
// //   const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete
// //   const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
// //   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // State for selected booking details

// //   // Function to get the authentication token from localStorage
// //   const getAuthToken = () => {
// //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// //   };

// //   // Function to fetch bookings (attempts API only)
// //   const fetchBookings = async () => {
// //     setLoading(true);
// //     setError(null);
// //     setMessage(null); // Clear previous messages
// //     const token = getAuthToken();

// //     try {
// //       if (!token) {
// //         throw new Error("Authentication token not found.");
// //       }

// //       // Attempt to fetch from the API as requested
// //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/booking/all", {
// //         headers: {
// //           "Authorization": `Bearer ${token}`
// //         }
// //       });

// //       const clonedRes = res.clone();

// //       if (!res.ok) {
// //         let errorBody;
// //         try {
// //           errorBody = await res.json();
// //           throw new Error(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// //         } catch (jsonError) {
// //           errorBody = await clonedRes.text();
// //           throw new Error(`Failed to load bookings: ${res.status} - ${errorBody}`);
// //         }
// //       }

// //       const data = await res.json();
// //       // Adjust this line based on the actual structure if the API starts working
// //       // If the API returns an array of bookings directly, use 'data'
// //       // If it returns { bookings: [...] }, use 'data.bookings'
// //       // If it returns { rooms: [...] }, use 'data.rooms'
// //       const bookingsData = data.bookings || data.rooms || [];

// //       if (Array.isArray(bookingsData) && bookingsData.length > 0) {
// //         setBookings(bookingsData.map(b => ({
// //           name: b.guestDetails?.name || "",
// //           roomNumber: b.roomAssigned || "N/A", // Assuming roomAssigned is the room number
// //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// //           _raw: b // Store raw data for view/edit operations if needed
// //         })));
// //       } else {
// //         // If API returns an empty array or unexpected structure, set bookings to empty
// //         console.warn("API response for bookings was empty or unexpected.");
// //         setError("API returned no data.");
// //         setBookings([]);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching bookings:", err);
// //       setError(`${err.message}.`);
// //       // Set bookings to empty on any error (network, auth, API error, etc.)
// //       setBookings([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch bookings on component mount
// //   useEffect(() => {
// //     fetchBookings();
// //   }, []); // Empty dependency array means this runs once on component mount

// //   const handleView = (bookingRawData) => {
// //     setSelectedBookingDetails(bookingRawData._raw); // Set the raw data for the modal
// //     setShowDetailsModal(true); // Show the modal
// //   };

// //   const handleEdit = (index) => {
// //     const selected = bookings[index];
// //     setFormData(selected);
// //     setMessage("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// //   };

// //   const handleDelete = (index) => {
// //     setDeleteIndex(index);
// //     setShowConfirm(true);
// //   };

// //   const confirmDelete = () => {
// //     if (deleteIndex !== null) {
// //       // In a real app, you'd make an API call to delete the booking by its _id
// //       const updated = [...bookings];
// //       updated.splice(deleteIndex, 1);
// //       setBookings(updated);
// //       setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
// //     }
// //     setShowConfirm(false);
// //     setDeleteIndex(null);
// //   };

// //   const cancelDelete = () => {
// //     setShowConfirm(false);
// //     setDeleteIndex(null);
// //   };

// //   const filteredBookings = bookings.filter((b) =>
// //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-2xl font-semibold">Bookings</h2>
// //         <div className="flex gap-3">
// //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// //             <Link to="/bookingform">Add Booking</Link>
// //           </button>
// //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// //             <Link to="/reservation">Reservation</Link>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="mb-6 flex justify-start">
// //         <input
// //           type="text"
// //           placeholder="Search by guest name or room number..."
// //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //       </div>

// //       {/* Custom Message Display */}
// //       {message && (
// //         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
// //           <span className="block sm:inline">{message}</span>
// //           <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
// //             <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
// //           </span>
// //         </div>
// //       )}

// //       {loading ? (
// //         <div className="text-center py-8">Loading bookings...</div>
// //       ) : error ? (
// //         <div className="text-center py-8 text-red-600">{error}</div>
// //       ) : (
// //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredBookings.length > 0 ? (
// //                 filteredBookings.map((b, i) => (
// //                   <tr key={i} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// //                     <td className="px-6 py-4 text-center">
// //                       <div className="flex justify-center gap-2 text-sm">
// //                         <button
// //                           onClick={() => handleView(b)} // Pass the raw booking data
// //                           title="View"
// //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// //                         >
// //                           <FaEye />
// //                         </button>
// //                         <button
// //                           onClick={() => handleEdit(i)}
// //                           title="Edit"
// //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// //                         >
// //                           <FaEdit />
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(i)}
// //                           title="Delete"
// //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// //                         >
// //                           <FaTrash />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// //                     No bookings found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Confirmation Modal */}
// //       {showConfirm && (
// //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
// //           <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
// //             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
// //             <p className="mb-6">Are you sure you want to delete this booking?</p>
// //             <div className="flex justify-end gap-4">
// //               <button
// //                 onClick={cancelDelete}
// //                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={confirmDelete}
// //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Booking Details Modal */}
// //       <BookingDetailsModal
// //         booking={selectedBookingDetails}
// //         onClose={() => setShowDetailsModal(false)}
// //       />
// //     </div>
// //   );
// // };

// // export default BookingPage;
// // import React, { useState, useEffect } from "react";
// // import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// // import { Link } from "react-router-dom"; // Import Link for navigation

// // const initialFormState = {
// //   name: "",
// //   roomNumber: "",
// //   checkIn: "",
// //   checkOut: "",
// // };

// // // Component for displaying booking details in a modal
// // const BookingDetailsModal = ({ booking, onClose }) => {
// //   if (!booking) return null;

// //   // Helper to render sections
// //   const renderSection = (title, data) => {
// //     if (!data || Object.keys(data).length === 0) return null;
// //     return (
// //       <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// //         <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
// //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// //           {Object.entries(data).map(([key, value]) => {
// //             // Format dates if they look like ISO strings
// //             let displayValue = value;
// //             if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
// //               displayValue = new Date(value).toLocaleString();
// //             } else if (typeof value === 'boolean') {
// //               displayValue = value ? 'Yes' : 'No';
// //             } else if (Array.isArray(value)) {
// //               displayValue = value.join(', ');
// //             } else if (typeof value === 'object' && value !== null) {
// //               displayValue = JSON.stringify(value); // Fallback for nested objects not explicitly handled
// //             }

// //             return (
// //               <div key={key} className="flex flex-col">
// //                 <span className="font-medium text-gray-600 capitalize">
// //                   {key.replace(/([A-Z])/g, ' $1').trim()}:
// //                 </span>
// //                 <span className="text-gray-900">{displayValue || 'N/A'}</span>
// //               </div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     );
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
// //       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 relative">
// //         <button
// //           onClick={onClose}
// //           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
// //           title="Close"
// //         >
// //           &times;
// //         </button>
// //         <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Booking Details</h3>

// //         <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long content */}
// //           {renderSection("Guest Details", booking.guestDetails)}
// //           {renderSection("Contact Details", booking.contactDetails)}
// //           {renderSection("Identity Details", booking.identityDetails)}
// //           {renderSection("Booking Information", booking.bookingInfo)}
// //           {renderSection("Payment Details", booking.paymentDetails)}
// //           {renderSection("Vehicle Details", booking.vehicleDetails)}

// //           {/* Other top-level details */}
// //           <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
// //             <h4 className="font-semibold text-lg mb-2 text-gray-800">General Information</h4>
// //             <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Category ID:</span>
// //                 <span className="text-gray-900">{booking.categoryId || 'N/A'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Reservation ID:</span>
// //                 <span className="text-gray-900">{booking.reservationId || 'N/A'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Count:</span>
// //                 <span className="text-gray-900">{booking.count || 'N/A'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">VIP:</span>
// //                 <span className="text-gray-900">{booking.vip ? 'Yes' : 'No'}</span>
// //               </div>
// //               <div className="flex flex-col">
// //                 <span className="font-medium text-gray-600">Foreign Guest:</span>
// //                 <span className="text-gray-900">{booking.isForeignGuest ? 'Yes' : 'No'}</span>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };


// // const BookingPage = () => { // Renamed from BookingList to BookingPage to match original file name
// //   const [formData, setFormData] = useState(initialFormState);
// //   const [bookings, setBookings] = useState([]);
// //   const [search, setSearch] = useState("");
// //   const [loading, setLoading] = useState(true); // Set to true as we are attempting to fetch
// //   const [error, setError] = useState(null);    // Added error state
// //   const [message, setMessage] = useState(null); // State for custom messages
// //   const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
// //   const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete
// //   const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
// //   const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // State for selected booking details

// //   // Function to get the authentication token from localStorage
// //   const getAuthToken = () => {
// //     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
// //   };

// //   // Function to fetch bookings (attempts API only)
// //   const fetchBookings = async () => {
// //     setLoading(true);
// //     setError(null);
// //     setMessage(null); // Clear previous messages
// //     const token = getAuthToken();

// //     try {
// //       if (!token) {
// //         throw new Error("Authentication token not found.");
// //       }

// //       // Attempt to fetch from the API as requested
// //       const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings/all", {
// //         headers: {
// //           "Authorization": `Bearer ${token}`
// //         }
// //       });

// //       const clonedRes = res.clone();

// //       if (!res.ok) {
// //         let errorBody;
// //         try {
// //           errorBody = await res.json();
// //           throw new Error(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
// //         } catch (jsonError) {
// //           errorBody = await clonedRes.text();
// //           throw new Error(`Failed to load bookings: ${res.status} - ${errorBody}`);
// //         }
// //       }

// //       const data = await res.json();
// //       // Adjust this line based on the actual structure if the API starts working
// //       // If the API returns an array of bookings directly, use 'data'
// //       // If it returns { bookings: [...] }, use 'data.bookings'
// //       // If it returns { rooms: [...] }, use 'data.rooms'
// //       const bookingsData = data.bookings || data.rooms || [];

// //       if (Array.isArray(bookingsData) && bookingsData.length > 0) {
// //         setBookings(bookingsData.map(b => ({
// //           name: b.guestDetails?.name || "",
// //           roomNumber: b.roomAssigned || "N/A", // Assuming roomAssigned is the room number
// //           checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
// //           checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
// //           _raw: b // Store raw data for view/edit operations if needed
// //         })));
// //       } else {
// //         // If API returns an empty array or unexpected structure, set bookings to empty
// //         console.warn("API response for bookings was empty or unexpected.");
// //         setError("API returned no data.");
// //         setBookings([]);
// //       }
// //     } catch (err) {
// //       console.error("Error fetching bookings:", err);
// //       setError(`${err.message}.`);
// //       // Set bookings to empty on any error (network, auth, API error, etc.)
// //       setBookings([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch bookings on component mount
// //   useEffect(() => {
// //     fetchBookings();
// //   }, []); // Empty dependency array means this runs once on component mount

// //   const handleView = (bookingRawData) => {
// //     setSelectedBookingDetails(bookingRawData._raw); // Set the raw data for the modal
// //     setShowDetailsModal(true); // Show the modal
// //   };

// //   const handleEdit = (index) => {
// //     const selected = bookings[index];
// //     setFormData(selected);
// //     setMessage("Edit functionality not fully implemented for this table. Data selected: " + JSON.stringify(selected, null, 2));
// //   };

// //   const handleDelete = (index) => {
// //     setDeleteIndex(index);
// //     setShowConfirm(true);
// //   };

// //   const confirmDelete = () => {
// //     if (deleteIndex !== null) {
// //       // In a real app, you'd make an API call to delete the booking by its _id
// //       const updated = [...bookings];
// //       updated.splice(deleteIndex, 1);
// //       setBookings(updated);
// //       setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
// //     }
// //     setShowConfirm(false);
// //     setDeleteIndex(null);
// //   };

// //   const cancelDelete = () => {
// //     setShowConfirm(false);
// //     setDeleteIndex(null);
// //   };

// //   const filteredBookings = bookings.filter((b) =>
// //     b.name.toLowerCase().includes(search.toLowerCase()) ||
// //     b.roomNumber.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
// //       <div className="flex justify-between items-center mb-4">
// //         <h2 className="text-2xl font-semibold">Bookings</h2>
// //         <div className="flex gap-3">
// //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// //             <Link to="/bookingform">Add Booking</Link>
// //           </button>
// //           <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
// //             <Link to="/reservation">Reservation</Link>
// //           </button>
// //         </div>
// //       </div>

// //       {/* Search */}
// //       <div className="mb-6 flex justify-start">
// //         <input
// //           type="text"
// //           placeholder="Search by guest name or room number..."
// //           className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
// //           value={search}
// //           onChange={(e) => setSearch(e.target.value)}
// //         />
// //       </div>

// //       {/* Custom Message Display */}
// //       {message && (
// //         <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
// //           <span className="block sm:inline">{message}</span>
// //           <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
// //             <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
// //           </span>
// //         </div>
// //       )}

// //       {loading ? (
// //         <div className="text-center py-8">Loading bookings...</div>
// //       ) : error ? (
// //         <div className="text-center py-8 text-red-600">{error}</div>
// //       ) : (
// //         <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
// //           <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
// //             <thead className="bg-gray-50">
// //               <tr>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
// //                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
// //                 <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
// //               </tr>
// //             </thead>
// //             <tbody className="bg-white divide-y divide-gray-200">
// //               {filteredBookings.length > 0 ? (
// //                 filteredBookings.map((b, i) => (
// //                   <tr key={i} className="hover:bg-gray-50">
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
// //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
// //                     <td className="px-6 py-4 text-center">
// //                       <div className="flex justify-center gap-2 text-sm">
// //                         <button
// //                           onClick={() => handleView(b)} // Pass the raw booking data
// //                           title="View"
// //                           className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
// //                         >
// //                           <FaEye />
// //                         </button>
// //                         <button
// //                           onClick={() => handleEdit(i)}
// //                           title="Edit"
// //                           className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
// //                         >
// //                           <FaEdit />
// //                         </button>
// //                         <button
// //                           onClick={() => handleDelete(i)}
// //                           title="Delete"
// //                           className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
// //                         >
// //                           <FaTrash />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
// //                     No bookings found.
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>
// //       )}

// //       {/* Confirmation Modal */}
// //       {showConfirm && (
// //         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
// //           <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
// //             <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
// //             <p className="mb-6">Are you sure you want to delete this booking?</p>
// //             <div className="flex justify-end gap-4">
// //               <button
// //                 onClick={cancelDelete}
// //                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 onClick={confirmDelete}
// //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
// //               >
// //                 Delete
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Booking Details Modal */}
// //       <BookingDetailsModal
// //         booking={selectedBookingDetails}
// //         onClose={() => setShowDetailsModal(false)}
// //       />
// //     </div>
// //   );
// // };

// // export default BookingPage;
// import React, { useState, useEffect } from "react";
// import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation

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

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   // Function to get the authentication token from localStorage
//   const getAuthToken = () => {
//     return localStorage.getItem("token"); // Assuming your token is stored in localStorage
//   };

//   // Function to fetch bookings (attempts API only)
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
//       const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings/all", {
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
//         // If API returns an empty array or unexpected structure, set bookings to empty
//         console.warn("API response for bookings was empty or unexpected.");
//         setError("API returned no data.");
//         setBookings([]);
//       }
//     } catch (err) {
//       console.error("Error fetching bookings:", err);
//       setError(`${err.message}.`);
//       // Set bookings to empty on any error (network, auth, API error, etc.)
//       setBookings([]);
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

//   const handleEdit = (bookingRawData) => {
//     // Navigate to the booking form page with the booking ID as a parameter
//     // This assumes your booking form route can accept an ID for editing, e.g., /bookingform/:id
//     if (bookingRawData._raw && bookingRawData._raw._id) {
//       navigate(`/bookingform/${bookingRawData._raw._id}`);
//     } else {
//       setMessage("Cannot edit: Booking ID not found.");
//     }
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
//                           onClick={() => handleEdit(b)} // Pass the raw booking data for edit
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
import React, { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate for navigation

const initialFormState = {
  name: "",
  roomNumber: "",
  checkIn: "",
  checkOut: "",
};

// Component for displaying booking details in a modal
const BookingDetailsModal = ({ booking, onClose }) => {
  if (!booking) return null;

  // Helper to render sections
  const renderSection = (title, data) => {
    if (!data || Object.keys(data).length === 0) return null;
    return (
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-lg mb-2 text-gray-800">{title}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {Object.entries(data).map(([key, value]) => {
            // Format dates if they look like ISO strings
            let displayValue = value;
            if (typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
              displayValue = new Date(value).toLocaleString();
            } else if (typeof value === 'boolean') {
              displayValue = value ? 'Yes' : 'No';
            } else if (Array.isArray(value)) {
              displayValue = value.join(', ');
            } else if (typeof value === 'object' && value !== null) {
              displayValue = JSON.stringify(value); // Fallback for nested objects not explicitly handled
            }

            return (
              <div key={key} className="flex flex-col">
                <span className="font-medium text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="text-gray-900">{displayValue || 'N/A'}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-auto p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl"
          title="Close"
        >
          &times;
        </button>
        <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">Booking Details</h3>

        <div className="max-h-[70vh] overflow-y-auto pr-2"> {/* Added scroll for long content */}
          {renderSection("Guest Details", booking.guestDetails)}
          {renderSection("Contact Details", booking.contactDetails)}
          {renderSection("Identity Details", booking.identityDetails)}
          {renderSection("Booking Information", booking.bookingInfo)}
          {renderSection("Payment Details", booking.paymentDetails)}
          {renderSection("Vehicle Details", booking.vehicleDetails)}

          {/* Other top-level details */}
          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-lg mb-2 text-gray-800">General Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex flex-col">
                <span className="font-medium text-gray-600">Category ID:</span>
                <span className="text-gray-900">{booking.categoryId || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-600">Reservation ID:</span>
                <span className="text-gray-900">{booking.reservationId || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-600">Count:</span>
                <span className="text-gray-900">{booking.count || 'N/A'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-600">VIP:</span>
                <span className="text-gray-900">{booking.vip ? 'Yes' : 'No'}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-600">Foreign Guest:</span>
                <span className="text-gray-900">{booking.isForeignGuest ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


const BookingPage = () => { // Renamed from BookingList to BookingPage to match original file name
  const [formData, setFormData] = useState(initialFormState);
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // Set to true as we are attempting to fetch
  const [error, setError] = useState(null);    // Added error state
  const [message, setMessage] = useState(null); // State for custom messages
  const [showConfirm, setShowConfirm] = useState(false); // State for confirmation modal
  const [deleteIndex, setDeleteIndex] = useState(null); // Index of item to delete
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for details modal
  const [selectedBookingDetails, setSelectedBookingDetails] = useState(null); // State for selected booking details

  const navigate = useNavigate(); // Initialize useNavigate hook

  // Mock booking data
  const mockBookingData = {
    _id: "mock_id_123", // Add an _id for mock data for edit/delete functionality
    "categoryId": "687b82f752e72c222f76ec8a",
    "reservationId": "687d9ef51cd0ea2a5344d319",
    "count": 1,
    "guestDetails": {
      "salutation": "Mr",
      "name": "Kumar",
      "age": 39,
      "gender": "Male",
      "photoUrl": "https://cdn.com/images/guests/ravi.jpg"
    },
    "contactDetails": {
      "phone": "9876555560",
      "email": "kumar@example.com",
      "address": "12A, Block C, South City",
      "city": "Gurgaon ncr",
      "state": "Haryana",
      "country": "India",
      "pinCode": "122001"
    },
    "identityDetails": {
      "idType": "Aadhaar",
      "idNumber": "1234-5678-9012",
      "idPhotoFront": "https://cdn.com/id/guests/adhar-front.jpg",
      "idPhotoBack": "https://cdn.com/id/guests/adhar-back.jpg"
    },
    "bookingInfo": {
      "checkIn": "2025-09-20T12:00:00.000Z",
      "checkOut": "2025-09-23T11:00:00.000Z",
      "arrivalFrom": "Lucknow up",
      "bookingType": "Online",
      "purposeOfVisit": "Business",
      "remarks": "Need early check-in",
      "adults": 1,
      "children": 1
    },
    "paymentDetails": {
      "totalAmount": 4500,
      "advancePaid": 2500,
      "paymentMode": "UPI",
      "billingName": "Ravi Kumar",
      "billingAddress": "ABC Pvt Ltd, CP, New Delhi",
      "gstNumber": "07ABCDE1234A1Z1"
    },
    "vehicleDetails": {
      "vehicleNumber": "DL01AB3456",
      "vehicleType": "Sedan",
      "vehicleModel": "Hyundai",
      "driverName": "ramu Singh",
      "driverMobile": "9876512345"
    },
    "vip": true,
    "isForeignGuest": false
  };


  // Function to get the authentication token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem("token"); // Assuming your token is stored in localStorage
  };

  // Function to fetch bookings (attempts API only)
  const fetchBookings = async () => {
    setLoading(true);
    setError(null);
    setMessage(null); // Clear previous messages
    const token = getAuthToken();

    try {
      if (!token) {
        throw new Error("Authentication token not found.");
      }

      // Attempt to fetch from the API as requested
      const res = await fetch("https://backend-hazel-xi.vercel.app/api/bookings/all", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      const clonedRes = res.clone();

      if (!res.ok) {
        let errorBody;
        try {
          errorBody = await res.json();
          throw new Error(`Failed to load bookings: ${res.status} - ${errorBody.message || errorBody.error || 'Unknown Error'}`);
        } catch (jsonError) {
          errorBody = await clonedRes.text();
          throw new Error(`Failed to load bookings: ${res.status} - ${errorBody}`);
        }
      }

      const data = await res.json();
      const bookingsData = data.bookings || data.rooms || [];

      if (Array.isArray(bookingsData) && bookingsData.length > 0) {
        setBookings(bookingsData.map(b => ({
          name: b.guestDetails?.name || "",
          roomNumber: b.roomAssigned || "N/A", // Assuming roomAssigned is the room number
          checkIn: b.bookingInfo?.checkIn ? b.bookingInfo.checkIn.slice(0, 10) : "",
          checkOut: b.bookingInfo?.checkOut ? b.bookingInfo.checkOut.slice(0, 10) : "",
          _raw: b // Store raw data for view/edit operations if needed
        })));
      } else {
        // If API returns an empty array or unexpected structure, use mock data
        console.warn("API response for bookings was empty or unexpected. Using mock data.");
        setError("API returned no data. Displaying mock data.");
        setBookings([{
          name: mockBookingData.guestDetails.name,
          roomNumber: mockBookingData.roomAssigned || "N/A",
          checkIn: mockBookingData.bookingInfo.checkIn.slice(0, 10),
          checkOut: mockBookingData.bookingInfo.checkOut.slice(0, 10),
          _raw: mockBookingData
        }]);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError(`${err.message}. Using mock data.`);
      // On any error (network, auth, API error, etc.), use mock data
      setBookings([{
        name: mockBookingData.guestDetails.name,
        roomNumber: mockBookingData.roomAssigned || "N/A", // Assuming roomAssigned might be missing in mock
        checkIn: mockBookingData.bookingInfo.checkIn.slice(0, 10),
        checkOut: mockBookingData.bookingInfo.checkOut.slice(0, 10),
        _raw: mockBookingData
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []); // Empty dependency array means this runs once on component mount

  const handleView = (bookingRawData) => {
    setSelectedBookingDetails(bookingRawData._raw); // Set the raw data for the modal
    setShowDetailsModal(true); // Show the modal
  };

  const handleEdit = (bookingRawData) => {
    // Navigate to the booking form page with the booking ID as a parameter
    // This assumes your booking form route can accept an ID for editing, e.g., /bookingform/:id
    if (bookingRawData._raw && bookingRawData._raw._id) {
      navigate(`/bookingform/${bookingRawData._raw._id}`);
    } else {
      setMessage("Cannot edit: Booking ID not found.");
    }
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      // In a real app, you'd make an API call to delete the booking by its _id
      const updated = [...bookings];
      updated.splice(deleteIndex, 1);
      setBookings(updated);
      setMessage("Booking deleted from frontend (API call for backend deletion not implemented here).");
    }
    setShowConfirm(false);
    setDeleteIndex(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteIndex(null);
  };

  const filteredBookings = bookings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.roomNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 text-[color:var(--color-text)] bg-[#fff9e6] min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Bookings</h2>
        <div className="flex gap-3">
          <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
            <Link to="/bookingform">Add Booking</Link>
          </button>
          <button className="bg-[color:var(--color-primary)] text-white px-4 py-2 rounded hover:bg-[color:var(--color-hover)] transition">
            <Link to="/reservation">Reservation</Link>
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6 flex justify-start">
        <input
          type="text"
          placeholder="Search by guest name or room number..."
          className="w-full max-w-md border border-[color:var(--color-border)] rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-[color:var(--color-primary)]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Custom Message Display */}
      {message && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setMessage(null)}>
            <svg className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}

      {loading ? (
        <div className="text-center py-8">Loading bookings...</div>
      ) : error ? (
        <div className="text-center py-8 text-red-600">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[color:var(--color-border)] shadow-sm">
          <table className="min-w-full text-sm text-[color:var(--color-text)] border border-[color:var(--color-border)]">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check Out</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.roomNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{b.checkOut}</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center gap-2 text-sm">
                        <button
                          onClick={() => handleView(b)} // Pass the raw booking data
                          title="View"
                          className="p-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 focus:ring-2 ring-green-400"
                        >
                          <FaEye />
                        </button>
                        <button
                          onClick={() => handleEdit(b)} // Pass the raw booking data for edit
                          title="Edit"
                          className="p-2 rounded-full bg-yellow-100 text-yellow-700 hover:bg-yellow-200 focus:ring-2 ring-yellow-400"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(i)}
                          title="Delete"
                          className="p-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 focus:ring-2 ring-red-400"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="mb-6">Are you sure you want to delete this booking?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      <BookingDetailsModal
        booking={selectedBookingDetails}
        onClose={() => setShowDetailsModal(false)}
      />
    </div>
  );
};

export default BookingPage;