import React from "react";
import AppContextProvider from "./context/AppContext";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

const App = () => {
  return (
    <AppContextProvider>
      <div className="flex h-screen bg-app-gradient font-sans">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
        </div>
      </div>
    </AppContextProvider>
  );
};

export default App;
