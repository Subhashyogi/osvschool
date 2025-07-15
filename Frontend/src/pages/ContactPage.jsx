// src/pages/ContactPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import AnimatedButton from '../components/common/AnimatedButton';

const ContactPage = () => {
    return (
        <div>
            <div className="pt-32 pb-16 text-center bg-brand-surface px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold">Get In Touch</h1>
                <p className="mt-4 text-lg text-brand-muted">We'd love to hear from you. Here's how you can reach us.</p>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Stacks on large screens and below */}
                <div className="grid lg:grid-cols-2 gap-12 md:gap-16 bg-brand-surface p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl">
                    <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-light mb-6">Contact Information</h2>
                        <p className="text-brand-muted mb-8">Fill up the form and our team will get back to you within 24 hours.</p>
                        <div className="space-y-6 text-brand-light">
                            <div className="flex items-center space-x-4">
                                <FaPhone className="text-xl text-brand-accent" />
                                <span>(123) 456-7890</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                <FaEnvelope className="text-xl text-brand-accent" />
                                <span>info@osvsrschool.edu</span>
                            </div>
                            <div className="flex items-start space-x-4">
                                <FaMapMarkerAlt className="text-xl text-brand-accent mt-1 flex-shrink-0" />
                                <span>123 Education Lane, Knowledge City, USA 12345</span>
                            </div>
                        </div>
                        <div className="mt-10 rounded-lg overflow-hidden border border-brand-dark">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617066981229!2d-73.9878536845941!3d40.7484409793282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628282123456!5m2!1sen!2sus"
                                width="100%" height="250" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Google Maps Location"
                            ></iframe>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {/* Form remains the same, it's already block-level and responsive */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-light">Full Name</label>
                            <input type="text" id="name" className="mt-1 block w-full px-4 py-3 bg-brand-dark/50 border border-brand-muted/30 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent text-brand-light" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-light">Email Address</label>
                            <input type="email" id="email" className="mt-1 block w-full px-4 py-3 bg-brand-dark/50 border border-brand-muted/30 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent text-brand-light" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-brand-light">Message</label>
                            <textarea id="message" rows="5" className="mt-1 block w-full px-4 py-3 bg-brand-dark/50 border border-brand-muted/30 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent text-brand-light"></textarea>
                        </div>
                        <div>
                            <AnimatedButton type="submit" className="w-full">
                                Send Message
                            </AnimatedButton>
                        </div>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;