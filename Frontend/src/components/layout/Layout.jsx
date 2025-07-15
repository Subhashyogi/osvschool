// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';

const Layout = () => {
    return (
        <>
            <ScrollToTop /> {/* Ensures navigation to new page scrolls to top */}
            <Navbar />
            <main className="bg-brand-dark">
                {/* Outlet renders the current page's component */}
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;