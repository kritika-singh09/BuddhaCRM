
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart2,
  FileText,
  HelpCircle,
  Settings,
  UserCheck,
  ChartBarStacked,
  BedDouble,
  LogOut,
  UserRound,
  ChevronDown, // Import for dropdown arrow
  ChevronUp, // Import for dropdown arrow
  ListChecks, // Icon for Order Management
  Package, // Icon for Inventory Management
} from "lucide-react";
import logoImage from "../assets/buddhaavenuelogo.png";

const Sidebar = () => {
  const { isSidebarOpen } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLaundaryDropdownOpen, setIsLaundaryDropdownOpen] = useState(false); // State for dropdown

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleLaundaryDropdown = () => {
    setIsLaundaryDropdownOpen(!isLaundaryDropdownOpen);
  };

  // Modified navItems to include a 'children' property for dropdowns
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: UserCheck, label: "Task Assigned", path: "/tasks" },
    { icon: ChartBarStacked, label: "Category", path: "/category" },
    { icon: BedDouble, label: "Room", path: "/room" },
    { icon: FileText, label: "Booking", path: "/booking" },
    { icon: FileText, label: "Reservation", path: "/reservation" },
    { icon: UserRound, label: "Staff", path: "/staff" },
    {
      icon: UserRound,
      label: "Laundary",
      path: "/laundry", // A parent path for the dropdown, if needed
      isDropdown: true,
      children: [
        { label: "Order Management", path: "/laundry/ordermanagement", icon: ListChecks },
        { label: "Inventory Management", path: "/laundry/inventorymanagement", icon: Package },
      ],
    },
    { icon: ShoppingCart, label: "Orders", path: "/orders" }, // Existing Orders, assuming it's separate from Laundry Orders
    { icon: Users, label: "Customers", path: "/customers" },
  ];

  const bottomNavItems = [
    { icon: HelpCircle, label: "Help & Support", path: "/help" },
    { icon: Settings, label: "Setting", path: "/settings" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-[#1f2937] text-[#c2ab65] w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col z-30`}
    >
      <div className="flex items-center justify-center p-2">
        <img src={logoImage} alt="Buddha Avenue" className="h-30 mx-auto" />
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <div key={index}>
            {item.isDropdown ? (
              <>
                <button
                  onClick={toggleLaundaryDropdown}
                  className={`flex items-center justify-between w-full px-4 py-2.5 rounded-lg transition-colors duration-200 focus:outline-none
                    ${
                      location.pathname.startsWith(item.path) ||
                      item.children.some(child => location.pathname === child.path)
                        ? "bg-[#c2ab65] text-[#1f2937] font-semibold"
                        : "hover:bg-secondary hover:text-[#1f2937]"
                    }`}
                >
                  <div className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </div>
                  {isLaundaryDropdownOpen ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
                {isLaundaryDropdownOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 text-sm
                          ${
                            location.pathname === subItem.path
                              ? "bg-[#c2ab65] text-[#1f2937] font-semibold"
                              : "hover:bg-secondary hover:text-[#1f2937]"
                          }`}
                      >
                        {subItem.icon && <subItem.icon className="w-4 h-4 mr-2" />}
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
                  location.pathname === item.path
                    ? "bg-[#c2ab65] text-[#1f2937] font-semibold"
                    : "hover:bg-secondary hover:text-[#1f2937]"
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-secondary">
        {bottomNavItems.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="flex items-center px-4 py-2.5 rounded-lg hover:bg-hover transition-colors duration-200"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </Link>
        ))}
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2.5 rounded-lg hover:bg-hover transition-colors duration-200 w-full text-left"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;