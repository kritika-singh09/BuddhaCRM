// import React, { useState, useEffect } from 'react';
// import { BarChart, PieChart, TrendingUp, DollarSign, Package, CheckCircle, Clock, X, Calendar, Users, List } from 'lucide-react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, AreaChart, Area } from 'recharts'; // Added AreaChart, Area

// // Main App Component for Reports and Analytics
// const App = () => {
//   // Dummy data for orders and invoices (mimicking data from other pages)
//   // In a real application, this data would likely come from a centralized state or API
//   const [allOrders, setAllOrders] = useState(() => {
//     const savedOrders = localStorage.getItem('laundryOrders');
//     return savedOrders ? JSON.parse(savedOrders) : [
//       { id: 'ORD001', customerName: 'Alice Smith', items: [{ type: 'Shirt', quantity: 5 }], status: 'Pending', pickupDate: '2025-07-25', deliveryDate: '2025-07-28', totalAmount: 45.00 },
//       { id: 'ORD002', customerName: 'Bob Johnson', items: [{ type: 'Bed Sheet', quantity: 2 }], status: 'Processing', pickupDate: '2025-07-24', deliveryDate: '2025-07-27', totalAmount: 30.50 },
//       { id: 'ORD003', customerName: 'Charlie Brown', items: [{ type: 'Jacket', quantity: 1 }], status: 'Ready', pickupDate: '2025-07-23', deliveryDate: '2025-07-26', totalAmount: 22.00 },
//       { id: 'ORD004', customerName: 'Diana Prince', items: [{ type: 'Dress', quantity: 2 }], status: 'Delivered', pickupDate: '2025-07-22', deliveryDate: '2025-07-25', totalAmount: 38.00 },
//       { id: 'ORD005', customerName: 'Eve Adams', items: [{ type: 'Towel', quantity: 10 }], status: 'Delivered', pickupDate: '2025-07-20', deliveryDate: '2025-07-23', totalAmount: 55.00 },
//       { id: 'ORD006', customerName: 'Frank White', items: [{ type: 'Curtain', quantity: 2 }], status: 'Processing', pickupDate: '2025-07-26', deliveryDate: '2025-07-29', totalAmount: 70.00 },
//       { id: 'ORD007', customerName: 'Grace Lee', items: [{ type: 'Jeans', quantity: 3 }], status: 'Ready', pickupDate: '2025-07-27', deliveryDate: '2025-07-30', totalAmount: 35.00 },
//       { id: 'ORD008', customerName: 'Henry King', items: [{ type: 'Shirt', quantity: 7 }], status: 'Pending', pickupDate: '2025-07-28', deliveryDate: '2025-07-31', totalAmount: 60.00 },
//       { id: 'ORD009', customerName: 'Alice Smith', items: [{ type: 'Dress', quantity: 1 }], status: 'Delivered', pickupDate: '2025-07-21', deliveryDate: '2025-07-24', totalAmount: 25.00 }, // Repeat customer
//       { id: 'ORD010', customerName: 'Bob Johnson', items: [{ type: 'Suit', quantity: 1 }], status: 'Processing', pickupDate: '2025-07-29', deliveryDate: '2025-08-01', totalAmount: 80.00 }, // Repeat customer
//     ];
//   });

