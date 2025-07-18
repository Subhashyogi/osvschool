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
            <main className="overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;