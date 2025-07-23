import React from "react";
import { Link } from "react-router-dom"; // Make sure to have react-router-dom installed
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 h-screen flex items-center justify-center">
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
