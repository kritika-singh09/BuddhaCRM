import React from "react";
import AppContextProvider from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import BookingCalendar from "./components/BookingCalendar";

const App = () => {
  return (
    <AppContextProvider>
      <div className="flex h-screen bg-app-gradient font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-hidden">
            <Dashboard />
            <div className="min-h-screen bg-gray-50 p-6">
              <BookingCalendar />
            </div>
          </main>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default App;
