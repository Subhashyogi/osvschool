import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaArrowRight,
  FaBookOpen,
  FaUserFriends,
  FaInfoCircle,
} from "react-icons/fa";

const sitemapData = [
  {
    title: "About Us",
    icon: <FaInfoCircle className="text-brand-accent" />,
    links: [
      { label: "Our Story", to: "/about" },
      { label: "Faculty", to: "/faculty" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Academics",
    icon: <FaBookOpen className="text-brand-accent" />,
    links: [
      { label: "Programs", to: "/academics" },
      { label: "Campus Life", to: "/gallery" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-brand-nav text-brand-nav-muted border-t border-brand-accent/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-12">
          <div className="lg:col-span-1">
            {/* <h2 className="text-xl md:text-2xl font-bold text-brand-accent mb-2">OSVSR School</h2> */}
            <img src="/src/assets/OSV-logo.svg" alt="" className="w-32 mb-3" />
            <p className="text-sm max-w-xs">
              Nurturing Tomorrow's Leaders with a blend of tradition and
              innovation.
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-brand-nav-muted hover:text-brand-accent transition-colors"
                aria-label="Facebook"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="#"
                className="text-brand-nav-muted hover:text-brand-accent transition-colors"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-brand-nav-muted hover:text-brand-accent transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sitemapData.map((section) => (
                <div key={section.title}>
                  <h4 className="font-semibold text-orange-400 mb-4 flex items-center gap-2">
                    {section.icon} {section.title}
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          to={link.to}
                          className="hover:text-brand-accent transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h4 className="font-semibold text-orange-400 mb-4">Find Us</h4>
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.3289601920746!2d75.76235432171447!3d26.93600173748734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db30b15555555%3A0xdb1687a2da989b86!2sO.S.V.%20Senior%20Secondary%20School!5e0!3m2!1sen!2sin!4v1753614062124!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="O.S.V. Senior Secondary School Location"
              ></iframe>
            </div>
          </div>
        </div>

        {/* <hr className="my-10 border-brand-surface/50" /> */}

        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h4 className="font-semibold text-brand-accent flex items-center gap-2">
              <FaUserFriends className="text-brand-accent" /> Stay Connected
            </h4>
            <p className="text-sm mt-2">
              Subscribe to our newsletter for the latest news and updates.
            </p>
          </div>
          <form className="flex flex-col sm:flex-row gap-2 w-full max-w-md md:ml-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full text-sm px-4 py-3 bg-brand-surface text-brand-dark rounded-md focus:ring-2 focus:ring-brand-accent focus:outline-none placeholder:text-brand-muted"
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className="flex-shrink-0 px-4 py-3 bg-brand-accent text-white rounded-md hover:bg-brand-accent/90 transition-colors duration-300"
              aria-label="Subscribe"
            >
              <FaArrowRight size={16} />
            </button>
          </form>
        </div> */}
      </div>

      <div className="border-t border-brand-surface/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-brand-nav-muted/70">
          <p className="mb-4 sm:mb-0 text-center sm:text-left">
            © {new Date().getFullYear()} OSVSR School. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="#" className="hover:text-brand-accent">
              Privacy Policy
            </Link>
            <span className="opacity-50">|</span>
            <Link to="#" className="hover:text-brand-accent">
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
