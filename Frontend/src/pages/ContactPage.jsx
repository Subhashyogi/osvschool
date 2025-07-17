// src/pages/ContactPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaUserGraduate, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
import AnimatedButton from '../components/common/AnimatedButton';

const departmentContacts = [ /* ...department data... */];
const schoolAddress = "123 Education Lane, Knowledge City, USA 12345";
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolAddress)}`;

const ContactPage = () => {
    return (
        <div className="bg-brand-light-bg text-brand-dark-text">
            <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 text-center overflow-hidden bg-brand-surface">
                <div className="relative container mx-auto px-4">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-extrabold text-brand-light">
                        Contact Us
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-base md:text-xl max-w-2xl mx-auto text-brand-muted">
                        We're here to help. Find the right department or send us a message.
                    </motion.p>
                </div>
            </section>

            <section className="py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-dark-text">Department Directory</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {departmentContacts.map((dept, index) => (
                            <motion.div key={index} className="bg-white p-6 md:p-8 rounded-lg text-center shadow-lg border-t-4 border-brand-accent" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <div className="text-4xl text-brand-accent mb-4 inline-block">{dept.icon}</div>
                                <h3 className="text-xl md:text-2xl font-bold text-brand-dark-text mb-6">{dept.name}</h3>
                                <div className="space-y-4">
                                    <a href={`mailto:${dept.email}`} className="group flex items-center justify-center gap-3 text-gray-600 hover:text-brand-accent transition-colors duration-300"><FaEnvelope /><span>{dept.email}</span></a>
                                    <a href={`tel:${dept.phone}`} className="group flex items-center justify-center gap-3 text-gray-600 hover:text-brand-accent transition-colors duration-300"><FaPhone /><span>{dept.phone}</span></a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-dark-text">Send Us a Message</h2>
                    <motion.form initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.8 }} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-brand-dark-text">Full Name</label>
                                <input type="text" id="name" placeholder="John Doe" className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-brand-accent focus:border-brand-accent" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-brand-dark-text">Email Address</label>
                                <input type="email" id="email" placeholder="john.doe@example.com" className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-brand-accent focus:border-brand-accent" />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-brand-dark-text">Subject</label>
                            <input type="text" id="subject" placeholder="Question about curriculum" className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-brand-accent focus:border-brand-accent" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-brand-dark-text">Message</label>
                            <textarea id="message" rows="5" placeholder="I'd like to know more about..." className="mt-1 block w-full px-4 py-3 bg-gray-100 border-transparent rounded-md focus:ring-brand-accent focus:border-brand-accent"></textarea>
                        </div>
                        <div className="text-right">
                            <AnimatedButton type="submit" className="inline-flex items-center gap-2"><FaPaperPlane />Send Message</AnimatedButton>
                        </div>
                    </motion.form>
                </div>
            </section>

            <section className="relative bg-brand-dark h-[500px]">
                <iframe src={googleMapsUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Google Maps Location" className="opacity-50"></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }} className="text-center">
                        <div className="relative inline-block">
                            <div className="absolute -inset-2 rounded-full bg-brand-accent/50 animate-ping"></div>
                            <div className="relative w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center shadow-lg"><FaMapMarkerAlt className="text-3xl text-brand-dark-text" /></div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-brand-light mt-6">Visit Our Campus</h3>
                        <p className="mt-2 text-brand-muted">{schoolAddress}</p>
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer"><AnimatedButton className="mt-6">Get Directions</AnimatedButton></a>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;