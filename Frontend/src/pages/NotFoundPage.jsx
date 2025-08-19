import React from "react";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Helmet } from "react-helmet";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | OSV School</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to OSV School homepage to explore our academic programs and facilities."
        />
        <meta name="robots" content="noindex, nofollow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://osvschool.netlify.app/404" />
        <meta property="og:title" content="404 - Page Not Found | OSV School" />
        <meta
          property="og:description"
          content="The page you're looking for doesn't exist. Return to OSV School homepage to explore our academic programs and facilities."
        />
        <meta
          property="og:image"
          content="https://osvschool.netlify.app/assets/og-images/og-pagenotfound.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="OSV School" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://osvschool.netlify.app/404"
        />
        <meta
          property="twitter:title"
          content="404 - Page Not Found | OSV School"
        />
        <meta
          property="twitter:description"
          content="The page you're looking for doesn't exist. Return to OSV School homepage to explore our academic programs and facilities."
        />
        <meta
          property="twitter:image"
          content="https://osvschool.netlify.app/assets/og-images/og-pagenotfound.png"
        />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://osvschool.netlify.app/404" />
      </Helmet>

      <Navbar />
      <div className="min-h-screen bg-brand-light flex items-center justify-center px-4">
        <div className="text-center">
          <div className="relative inline-block">
            <h1 className="text-9xl font-extrabold text-gray-800 tracking-widest">
              404
            </h1>
            <div className="bg-blue-500 px-2 text-sm rounded rotate-12 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              Page Not Found
            </div>
          </div>
          <p className="text-2xl md:text-3xl text-gray-600 mt-4">
            Oops! The page you're looking for has taken a day off.
          </p>
          <p className="text-md text-gray-500 mt-2">
            Maybe it went to the library, or perhaps it's on a field trip.
          </p>
          <div className="mt-8">
            <Link
              to="/"
              className="inline-block px-8 py-3 text-lg font-semibold text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              Go to Homepage
            </Link>
          </div>
          <div className="mt-12 text-gray-400">
            <p>If you believe this is an error, please contact support.</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NotFoundPage;
