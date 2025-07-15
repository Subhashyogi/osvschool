// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-brand-surface text-brand-muted">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Mobile: 2 columns, Tablet: 4 columns, Desktop: 5 columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">

                    {/* School Info: Spans full width on mobile, 1 column on desktop */}
                    <div className="col-span-2 lg:col-span-1 mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold text-brand-light mb-2">OSVSR School</h2>
                        <p className="text-sm">Nurturing Tomorrow's Leaders.</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-brand-light mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/academics">Academics</Link></li>
                            <li><Link to="/admissions">Admissions</Link></li>
                            <li><Link to="/faculty">Faculty</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-brand-light mb-4">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/gallery">Gallery</Link></li>
                            <li><a href="#" target="_blank" rel="noopener noreferrer">Student Portal</a></li>
                        </ul>
                    </div>

                    {/* Contact Info: Spans full width on mobile, 1 column on tablet+ */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-semibold text-brand-light mb-4">Contact</h4>
                        <p className="text-sm">123 Education Lane</p>
                        <p className="text-sm">Knowledge City, USA</p>
                        <p className="text-sm mt-2">(123) 456-7890</p>
                    </div>

                    {/* Socials: Spans full width on mobile, 1 column on tablet+ */}
                    <div className="col-span-2 md:col-span-1">
                        <h4 className="font-semibold text-brand-light mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors"><FaFacebook size={24} /></a>
                            <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors"><FaTwitter size={24} /></a>
                            <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors"><FaInstagram size={24} /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black/20 py-4 px-4 text-center text-sm text-brand-muted/70">
                <p>© {new Date().getFullYear()} OSVSR School. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;