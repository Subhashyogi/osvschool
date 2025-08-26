import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaImages,
  FaSignOutAlt,
  FaSchool,
  // FaTrophy,
  FaCommentAlt,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const { logout } = useAuth();

  const baseLinkClass =
    "flex items-center px-4 py-3 text-gray-200 transition-colors duration-200 transform rounded-md";
  const activeLinkClass = "bg-gray-700";
  const inactiveLinkClass = "hover:bg-gray-700";

  // Function to handle link clicks, which will close the sidebar on mobile
  const handleLinkClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay for mobile */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      ></div>

      <div
        className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-brand-nav text-gray-200 transform z-30 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-center h-20 border-b border-gray-700">
          <FaSchool className="h-8 w-8 mr-2" />
          <span className="text-xl font-bold">OSVSR Admin</span>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
            onClick={handleLinkClick} // <-- THE FIX IS HERE
          >
            <FaTachometerAlt className="w-5 h-5" />
            <span className="mx-4 font-medium">Dashboard</span>
          </NavLink>
          <NavLink
            to="/admin/faculty"
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
            onClick={handleLinkClick} // <-- THE FIX IS HERE
          >
            <FaUsers className="w-5 h-5" />
            <span className="mx-4 font-medium">Faculty</span>
          </NavLink>
          <NavLink
            to="/admin/gallery"
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
            onClick={handleLinkClick} // <-- THE FIX IS HERE
          >
            <FaImages className="w-5 h-5" />
            <span className="mx-4 font-medium">Gallery</span>
          </NavLink>
          {/* <NavLink
            to="/admin/achievements"
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
            onClick={handleLinkClick}
          >
            <FaTrophy className="w-5 h-5" />
            <span className="mx-4 font-medium">Achievements</span>
          </NavLink> */}
          <NavLink
            to="/admin/testimonials"
            className={({ isActive }) =>
              `${baseLinkClass} ${
                isActive ? activeLinkClass : inactiveLinkClass
              }`
            }
            onClick={handleLinkClick}
          >
            <FaCommentAlt className="w-5 h-5" />
            <span className="mx-4 font-medium">Testimonials</span>
          </NavLink>
        </nav>
        <div className="px-2 py-4 border-t border-gray-700">
          <button
            onClick={() => {
              handleLinkClick(); // Close sidebar first
              logout(); // Then logout
            }}
            className={`${baseLinkClass} ${inactiveLinkClass} w-full`}
          >
            <FaSignOutAlt className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