//   const [allInvoices, setAllInvoices] = useState(() => {
//     const savedInvoices = localStorage.getItem('laundryInvoices');
//     return savedInvoices ? JSON.parse(savedInvoices) : [
//       { id: 'INV001', orderId: 'ORD001', customerName: 'Alice Smith', amount: 45.00, issueDate: '2025-07-28', dueDate: '2025-08-04', status: 'Pending' },
//       { id: 'INV002', orderId: 'ORD002', customerName: 'Bob Johnson', amount: 30.50, issueDate: '2025-07-27', dueDate: '2025-08-03', status: 'Paid' },
//       { id: 'INV003', orderId: 'ORD003', customerName: 'Charlie Brown', amount: 22.00, issueDate: '2025-07-26', dueDate: '2025-08-02', status: 'Overdue' },
//       { id: 'INV004', orderId: 'ORD004', customerName: 'Diana Prince', amount: 38.00, issueDate: '2025-07-25', dueDate: '2025-08-01', status: 'Paid' },
//       { id: 'INV005', orderId: 'ORD005', customerName: 'Eve Adams', amount: 55.00, issueDate: '2025-07-24', dueDate: '2025-07-31', status: 'Paid' },
//       { id: 'INV006', orderId: 'ORD006', customerName: 'Frank White', amount: 70.00, issueDate: '2025-07-29', dueDate: '2025-08-05', status: 'Pending' },
//       { id: 'INV007', orderId: 'ORD007', customerName: 'Grace Lee', amount: 35.00, issueDate: '2025-07-30', dueDate: '2025-08-06', status: 'Paid' },
//       { id: 'INV008', orderId: 'ORD008', customerName: 'Henry King', amount: 60.00, issueDate: '2025-07-31', dueDate: '2025-08-07', status: 'Pending' },
//       { id: 'INV009', orderId: 'ORD009', customerName: 'Alice Smith', amount: 25.00, issueDate: '2025-07-24', dueDate: '2025-07-31', status: 'Paid' },
//       { id: 'INV010', orderId: 'ORD010', customerName: 'Bob Johnson', amount: 80.00, issueDate: '2025-08-01', dueDate: '2025-08-08', status: 'Pending' },
//     ];
//   });

//   // State for date range filtering
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   // Effect to load data from localStorage on component mount
//   useEffect(() => {
//     const savedOrders = localStorage.getItem('laundryOrders');
//     if (savedOrders) setAllOrders(JSON.parse(savedOrders));

//     const savedInvoices = localStorage.getItem('laundryInvoices');
//     if (savedInvoices) setAllInvoices(JSON.parse(savedInvoices));
//   }, []);

//   // Filter data based on the selected date range
//   const getFilteredData = (data, dateKey) => {
//     return data.filter(item => {
//       const itemDate = new Date(item[dateKey]);
//       const start = startDate ? new Date(startDate) : null;
//       const end = endDate ? new Date(endDate) : null;

//       if (start && itemDate < start) return false;
//       if (end && itemDate > end) return false;
//       return true;
//     });
//   };

//   const filteredOrders = getFilteredData(allOrders, 'deliveryDate'); // Using deliveryDate for orders
//   const filteredInvoices = getFilteredData(allInvoices, 'issueDate'); // Using issueDate for invoices

//   // Calculate summary statistics
//   const totalOrders = filteredOrders.length;
//   const totalRevenue = filteredInvoices
//     .filter(inv => inv.status === 'Paid')
//     .reduce((sum, inv) => sum + inv.amount, 0);
//   const pendingInvoicesAmount = filteredInvoices
//     .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
//     .reduce((sum, inv) => sum + inv.amount, 0);

//   // Calculate order status distribution for chart
//   const orderStatusDistribution = filteredOrders.reduce((acc, order) => {
//     acc[order.status] = (acc[order.status] || 0) + 1;
//     return acc;
//   }, {});
//   const orderChartData = Object.entries(orderStatusDistribution).map(([status, count]) => ({
//     name: status,
//     Orders: count,
//   }));

//   // Calculate invoice status distribution for chart
//   const invoiceStatusDistribution = filteredInvoices.reduce((acc, invoice) => {
//     acc[invoice.status] = (acc[invoice.status] || 0) + 1;
//     return acc;
//   }, {});
//   const invoiceChartData = Object.entries(invoiceStatusDistribution).map(([status, count]) => ({
//     name: status,
//     Invoices: count,
//   }));

//   // Calculate Revenue Trend Data (by issueDate)
//   const revenueTrend = filteredInvoices
//     .filter(inv => inv.status === 'Paid')
//     .reduce((acc, inv) => {
//       const date = inv.issueDate;
//       acc[date] = (acc[date] || 0) + inv.amount;
//       return acc;
//     }, {});
//   const revenueChartData = Object.entries(revenueTrend)
//     .map(([date, amount]) => ({ date, Revenue: parseFloat(amount.toFixed(2)) }))
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Calculate Order Count by Day Data (by deliveryDate)
//   const orderCountByDay = filteredOrders.reduce((acc, order) => {
//     const date = order.deliveryDate;
//     acc[date] = (acc[date] || 0) + 1;
//     return acc;
//   }, {});
//   const orderCountChartData = Object.entries(orderCountByDay)
//     .map(([date, count]) => ({ date, 'Order Count': count }))
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   // Calculate Top Customers by Revenue
//   const topCustomers = allInvoices
//     .filter(inv => inv.status === 'Paid')
//     .reduce((acc, inv) => {
//       acc[inv.customerName] = (acc[inv.customerName] || 0) + inv.amount;
//       return acc;
//     }, {});
//   const sortedTopCustomers = Object.entries(topCustomers)
//     .sort(([, amountA], [, amountB]) => amountB - amountA)
//     .slice(0, 5) // Get top 5 customers
//     .map(([name, amount]) => ({ name, amount: parseFloat(amount.toFixed(2)) }));


