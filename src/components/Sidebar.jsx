import React from "react";
import { useAppContext } from "../context/AppContext";
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  BarChart2,
  FileText,
  HelpCircle,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const { isSidebarOpen } = useAppContext();
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard" },
    { icon: ShoppingCart, label: "Orders" },
    { icon: Users, label: "Customers" },
    { icon: BarChart2, label: "Analytics" },
    { icon: FileText, label: "Reports" },
  ];

  const bottomNavItems = [
    { icon: HelpCircle, label: "Help & Support" },
    { icon: Settings, label: "Setting" },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 bg-primary text-white w-64 transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col z-30`}
    >
      <div className="flex items-center justify-center p-6 border-b border-secondary">
        <h1 className="text-2xl font-bold">Buddha</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 ${
              item.label === "Dashboard"
                ? "bg-background text-primary font-semibold"
                : "hover:bg-secondary"
            }`}
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </a>
        ))}
      </nav>
      <div className="p-4 border-t border-secondary">
        {bottomNavItems.map((item, index) => (
          <a
            key={index}
            href="#"
            className="flex items-center px-4 py-2.5 rounded-lg hover:bg-hover transition-colors duration-200"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
