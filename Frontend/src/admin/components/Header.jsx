import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle, FaBars } from 'react-icons/fa';

const Header = ({ setSidebarOpen }) => {
    const { user } = useAuth();

    return (
        <header className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            {/* Mobile hamburger button */}
            <button onClick={() => setSidebarOpen(true)} className="text-gray-500 focus:outline-none md:hidden">
                <FaBars className="h-6 w-6" />
            </button>

            {/* User Info (pushed to the right) */}
            <div className="flex items-center ml-auto">
                <span className="mr-2 font-medium text-gray-700 hidden sm:inline">{user.name}</span>
                <FaUserCircle className="w-8 h-8 text-gray-500" />
            </div>
        </header>
    );
};

export default Header;