//   return (
//     <div className="min-h-screen bg-gray-100 font-sans text-gray-900 p-4 sm:p-6 lg:p-8">
//       {/* Header */}
//       <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-200">
//         <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Reports & Analytics</h1>
//         <div className="flex items-center space-x-4">
//           <Calendar size={20} className="text-gray-500" />
//           <input
//             type="date"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             aria-label="Start Date"
//           />
//           <span className="text-gray-500">-</span>
//           <input
//             type="date"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//             className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//             aria-label="End Date"
//           />
//         </div>
//       </header>

//       {/* Summary Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//         <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//           <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
//             <Package size={24} />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Total Orders</p>
//             <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//           <div className="p-3 bg-green-100 text-green-600 rounded-full">
//             <DollarSign size={24} />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Total Revenue (Paid)</p>
//             <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//           <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
//             <Clock size={24} />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Pending/Overdue Invoices</p>
//             <p className="text-2xl font-bold text-gray-900">${pendingInvoicesAmount.toFixed(2)}</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
//           <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
//             <TrendingUp size={24} />
//           </div>
//           <div>
//             <p className="text-sm font-medium text-gray-500">Average Order Value</p>
//             <p className="text-2xl font-bold text-gray-900">
//               ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Detailed Reports Section with Charts */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//         {/* Order Status Distribution Line Chart */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <LineChart size={20} className="mr-2 text-indigo-600" /> Order Status Distribution
//           </h2>
//           {orderChartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={orderChartData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                 <XAxis dataKey="name" stroke="#555" type="category" />
//                 <YAxis stroke="#555" type="number" /> {/* Added type="number" */}
//                 <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
//                 <Legend />
//                 <Line type="monotone" dataKey="Orders" stroke="#6366f1" activeDot={{ r: 8 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-gray-500 text-center py-4">No orders in selected range to display chart.</p>
//           )}
//         </div>

//         {/* Invoice Status Distribution Line Chart */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <LineChart size={20} className="mr-2 text-green-600" /> Invoice Status Distribution
//           </h2>
//           {invoiceChartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart
//                 data={invoiceChartData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                 <XAxis dataKey="name" stroke="#555" type="category" />
//                 <YAxis stroke="#555" type="number" /> {/* Added type="number" */}
//                 <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
//                 <Legend />
//                 <Line type="monotone" dataKey="Invoices" stroke="#22c55e" activeDot={{ r: 8 }} />
//               </LineChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-gray-500 text-center py-4">No invoices in selected range to display chart.</p>
//           )}
//         </div>

//         {/* Revenue Trend Chart */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <DollarSign size={20} className="mr-2 text-blue-600" /> Revenue Trend (Paid Invoices)
//           </h2>
//           {revenueChartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <AreaChart
//                 data={revenueChartData}
//                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                 <XAxis dataKey="date" stroke="#555" type="category" />
//                 <YAxis stroke="#555" type="number" /> {/* Added type="number" */}
//                 <Tooltip />
//                 <Area type="monotone" dataKey="Revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
//                 <defs>
//                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
//                     <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                   </linearGradient>
//                 </defs>
//               </AreaChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-gray-500 text-center py-4">No paid invoices in selected range to display revenue trend.</p>
//           )}
//         </div>

