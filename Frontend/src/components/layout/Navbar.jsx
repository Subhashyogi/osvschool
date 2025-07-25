import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaBookOpen,
  FaUniversity,
  FaUsers,
  FaImages,
  FaEnvelope,
} from "react-icons/fa";

// Import the logo from your assets folder
import siteLogo from "../../assets/OSV-logo.svg";

const navLinks = [
  { title: "Home", to: "/", icon: <FaHome /> },
  { title: "About", to: "/about", icon: <FaInfoCircle /> },
  { title: "Academics", to: "/academics", icon: <FaBookOpen /> },
  { title: "Admissions", to: "/admissions", icon: <FaUniversity /> },
  { title: "Faculty", to: "/faculty", icon: <FaUsers /> },
  { title: "Gallery", to: "/gallery", icon: <FaImages /> },
  { title: "Contact", to: "/contact", icon: <FaEnvelope /> },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.1 },
    },
    closed: { opacity: 0, transition: { when: "afterChildren" } },
  };

  const mobileLinkVariants = {
    open: { y: 0, opacity: 1 },
    closed: { y: -20, opacity: 0 },
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-brand-nav/80 backdrop-blur-lg shadow-lg border-b border-brand-surface/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20 ">
          {/* --- Logo --- */}
          <Link to="/" onClick={closeMenu} className="flex-shrink-0">
            <img
              src={siteLogo}
              alt="OSVSR School Logo"
              className="h-16 w-auto "
            />
          </Link>

          {/* --- Desktop Navigation --- */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                end
                className={({ isActive }) =>
                  `relative font-medium cursor-pointer transition-colors hover:text-orange-400 flex items-center gap-2 ${
                    isActive ? "text-orange-400" : "text-brand-nav-muted"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="text-lg">{link.icon}</span>
                    <span>{link.title}</span>
                    {isActive && (
                      <motion.div
                        className="absolute bottom-[-6px] left-0 right-0 h-0.5 bg-brand-accent"
                        layoutId="desktop-nav-underline"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* --- Mobile Menu Button --- */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              aria-label="Toggle menu"
              className="text-brand-nav-text z-50 relative"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="times"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <FaTimes size={24} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="bars"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <FaBars size={24} />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="fixed inset-0 bg-brand-nav z-40 md:hidden flex flex-col items-center justify-center"
            onClick={closeMenu}
          >
            {navLinks.map((link) => (
              <motion.div
                key={link.title}
                variants={mobileLinkVariants}
                className="my-4"
              >
                <NavLink
                  to={link.to}
                  end
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-3xl font-medium cursor-pointer transition-colors hover:text-brand-accent flex items-center gap-4 ${
                      isActive ? "text-brand-accent" : "text-brand-nav-muted"
                    }`
                  }
                >
                  {link.icon}
                  <span>{link.title}</span>
                </NavLink>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
