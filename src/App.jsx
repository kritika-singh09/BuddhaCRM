import React from "react";
import { Routes, Route } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TaskAssign from "./components/TaskAssign";

const App = () => {
  return (
    <AppContextProvider>
      <div className="flex h-screen bg-app-gradient font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-hidden">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tasks" element={<TaskAssign />} />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </AppContextProvider>
  );
};

export default App;