//         {/* Order Count by Day Chart */}
//         <div className="bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <Package size={20} className="mr-2 text-orange-600" /> Order Count by Day
//           </h2>
//           {orderCountChartData.length > 0 ? (
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart
//                 data={orderCountChartData}
//                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
//                 <XAxis dataKey="date" stroke="#555" type="category" />
//                 <YAxis stroke="#555" type="number" allowDecimals={false} /> {/* Added type="number" and allowDecimals */}
//                 <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
//                 <Legend />
//                 <Bar dataKey="Order Count" fill="#f97316" radius={[5, 5, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           ) : (
//             <p className="text-gray-500 text-center py-4">No orders in selected range to display daily count.</p>
//           )}
//         </div>

//         {/* Top Customers by Revenue */}
//         <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
//             <Users size={20} className="mr-2 text-teal-600" /> Top Customers by Revenue
//           </h2>
//           {sortedTopCustomers.length > 0 ? (
//             <ul className="space-y-2">
//               {sortedTopCustomers.map((customer, index) => (
//                 <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
//                   <span className="font-medium text-gray-700">{index + 1}. {customer.name}</span>
//                   <span className="text-lg font-semibold text-gray-900">${customer.amount.toFixed(2)}</span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500 text-center py-4">No customer data to display.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BarChart as BarChartIcon, PieChart as PieChartIcon, TrendingUp, DollarSign, Package, CheckCircle, Clock, X, Calendar, Users, List, LineChart as LineChartIcon } from 'lucide-react'; // Renamed BarChart and LineChart for icons
import { LineChart, BarChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Bar, AreaChart, Area } from 'recharts'; // Recharts components

