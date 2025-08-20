import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "./Sidebar";
import Header from "./Header";

const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/admin/login");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-8 w-8 text-brand-dark"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-brand-dark font-medium">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    // --- THE FIX IS HERE ---
    // 1. The root container is now a flexbox with a fixed height of the screen.
    <div className="flex h-screen bg-gray-100">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* 2. This wrapper will contain the header and the scrollable content.
                   - `flex-1`: It will take up the remaining space.
                   - `flex flex-col`: It arranges its children vertically.
                   - `overflow-hidden`: This is crucial. It prevents this column from ever showing a scrollbar,
                     forcing the scrolling to happen inside the <main> element.
            */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header setSidebarOpen={setSidebarOpen} />

        {/* 3. The <main> content area is now the ONLY element that scrolls.
                       - `flex-1`: It expands to fill the available space below the header.
                       - `overflow-y-auto`: It will only show a scrollbar if its content is taller than the available space.
                */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 scrollbar-hide">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
