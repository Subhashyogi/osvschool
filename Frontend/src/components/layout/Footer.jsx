// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
    FaFacebookF, FaTwitter, FaInstagram, FaArrowRight,
    FaUniversity, FaBookOpen, FaUserFriends, FaInfoCircle
} from 'react-icons/fa';

// --- Data for the Sitemap Links (Easier to manage) ---
const sitemapData = [
    {
        title: "About Us",
        icon: <FaInfoCircle className="text-brand-accent" />,
        links: [
            { label: "Our Story", to: "/about" },
            { label: "Faculty", to: "/faculty" },
            { label: "Careers", to: "#" },
            { label: "Contact", to: "/contact" },
        ]
    },
    {
        title: "Academics",
        icon: <FaBookOpen className="text-brand-accent" />,
        links: [
            { label: "Programs", to: "/academics" },
            { label: "Curriculum", to: "#" },
            { label: "Campus Life", to: "/gallery" },
        ]
    },
    {
        title: "Admissions",
        icon: <FaUniversity className="text-brand-accent" />,
        links: [
            { label: "How to Apply", to: "/admissions" },
            { label: "Tuition & Fees", to: "#" },
            { label: "Visit Us", to: "#" },
        ]
    }
];


const Footer = () => {
    return (
        <footer className="bg-brand-dark text-brand-muted border-t border-brand-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">

                {/* Main grid: Stacks on mobile, becomes 3-col on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">

                    {/* Zone 1: Brand Info & Socials */}
                    <div className="lg:col-span-1">
                        <h2 className="text-xl md:text-2xl font-bold text-brand-light mb-2">OSVSR School</h2>
                        <p className="text-sm max-w-xs">Nurturing Tomorrow's Leaders with a blend of tradition and innovation.</p>
                        <div className="mt-6 flex space-x-4">
                            <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors" aria-label="Facebook"><FaFacebookF size={20} /></a>
                            <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors" aria-label="Twitter"><FaTwitter size={20} /></a>
                            <a href="#" className="text-brand-muted hover:text-brand-accent transition-colors" aria-label="Instagram"><FaInstagram size={20} /></a>
                        </div>
                    </div>

                    {/* Zone 2: Sitemap Links */}
                    <div className="lg:col-span-2">
                        {/* Nested grid for the links themselves: 2 cols on mobile, 3 on tablet+ */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {sitemapData.map((section) => (
                                <div key={section.title}>
                                    <h4 className="font-semibold text-brand-light mb-4 flex items-center gap-2">{section.icon} {section.title}</h4>
                                    <ul className="space-y-3 text-sm">
                                        {section.links.map(link => (
                                            <li key={link.label}>
                                                <Link to={link.to} className="hover:text-brand-accent transition-colors">{link.label}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Divider and Newsletter for mobile */}
                <hr className="my-10 border-brand-surface/50 lg:hidden" />

                {/* Zone 3: Newsletter (Full width on mobile, integrated on desktop) */}
                <div className="mt-8 lg:mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h4 className="font-semibold text-brand-light flex items-center gap-2"><FaUserFriends className="text-brand-accent" /> Stay Connected</h4>
                            <p className="text-sm mt-2">Subscribe to our newsletter for the latest news and updates.</p>
                        </div>
                        <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md md:ml-auto">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full text-sm px-3 py-2 bg-brand-surface/80 text-brand-light rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none placeholder:text-brand-muted"
                                aria-label="Email for newsletter"
                            />
                            <button type="submit" className="flex-shrink-0 p-3 bg-brand-accent text-brand-dark-text rounded-md hover:bg-brand-accent/90" aria-label="Subscribe">
                                <FaArrowRight size={12} />
                            </button>
                        </form>
                    </div>
                </div>

            </div>

            {/* Sub-Footer */}
            <div className="border-t border-brand-surface/50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-brand-muted/70">
                    <p className="mb-4 sm:mb-0 text-center sm:text-left">© {new Date().getFullYear()} OSVSR School. All Rights Reserved.</p>
                    <div className="flex items-center space-x-4">
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