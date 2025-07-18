import React from "react";
import { useAppContext } from "../context/AppContext";
import { Search, Bell, ChevronDown, Menu } from "lucide-react";

const Header = () => {
  const { toggleSidebar } = useAppContext();

  return (
    <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-20">
      {/* Hamburger Menu for mobile */}
      <button onClick={toggleSidebar} className="md:hidden text-primary">
        <Menu size={24} />
      </button>

      {/* Search Bar */}
      <div className="relative hidden md:block">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder="Search Products..."
          className="bg-white border border-secondary rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Right side icons and user profile */}
      <div className="flex items-center space-x-6">
        <button className="text-primary relative">
          <Bell size={24} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
            MR
          </div>
          <div>
            <p className="font-semibold text-sm">Marcus Robb</p>
            <p className="text-xs text-gray-500">Admin Manager</p>
          </div>
          <ChevronDown size={20} className="text-primary" />
        </div>
      </div>
    </header>
  );
};

export default Header;
