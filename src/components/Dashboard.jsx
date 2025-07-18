import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import {
  Calendar,
  Users,
  Home,
  Bell,
  PlusCircle,
  BarChart2,
  ChevronDown,
  Percent,
  Star,
  CreditCard,
  CheckCircle,
  Clock,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import BookingCalendar from "./BookingCalendar";

const Dashboard = () => {
  const [activeCard, setActiveCard] = useState(() => {
    const savedCard = localStorage.getItem("activeCard");
    return savedCard || "bookings"; // Default to "bookings"
  });
  const [timeFrame, setTimeFrame] = useState("weekly");
  const [showCalendar, setShowCalendar] = useState(false);
  const handleCalendarClick = () => {
    setShowCalendar(true);
  };

  // Dashboard data
  const dashboardCards = [
    {
      id: "bookings",
      title: "Bookings",
      value: "145",
      icon: Calendar,
      color: "bg-primary",
      trend: "+12%",
      trendUp: true,
    },
    {
      id: "rooms",
      title: "Rooms Available",
      value: "42",
      icon: Home,
      color: "bg-primary",
      trend: "-5%",
      trendUp: false,
    },
    {
      id: "revenue",
      title: "Revenue",
      value: "₹32,450",
      icon: FaIndianRupeeSign,
      color: "bg-primary",
      trend: "+8%",
      trendUp: true,
    },
    {
      id: "occupancy",
      title: "Occupancy Rate",
      value: "78%",
      icon: Percent,
      color: "bg-primary",
      trend: "+3%",
      trendUp: true,
    },
    {
      id: "guests",
      title: "Active Guests",
      value: "58",
      icon: Users,
      color: "bg-primary",
      trend: "+5%",
      trendUp: true,
    },
    {
      id: "rating",
      title: "Avg. Rating",
      value: "4.8",
      icon: Star,
      color: "bg-primary",
      trend: "+0.2",
      trendUp: true,
    },
  ];

  // Add these data sets at the top of your component
  const weeklyRevenueData = [
    { name: "Mon", value: 12400 },
    { name: "Tue", value: 14800 },
    { name: "Wed", value: 15200 },
    { name: "Thu", value: 16800 },
    { name: "Fri", value: 19500 },
    { name: "Sat", value: 21000 },
    { name: "Sun", value: 18500 },
  ];

  const monthlyRevenueData = [
    { name: "Week 1", value: 85000 },
    { name: "Week 2", value: 92000 },
    { name: "Week 3", value: 98000 },
    { name: "Week 4", value: 105000 },
  ];

  const yearlyRevenueData = [
    { name: "Jan", value: 65000 },
    { name: "Feb", value: 59000 },
    { name: "Mar", value: 80000 },
    { name: "Apr", value: 81000 },
    { name: "May", value: 90000 },
    { name: "Jun", value: 125000 },
    { name: "Jul", value: 130000 },
    { name: "Aug", value: 120000 },
    { name: "Sep", value: 110000 },
    { name: "Oct", value: 105000 },
    { name: "Nov", value: 95000 },
    { name: "Dec", value: 115000 },
  ];

  const weeklyOccupancyData = [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 70 },
    { name: "Wed", value: 75 },
    { name: "Thu", value: 80 },
    { name: "Fri", value: 90 },
    { name: "Sat", value: 95 },
    { name: "Sun", value: 85 },
  ];

  const monthlyOccupancyData = [
    { name: "Week 1", value: 72 },
    { name: "Week 2", value: 78 },
    { name: "Week 3", value: 82 },
    { name: "Week 4", value: 88 },
  ];

  const yearlyOccupancyData = [
    { name: "Jan", value: 68 },
    { name: "Feb", value: 72 },
    { name: "Mar", value: 75 },
    { name: "Apr", value: 78 },
    { name: "May", value: 82 },
    { name: "Jun", value: 88 },
    { name: "Jul", value: 92 },
    { name: "Aug", value: 95 },
    { name: "Sep", value: 90 },
    { name: "Oct", value: 85 },
    { name: "Nov", value: 80 },
    { name: "Dec", value: 75 },
  ];

  const weeklyBookingSourceData = [
    { name: "Direct", value: 40 },
    { name: "Booking.com", value: 30 },
    { name: "Expedia", value: 20 },
    { name: "Others", value: 10 },
  ];

  const monthlyBookingSourceData = [
    { name: "Direct", value: 45 },
    { name: "Booking.com", value: 25 },
    { name: "Expedia", value: 15 },
    { name: "Others", value: 15 },
  ];

  const yearlyBookingSourceData = [
    { name: "Direct", value: 35 },
    { name: "Booking.com", value: 35 },
    { name: "Expedia", value: 20 },
    { name: "Others", value: 10 },
  ];

  const weeklyRoomTypeData = [
    { name: "Standard", value: 25 },
    { name: "Deluxe", value: 35 },
    { name: "Suite", value: 20 },
    { name: "Executive", value: 20 },
  ];

  const monthlyRoomTypeData = [
    { name: "Standard", value: 28 },
    { name: "Deluxe", value: 32 },
    { name: "Suite", value: 22 },
    { name: "Executive", value: 18 },
  ];

  const yearlyRoomTypeData = [
    { name: "Standard", value: 30 },
    { name: "Deluxe", value: 30 },
    { name: "Suite", value: 25 },
    { name: "Executive", value: 15 },
  ];

  const COLORS = ["#e11d48", "#d97706", "#0891b2", "#4f46e5"];

  const toggleCard = (cardId) => {
    const newActiveCard = activeCard === cardId ? null : cardId;
    setActiveCard(newActiveCard);
    if (newActiveCard) {
      localStorage.setItem("activeCard", newActiveCard);
    } else {
      localStorage.removeItem("activeCard");
    }
  };

  // Card detail content based on active card
  const renderCardDetail = () => {
    switch (activeCard) {
      case "bookings":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-background p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Guest #{i}</span>
                      <span
                        className={
                          i === 1 ? "text-red-600 font-medium" : "text-primary"
                        }
                      >
                        {i === 1 ? "Pending" : "Confirmed"}
                      </span>
                    </div>
                    <div className="text-sm text-text/70 mt-1">
                      Check-in:{" "}
                      {i === 1 ? "Today" : i === 2 ? "Tomorrow" : "Jul 15"} •{" "}
                      {i + 1} nights • {["Deluxe", "Standard", "Suite"][i - 1]}{" "}
                      Room
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {timeFrame === "weekly"
                    ? "Weekly Booking Sources"
                    : timeFrame === "monthly"
                    ? "Monthly Booking Sources"
                    : "Yearly Booking Sources"}
                </h3>
                <div className="flex bg-background border border-black rounded-lg overflow-hidden">
                  <button
                    onClick={() => setTimeFrame("weekly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "weekly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeFrame("monthly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "monthly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeFrame("yearly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "yearly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        timeFrame === "weekly"
                          ? weeklyBookingSourceData
                          : timeFrame === "monthly"
                          ? monthlyBookingSourceData
                          : yearlyBookingSourceData
                      }
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {(timeFrame === "weekly"
                        ? weeklyBookingSourceData
                        : timeFrame === "monthly"
                        ? monthlyBookingSourceData
                        : yearlyBookingSourceData
                      ).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case "rooms":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Room Availability</h3>
              <div className="space-y-3">
                {["Standard", "Deluxe", "Suite", "Executive"].map((type, i) => (
                  <div key={i} className="bg-background p-3 rounded-lg">
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{type}</span>
                      <span>
                        {Math.floor(Math.random() * 10) + 5}/
                        {Math.floor(Math.random() * 20) + 15} Available
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{
                          width: `${Math.floor(Math.random() * 70) + 30}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {timeFrame === "weekly"
                    ? "Weekly Room Availability"
                    : timeFrame === "monthly"
                    ? "Monthly Room Availability"
                    : "Yearly Room Availability"}
                </h3>
                <div className="flex bg-background border border-black rounded-lg overflow-hidden">
                  <button
                    onClick={() => setTimeFrame("weekly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "weekly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeFrame("monthly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "monthly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeFrame("yearly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "yearly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={
                        timeFrame === "weekly"
                          ? weeklyRoomTypeData
                          : timeFrame === "monthly"
                          ? monthlyRoomTypeData
                          : yearlyRoomTypeData
                      }
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {(timeFrame === "weekly"
                        ? weeklyRoomTypeData
                        : timeFrame === "monthly"
                        ? monthlyRoomTypeData
                        : yearlyRoomTypeData
                      ).map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case "revenue":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
              <div className="space-y-3">
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Room Revenue</span>
                  <span className="font-semibold">₹28,450</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>F&B Revenue</span>
                  <span className="font-semibold">₹3,200</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Additional Services</span>
                  <span className="font-semibold">₹800</span>
                </div>
                <div className="bg-accent p-3 rounded-lg flex justify-between">
                  <span className="font-semibold">Total Revenue</span>
                  <span className="font-semibold">₹32,450</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {timeFrame === "weekly"
                    ? "Weekly Revenue"
                    : timeFrame === "monthly"
                    ? "Monthly Revenue"
                    : "Yearly Revenue"}
                </h3>
                <div className="flex bg-background border border-black rounded-lg overflow-hidden">
                  <button
                    onClick={() => setTimeFrame("weekly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "weekly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeFrame("monthly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "monthly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeFrame("yearly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "yearly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={
                      timeFrame === "weekly"
                        ? weeklyRevenueData
                        : timeFrame === "monthly"
                        ? monthlyRevenueData
                        : yearlyRevenueData
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, "Revenue"]} />
                    <Bar dataKey="value" fill="#e11d48" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case "occupancy":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Occupancy Stats</h3>
              <div className="space-y-3">
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Current Occupancy</span>
                  <span className="font-semibold">78%</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Last Week Average</span>
                  <span className="font-semibold">75%</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Last Month Average</span>
                  <span className="font-semibold">72%</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Year to Date</span>
                  <span className="font-semibold">68%</span>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">
                  {timeFrame === "weekly"
                    ? "Weekly Occupancy"
                    : timeFrame === "monthly"
                    ? "Monthly Occupancy"
                    : "Yearly Occupancy"}
                </h3>
                <div className="flex bg-background border border-black rounded-lg overflow-hidden">
                  <button
                    onClick={() => setTimeFrame("weekly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "weekly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTimeFrame("monthly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "monthly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setTimeFrame("yearly")}
                    className={`px-3 py-1 text-xs font-medium ${
                      timeFrame === "yearly"
                        ? "bg-primary text-white"
                        : "bg-background text-text hover:bg-border"
                    }`}
                  >
                    Yearly
                  </button>
                </div>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={
                      timeFrame === "weekly"
                        ? weeklyOccupancyData
                        : timeFrame === "monthly"
                        ? monthlyOccupancyData
                        : yearlyOccupancyData
                    }
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Occupancy"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#e11d48"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      case "guests":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Guest Status</h3>
              <div className="space-y-3">
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Currently In-House</span>
                  <span className="font-semibold">58</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Arriving Today</span>
                  <span className="font-semibold text-red-600">12</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>Departing Today</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="bg-background p-3 rounded-lg flex justify-between">
                  <span>VIP Guests</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Upcoming Arrivals</h3>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-background p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Guest #{i}</span>
                      <span
                        className={i === 1 ? "text-red-600 font-medium" : ""}
                      >
                        {i === 1 || i === 2 ? "Today" : "Tomorrow"}
                      </span>
                    </div>
                    <div className="text-sm text-text/70 mt-1">
                      {i === 3 ? "VIP Guest • " : ""}
                      {["Deluxe", "Standard", "Suite", "Executive"][i - 1]} Room
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case "rating":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
              <div className="space-y-3">
                <div className="bg-background p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span>Room Quality</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                      <span>4.9</span>
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-background p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span>Service</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                      <span>4.8</span>
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "96%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-background p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span>Cleanliness</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                      <span>4.7</span>
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "94%" }}
                    ></div>
                  </div>
                </div>
                <div className="bg-background p-3 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span>Value for Money</span>
                    <span className="flex items-center">
                      <Star className="w-4 h-4 fill-primary text-primary mr-1" />
                      <span>4.6</span>
                    </span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Recent Reviews</h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-background p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-medium">Guest #{i}</span>
                      <span className="flex items-center">
                        {Array(5)
                          .fill(0)
                          .map((_, j) => (
                            <Star
                              key={j}
                              className={`w-3 h-3 ${
                                j < 5 - i / 2
                                  ? "fill-primary text-primary"
                                  : "text-gray-300"
                              } mr-0.5`}
                            />
                          ))}
                      </span>
                    </div>
                    <div className="text-sm text-text/70 mt-1">
                      "Excellent stay, would recommend to others!"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 overflow-auto h-full bg-background">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-text">
          BUDDHA AVENUE DASHBOARD
        </h1>
        <button
          onClick={handleCalendarClick}
          className="p-2 rounded-full hover:bg-background transition-colors"
        >
          <SlCalender className="w-8 h-8 text-primary hover:bg-primary hover:text-white" />
        </button>
      </div>

      {/* Status Summary */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm">12 Check-ins Today</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-primary mr-2" />
            <span className="text-sm">8 Check-outs Today</span>
          </div>
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
            <span className="text-sm">3 Rooms Need Maintenance</span>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
        {dashboardCards.map((card) => (
          <div
            key={card.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ${
              activeCard === card.id ? "ring-2 ring-red-500" : "hover:shadow-lg"
            }`}
            onClick={() => toggleCard(card.id)}
          >
            <div className="p-4 cursor-pointer">
              <div className="flex justify-between items-center mb-2">
                <div className={`p-2 rounded-lg ${card.color} text-white`}>
                  <card.icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-xs font-medium ${
                    card.trendUp ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {card.trend}
                </span>
              </div>
              <h3 className="text-sm text-text/70">{card.title}</h3>
              <p className="text-2xl font-bold text-text">{card.value}</p>
            </div>
            <div
              className={`h-1 ${
                activeCard === card.id ? "bg-red-500" : card.color
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Detail Section */}
      {activeCard && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fadeIn">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-extrabold text-text">
              {dashboardCards.find((c) => c.id === activeCard)?.title} Details
            </h2>
            {/* <button
              onClick={() => setActiveCard(null)}
              className="text-text/70 hover:text-text"
            >
              <ChevronDown className="w-5 h-5 transform rotate-180" />
            </button> */}
          </div>
          {renderCardDetail()}
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-extrabold text-text mb-8">Quick Actions</h2>
        <div className="flex flex-wrap gap-5">
          <button className="bg-red-600 text-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm hover:bg-red-700 transition-colors focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-offset-2">
            <PlusCircle className="w-5 h-5" /> New Booking
          </button>
          <button className="bg-primary text-white px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm hover:bg-primary-dark transition-colors focus:outline-none focus:ring-4 focus:ring-primary focus:ring-offset-2">
            <CheckCircle className="w-5 h-5" /> Check In Guest
          </button>
          <button className="bg-gray-100 text-text px-6 py-4 rounded-xl flex items-center gap-3 shadow-sm hover:bg-gray-200 transition-colors focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-offset-2">
            <LogOut className="w-5 h-5" /> Check Out Guest
          </button>
          {/* Repeat for other buttons with similar styling */}
        </div>
      </div>
      {/* Add this at the very end, just before the final closing </div> */}
      <BookingCalendar
        isOpen={showCalendar}
        onClose={() => setShowCalendar(false)}
      />
    </div>
  );
};

export default Dashboard;
