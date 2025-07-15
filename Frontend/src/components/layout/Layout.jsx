// src/components/layout/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';

const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            {/* 
              THE FIX IS HERE: By applying overflow-x-hidden to the main container,
              we ensure that no content from any page can "spill out" horizontally,
              even during its initial animation state.
            */}
            <main className="overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;