import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import Header from './Header';

const AdminLayout = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/admin/login');
        }
    }, [user, navigate]);

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