// Main App Component for Reports and Analytics
const App = () => {
  // Dummy data for orders and invoices (mimicking data from other pages)
  // In a real application, this data would likely come from a centralized state or API
  const [allOrders, setAllOrders] = useState(() => {
    const savedOrders = localStorage.getItem('laundryOrders');
    return savedOrders ? JSON.parse(savedOrders) : [
      { id: 'ORD001', customerName: 'Alice Smith', items: [{ type: 'Shirt', quantity: 5 }], status: 'Pending', pickupDate: '2025-07-25', deliveryDate: '2025-07-28', totalAmount: 45.00 },
      { id: 'ORD002', customerName: 'Bob Johnson', items: [{ type: 'Bed Sheet', quantity: 2 }], status: 'Processing', pickupDate: '2025-07-24', deliveryDate: '2025-07-27', totalAmount: 30.50 },
      { id: 'ORD003', customerName: 'Charlie Brown', items: [{ type: 'Jacket', quantity: 1 }], status: 'Ready', pickupDate: '2025-07-23', deliveryDate: '2025-07-26', totalAmount: 22.00 },
      { id: 'ORD004', customerName: 'Diana Prince', items: [{ type: 'Dress', quantity: 2 }], status: 'Delivered', pickupDate: '2025-07-22', deliveryDate: '2025-07-25', totalAmount: 38.00 },
      { id: 'ORD005', customerName: 'Eve Adams', items: [{ type: 'Towel', quantity: 10 }], status: 'Delivered', pickupDate: '2025-07-20', deliveryDate: '2025-07-23', totalAmount: 55.00 },
      { id: 'ORD006', customerName: 'Frank White', items: [{ type: 'Curtain', quantity: 2 }], status: 'Processing', pickupDate: '2025-07-26', deliveryDate: '2025-07-29', totalAmount: 70.00 },
      { id: 'ORD007', customerName: 'Grace Lee', items: [{ type: 'Jeans', quantity: 3 }], status: 'Ready', pickupDate: '2025-07-27', deliveryDate: '2025-07-30', totalAmount: 35.00 },
      { id: 'ORD008', customerName: 'Henry King', items: [{ type: 'Shirt', quantity: 7 }], status: 'Pending', pickupDate: '2025-07-28', deliveryDate: '2025-07-31', totalAmount: 60.00 },
      { id: 'ORD009', customerName: 'Alice Smith', items: [{ type: 'Dress', quantity: 1 }], status: 'Delivered', pickupDate: '2025-07-21', deliveryDate: '2025-07-24', totalAmount: 25.00 }, // Repeat customer
      { id: 'ORD010', customerName: 'Bob Johnson', items: [{ type: 'Suit', quantity: 1 }], status: 'Processing', pickupDate: '2025-07-29', deliveryDate: '2025-08-01', totalAmount: 80.00 }, // Repeat customer
    ];
  });

  const [allInvoices, setAllInvoices] = useState(() => {
    const savedInvoices = localStorage.getItem('laundryInvoices');
    return savedInvoices ? JSON.parse(savedInvoices) : [
      { id: 'INV001', orderId: 'ORD001', customerName: 'Alice Smith', amount: 45.00, issueDate: '2025-07-28', dueDate: '2025-08-04', status: 'Pending' },
      { id: 'INV002', orderId: 'ORD002', customerName: 'Bob Johnson', amount: 30.50, issueDate: '2025-07-27', dueDate: '2025-08-03', status: 'Paid' },
      { id: 'INV003', orderId: 'ORD003', customerName: 'Charlie Brown', amount: 22.00, issueDate: '2025-07-26', dueDate: '2025-08-02', status: 'Overdue' },
      { id: 'INV004', orderId: 'ORD004', customerName: 'Diana Prince', amount: 38.00, issueDate: '2025-07-25', dueDate: '2025-08-01', status: 'Paid' },
      { id: 'INV005', orderId: 'ORD005', customerName: 'Eve Adams', amount: 55.00, issueDate: '2025-07-24', dueDate: '2025-07-31', status: 'Paid' },
      { id: 'INV006', orderId: 'ORD006', customerName: 'Frank White', amount: 70.00, issueDate: '2025-07-29', dueDate: '2025-08-05', status: 'Pending' },
      { id: 'INV007', orderId: 'ORD007', customerName: 'Grace Lee', amount: 35.00, issueDate: '2025-07-30', dueDate: '2025-08-06', status: 'Paid' },
      { id: 'INV008', orderId: 'ORD008', customerName: 'Henry King', amount: 60.00, issueDate: '2025-07-31', dueDate: '2025-08-07', status: 'Pending' },
      { id: 'INV009', orderId: 'ORD009', customerName: 'Alice Smith', amount: 25.00, issueDate: '2025-07-24', dueDate: '2025-07-31', status: 'Paid' },
      { id: 'INV010', orderId: 'ORD010', customerName: 'Bob Johnson', amount: 80.00, issueDate: '2025-08-01', dueDate: '2025-08-08', status: 'Pending' },
    ];
  });

  // State for date range filtering, initialized to null
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Effect to load data from localStorage on component mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('laundryOrders');
    if (savedOrders) setAllOrders(JSON.parse(savedOrders));

    const savedInvoices = localStorage.getItem('laundryInvoices');
    if (savedInvoices) setAllInvoices(JSON.parse(savedInvoices));
  }, []);

  // Filter data based on the selected date range
  const getFilteredData = (data, dateKey) => {
    return data.filter(item => {
      const itemDate = new Date(item[dateKey]);
      const start = startDate ? new Date(startDate) : null;
      const end = endDate ? new Date(endDate) : null;

      if (start && itemDate < start) return false;
      if (end && itemDate > end) return false;
      return true;
    });
  };

  const filteredOrders = getFilteredData(allOrders, 'deliveryDate'); // Using deliveryDate for orders
  const filteredInvoices = getFilteredData(allInvoices, 'issueDate'); // Using issueDate for invoices

  // Calculate summary statistics
  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredInvoices
    .filter(inv => inv.status === 'Paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingInvoicesAmount = filteredInvoices
    .filter(inv => inv.status === 'Pending' || inv.status === 'Overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  // Calculate order status distribution for chart
  const orderStatusDistribution = filteredOrders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});
  const orderChartData = Object.entries(orderStatusDistribution).map(([status, count]) => ({
    name: status,
    Orders: count,
  }));

  // Calculate invoice status distribution for chart
  const invoiceStatusDistribution = filteredInvoices.reduce((acc, invoice) => {
    acc[invoice.status] = (acc[invoice.status] || 0) + 1;
    return acc;
  }, {});
  const invoiceChartData = Object.entries(invoiceStatusDistribution).map(([status, count]) => ({
    name: status,
    Invoices: count,
  }));

  // Calculate Revenue Trend Data (by issueDate)
  const revenueTrend = filteredInvoices
    .filter(inv => inv.status === 'Paid')
    .reduce((acc, inv) => {
      const date = inv.issueDate;
      acc[date] = (acc[date] || 0) + inv.amount;
      return acc;
    }, {});
  const revenueChartData = Object.entries(revenueTrend)
    .map(([date, amount]) => ({ date, Revenue: parseFloat(amount.toFixed(2)) }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate Order Count by Day Data (by deliveryDate)
  const orderCountByDay = filteredOrders.reduce((acc, order) => {
    const date = order.deliveryDate;
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});
  const orderCountChartData = Object.entries(orderCountByDay)
    .map(([date, count]) => ({ date, 'Order Count': count }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate Top Customers by Revenue
  const topCustomers = allInvoices
    .filter(inv => inv.status === 'Paid')
    .reduce((acc, inv) => {
      acc[inv.customerName] = (acc[inv.customerName] || 0) + inv.amount;
      return acc;
    }, {});
  const sortedTopCustomers = Object.entries(topCustomers)
    .sort(([, amountA], [, amountB]) => amountB - amountA)
    .slice(0, 5) // Get top 5 customers
    .map(([name, amount]) => ({ name, amount: parseFloat(amount.toFixed(2)) }));


  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-4 sm:mb-0">Reports & Analytics</h1>
        <div className="flex items-center space-x-4">
          <Calendar size={20} className="text-gray-500" />
          <input
            type="date"
            value={startDate || ''} // Ensure value is always a string
            onChange={(e) => setStartDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="Start Date"
          />
          <span className="text-gray-500">-</span>
          <input
            type="date"
            value={endDate || ''} // Ensure value is always a string
            onChange={(e) => setEndDate(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            aria-label="End Date"
          />
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <Package size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Revenue (Paid)</p>
            <p className="text-2xl font-bold text-gray-900">${totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <div className="p-3 bg-yellow-100 text-yellow-600 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending/Overdue Invoices</p>
            <p className="text-2xl font-bold text-gray-900">${pendingInvoicesAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 flex items-center space-x-4 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Average Order Value</p>
            <p className="text-2xl font-bold text-gray-900">
              ${totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
            </p>
          </div>
        </div>
      </div>

      {/* Detailed Reports Section with Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Order Status Distribution Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <LineChartIcon size={20} className="mr-2 text-indigo-600" /> Order Status Distribution
          </h2>
          {orderChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={orderChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#555" type="category" />
                <YAxis stroke="#555" type="number" />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend />
                <Line type="monotone" dataKey="Orders" stroke="#6366f1" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-4">No orders in selected range to display chart.</p>
          )}
        </div>

        {/* Invoice Status Distribution Line Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <LineChartIcon size={20} className="mr-2 text-green-600" /> Invoice Status Distribution
          </h2>
          {invoiceChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={invoiceChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="name" stroke="#555" type="category" />
                <YAxis stroke="#555" type="number" />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend />
                <Line type="monotone" dataKey="Invoices" stroke="#22c55e" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-4">No invoices in selected range to display chart.</p>
          )}
        </div>

        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <DollarSign size={20} className="mr-2 text-blue-600" /> Revenue Trend (Paid Invoices)
          </h2>
          {revenueChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={revenueChartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#555" type="category" />
                <YAxis stroke="#555" type="number" />
                <Tooltip />
                <Area type="monotone" dataKey="Revenue" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRevenue)" />
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-4">No paid invoices in selected range to display revenue trend.</p>
          )}
        </div>

        {/* Order Count by Day Chart */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <BarChartIcon size={20} className="mr-2 text-orange-600" /> Order Count by Day
          </h2>
          {orderCountChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={orderCountChartData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                <XAxis dataKey="date" stroke="#555" type="category" />
                <YAxis stroke="#555" type="number" allowDecimals={false} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Legend />
                <Bar dataKey="Order Count" fill="#f97316" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-gray-500 text-center py-4">No orders in selected range to display daily count.</p>
          )}
        </div>

        {/* Top Customers by Revenue */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Users size={20} className="mr-2 text-teal-600" /> Top Customers by Revenue
          </h2>
          {sortedTopCustomers.length > 0 ? (
            <ul className="space-y-2">
              {sortedTopCustomers.map((customer, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded-md border border-gray-200">
                  <span className="font-medium text-gray-700">{index + 1}. {customer.name}</span>
                  <span className="text-lg font-semibold text-gray-900">${customer.amount.toFixed(2)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-4">No customer data to display.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
