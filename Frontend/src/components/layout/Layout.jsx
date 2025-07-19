import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import FloatingWhatsApp from '../common/FloatingWhatsApp';

const Layout = () => {
    return (
        <>
            <ScrollToTop />
            <Navbar />
            <main className="overflow-x-hidden">
                <Outlet />
            </main>
            <Footer />
            <FloatingWhatsApp />
        </>
    );
};

export default Layout;