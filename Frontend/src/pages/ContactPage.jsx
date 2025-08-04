import React, { useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import AnimatedButton from "../components/common/AnimatedButton";
import { departmentContacts } from "../constants";

const schoolAddress =
  "Near, Lane No.-11, Brahmaputra Marg, Kumawat Colony, Kailash Nagar, Jhotwara, Jaipur, Rajasthan 302012";
const googleMapsUrl =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2803.3289601920746!2d75.76235432171447!3d26.93600173748734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db30b15555555%3A0xdb1687a2da989b86!2sO.S.V.%20Senior%20Secondary%20School!5e0!3m2!1sen!2sin!4v1753614062124!5m2!1sen!2sin";

// Regular Google Maps URL for directions
const googleMapsDirectionsUrl =
  "https://www.google.com/maps/place/O.S.V.+Senior+Secondary+School/@26.9360017,75.7623543,17z/data=!3m1!4b1!4m6!3m5!1s0x396db30b15555555:0xdb1687a2da989b86!8m2!3d26.9360017!4d75.7649292!16s%2Fg%2F11c1qw8w8w";

const ContactPage = () => {
  return (
    <div className="bg-brand-light text-brand-dark">
      <Helmet>
        <title>Contact Us - OSV School | Get in Touch for Admissions & Inquiries</title>
        <meta name="description" content="Contact OSV School for admissions, inquiries, or to learn more about our academic programs. Reach out to our dedicated team for personalized assistance and school information." />
        <meta name="keywords" content="OSV School contact, school admissions, contact information, school inquiries, academic programs, school location, contact details" />
        <meta name="author" content="OSV School" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://osvschool.com/contact" />
        <meta property="og:title" content="Contact Us - OSV School | Get in Touch for Admissions & Inquiries" />
        <meta property="og:description" content="Contact OSV School for admissions, inquiries, or to learn more about our academic programs. Reach out to our dedicated team for personalized assistance and school information." />
        <meta property="og:image" content="/src/assets/og-images/og-contact.png" />
        <meta property="og:site_name" content="OSV School" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://osvschool.com/contact" />
        <meta property="twitter:title" content="Contact Us - OSV School | Get in Touch for Admissions & Inquiries" />
        <meta property="twitter:description" content="Contact OSV School for admissions, inquiries, or to learn more about our academic programs. Reach out to our dedicated team for personalized assistance and school information." />
        <meta property="twitter:image" content="/src/assets/og-images/og-contact.png" />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://osvschool.com/contact" />
      </Helmet>
      <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 text-center overflow-hidden bg-brand-surface">
        <div className="relative container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold text-brand-dark"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-xl max-w-2xl mx-auto text-gray-900"
          >
            We're here to help. Find the right department or send us a message.
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-dark">
            Department Directory
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {departmentContacts.map((dept, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg text-center shadow-lg border-t-4 border-brand-accent"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl text-brand-light mb-4 inline-block">
                  {dept.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-brand-dark mb-6">
                  {dept.name}
                </h3>
                <div className="space-y-4">
                  <a
                    href={`mailto:${dept.email}`}
                    className="group flex items-center justify-center gap-3 text-brand-muted hover:text-brand-accent transition-colors duration-300"
                  >
                    <FaEnvelope />
                    <span>{dept.email}</span>
                  </a>
                  <a
                    href={`tel:${dept.phone}`}
                    className="group flex items-center justify-center gap-3 text-brand-muted hover:text-brand-accent transition-colors duration-300"
                  >
                    <FaPhone />
                    <span>{dept.phone}</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-dark">
            Send Us a Message
          </h2>
          <motion.form
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-brand-dark"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-brand-dark"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="john.doe@example.com"
                  className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-brand-dark"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                placeholder="Question about curriculum"
                className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-brand-dark"
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                placeholder="I'd like to know more about..."
                className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              ></textarea>
            </div>
            <div className="text-right">
              <AnimatedButton
                type="submit"
                className="inline-flex items-center gap-2"
              >
                <FaPaperPlane />
                Send Message
              </AnimatedButton>
            </div>
          </motion.form>
        </div>
      </section>

      <section className="relative bg-brand-dark h-[500px]">
        <iframe
          src={googleMapsUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Maps Location"
          className="opacity-40 filter grayscale"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-2 rounded-full bg-brand-accent/50 animate-ping"></div>
              <div className="relative w-16 h-16 bg-brand-light rounded-full flex items-center justify-center shadow-lg">
                <FaMapMarkerAlt className="text-3xl text-brand-dark" />
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-brand-light mt-6">
              Visit Our Campus
            </h3>
            <p className="mt-2 text-brand-nav-muted">{schoolAddress}</p>
            <a
              href={googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AnimatedButton className="mt-6 text-brand-light">
                Get Directions
              </AnimatedButton>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
