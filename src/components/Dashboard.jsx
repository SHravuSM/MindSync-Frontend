import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuthContext();
  const [open, setOpen] = useState(false);


  return (
    <div className="flex flex-col h-screen w-full bg-gradient-to-br from-blue-50 to-white">
      {/* Top Navbar */}
      <Navbar setOpen={setOpen} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar setOpen={setOpen} open={open} />

        {/* Feed Area */}
        <div className="flex-1 relative overflow-y-auto px-2 sm:px-4">
          <Outlet />
          {/* Floating Write Button (Bottom-Right) */}

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
