// src/components/layout/Footer.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF, FaTwitter, FaInstagram, FaArrowRight,
    FaUniversity, FaBookOpen, FaUserFriends, FaInfoCircle
} from 'react-icons/fa';

// This is the component for the interactive brand zone with the spotlight effect
const BrandZone = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            className="relative col-span-12 lg:col-span-3 p-8 rounded-2xl bg-brand-nav-muted/5 group"
        >
            {/* The spotlight effect */}
            <div
                className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                    background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(183, 183, 164, 0.1), transparent 80%)`,
                }}
            ></div>

            <div className="relative">
                <h2 className="text-2xl font-bold text-brand-nav-text mb-2">OSVSR School</h2>
                <p className="text-sm">Nurturing Tomorrow's Leaders.</p>

                <div className="mt-8 flex space-x-4">
                    <a href="#" className="text-brand-nav-muted hover:text-brand-accent transition-colors" aria-label="Facebook"><FaFacebookF size={20} /></a>
                    <a href="#" className="text-brand-nav-muted hover:text-brand-accent transition-colors" aria-label="Twitter"><FaTwitter size={20} /></a>
                    <a href="#" className="text-brand-nav-muted hover:text-brand-accent transition-colors" aria-label="Instagram"><FaInstagram size={20} /></a>
                </div>
            </div>
        </div>
    );
};


const Footer = () => {
    return (
        <footer className="bg-brand-nav text-brand-nav-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">

                {/* 1. Clear Visual Zoning with a parent grid */}
                <div className="grid grid-cols-12 gap-8">

                    {/* 2. Interactive Brand Zone */}
                    <BrandZone />

                    {/* Sitemap & Newsletter Zone */}
                    <div className="col-span-12 lg:col-span-9 grid grid-cols-2 sm:grid-cols-4 gap-8">

                        {/* 3. Sitemap with Icons */}
                        <div>
                            <h4 className="font-semibold text-brand-nav-text mb-4 flex items-center gap-2"><FaInfoCircle className="text-brand-accent" /> About Us</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/about">Our Story</Link></li>
                                <li><Link to="/faculty">Faculty</Link></li>
                                <li><Link to="#">Careers</Link></li>
                                <li><Link to="/contact">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-brand-nav-text mb-4 flex items-center gap-2"><FaBookOpen className="text-brand-accent" /> Academics</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/academics">Programs</Link></li>
                                <li><Link to="#">Curriculum</Link></li>
                                <li><Link to="/gallery">Campus Life</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-brand-nav-text mb-4 flex items-center gap-2"><FaUniversity className="text-brand-accent" /> Admissions</h4>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/admissions">How to Apply</Link></li>
                                <li><Link to="#">Tuition & Fees</Link></li>
                                <li><Link to="#">Visit Us</Link></li>
                            </ul>
                        </div>

                        {/* 4. Integrated Newsletter Form */}
                        <div className="col-span-2 sm:col-span-1">
                            <h4 className="font-semibold text-brand-nav-text mb-4 flex items-center gap-2"><FaUserFriends className="text-brand-accent" /> Community</h4>
                            <ul className="space-y-2 text-sm mb-6">
                                <li><Link to="#">News & Events</Link></li>
                                <li><a href="#">Student Portal</a></li>
                            </ul>

                            <h4 className="font-semibold text-brand-nav-text mb-2">Newsletter</h4>
                            <form className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full text-sm px-3 py-2 bg-brand-nav-muted/20 text-brand-nav-text rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none"
                                />
                                <button type="submit" className="p-3 bg-brand-accent text-brand-dark rounded-md hover:bg-brand-accent/90" aria-label="Subscribe">
                                    <FaArrowRight size={12} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. Refined Sub-Footer */}
            <div className="border-t border-brand-nav-muted/20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-brand-nav-muted/70">
                    <p className="mb-2 sm:mb-0">© {new Date().getFullYear()} OSVSR School. All Rights Reserved.</p>
                    <div className="flex space-x-4">
                        <Link to="/privacy-policy" className="hover:text-brand-accent">Privacy Policy</Link>
                        <span className="opacity-50">|</span>
                        <Link to="/terms" className="hover:text-brand-accent">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;