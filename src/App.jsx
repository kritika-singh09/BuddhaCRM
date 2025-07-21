import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AppContextProvider from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TaskAssign from "./components/TaskAssign";
import CategoryList from "./components/category/CategoryList.jsx";
import RoomList from "./components/room/RoomList";
import LoginPage from "./components/login/LoginPage";
import StaffList from "./components/staff/StaffList";

// Protected route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <AppContextProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-app-gradient font-sans">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/tasks" element={<TaskAssign />} />
                      <Route path="/category" element={<CategoryList />} />
                      <Route path="/room" element={<RoomList />} />
                      <Route path="/staff" element={<StaffList />} />

                      {/* Add more routes as needed */}
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </AppContextProvider>
  );
};

export default App;
