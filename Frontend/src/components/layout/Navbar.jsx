// src/components/layout/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const navLinks = [
    { title: 'Home', to: '/' },
    { title: 'About', to: '/about' },
    { title: 'Academics', to: '/academics' },
    { title: 'Admissions', to: '/admissions' },
    { title: 'Faculty', to: '/faculty' },
    { title: 'Gallery', to: '/gallery' },
    { title: 'Contact', to: '/contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    }

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 bg-brand-surface/90 backdrop-blur-sm shadow-lg">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                    <Link to="/" onClick={closeMenu} className="text-2xl font-extrabold text-brand-light">OSVSR</Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 lg:space-x-8">
                        {navLinks.map(link => (
                            <NavLink
                                key={link.title}
                                to={link.to}
                                end
                                className={({ isActive }) =>
                                    `font-medium cursor-pointer transition-colors hover:text-brand-light ${isActive ? 'text-brand-accent' : 'text-brand-muted'
                                    }`
                                }
                            >
                                {link.title}
                            </NavLink>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={toggleMenu} aria-label="Toggle menu">
                            {isOpen ? <FaTimes className="text-2xl text-brand-light" /> : <FaBars className="text-2xl text-brand-light" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-0 w-full h-auto bg-brand-surface z-40 md:hidden"
                    >
                        <div className="flex flex-col items-center space-y-6 py-8">
                            {navLinks.map(link => (
                                <NavLink
                                    key={link.title}
                                    to={link.to}
                                    end
                                    onClick={closeMenu} // Close menu on link click
                                    className={({ isActive }) =>
                                        `text-xl font-medium cursor-pointer transition-colors hover:text-brand-light ${isActive ? 'text-brand-accent' : 'text-brand-muted'
                                        }`
                                    }
                                >
                                    {link.title}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;