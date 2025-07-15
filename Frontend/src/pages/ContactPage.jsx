// src/pages/ContactPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaBuilding, FaUserGraduate, FaQuestionCircle, FaVideo, FaPaperPlane } from 'react-icons/fa';
import AnimatedButton from '../components/common/AnimatedButton';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink, Element } from 'react-scroll';

// Data for the page
const departmentContacts = [
    { name: "Admissions Office", icon: <FaUserGraduate />, email: "admissions@osvsrschool.edu", phone: "(123) 456-7891" },
    { name: "Principal's Office", icon: <FaBuilding />, email: "principal@osvsrschool.edu", phone: "(123) 456-7892" },
    { name: "General Inquiries", icon: <FaQuestionCircle />, email: "info@osvsrschool.edu", phone: "(123) 456-7890" },
];

const schoolAddress = "123 Education Lane, Knowledge City, USA 12345";
const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(schoolAddress)}`;

const ContactPage = () => {
    return (
        <div className="bg-brand-dark">
            {/* 1. Interactive "Contact Pathfinder" Hero */}
            <section className="relative pt-40 pb-32 text-center overflow-hidden">
                <div className="absolute inset-0 bg-brand-surface"></div>
                {/* Decorative background shapes */}
                <div className="absolute -top-10 -left-20 w-64 h-64 bg-brand-accent/5 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-20 -right-10 w-72 h-72 bg-brand-accent/10 rounded-full filter blur-3xl"></div>

                <div className="relative container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="text-4xl md:text-6xl font-extrabold text-brand-light"
                    >
                        Contact Us
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-brand-muted"
                    >
                        Let's connect. Tell us who you are, and we'll guide you to the right place.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        <ScrollLink to="departments" smooth={true} duration={500} offset={-100} className="cursor-pointer">
                            <AnimatedButton className="bg-brand-accent/40">I'm a Prospective Parent</AnimatedButton>
                        </ScrollLink>
                        <ScrollLink to="contact-form" smooth={true} duration={500} offset={-100} className="cursor-pointer">
                            <AnimatedButton className="bg-brand-dark text-brand-dark hover:bg-brand-light/20">I have a General Question</AnimatedButton>
                        </ScrollLink>
                        <ScrollLink to="virtual-tour" smooth={true} duration={500} offset={-100} className="cursor-pointer">
                            <AnimatedButton className="bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark">I'd Like to See the Campus</AnimatedButton>
                        </ScrollLink>
                    </motion.div>
                </div>
            </section>

            {/* Direct Department Contacts */}
            <Element name="departments">
                <section className="py-24 bg-brand-dark">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="text-4xl font-bold text-center mb-12 text-brand-light">Department Directory</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {departmentContacts.map((dept, index) => (
                                <motion.div
                                    key={index}
                                    className="bg-brand-surface p-8 rounded-lg text-center"
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.5 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <div className="text-4xl text-brand-accent mb-4 inline-block">{dept.icon}</div>
                                    <h3 className="text-2xl font-bold text-brand-light mb-6">{dept.name}</h3>
                                    <div className="space-y-4">
                                        <a href={`mailto:${dept.email}`} className="group flex items-center justify-center gap-3 text-brand-muted hover:text-brand-accent transition-colors duration-300">
                                            <FaEnvelope className="group-hover:text-brand-accent transition-colors duration-300" /> <span>{dept.email}</span>
                                        </a>
                                        <a href={`tel:${dept.phone}`} className="group flex items-center justify-center gap-3 text-brand-muted hover:text-brand-accent transition-colors duration-300">
                                            <FaPhone className="group-hover:text-brand-accent transition-colors duration-300" /> <span>{dept.phone}</span>
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </Element>

            {/* 3. Smart Contact Form */}
            <Element name="contact-form">
                <section className="py-24 bg-brand-surface">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <h2 className="text-4xl font-bold text-center mb-12 text-brand-light">Send Us a Message</h2>
                        <motion.form
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6 bg-brand-dark p-8 rounded-lg shadow-xl"
                        >
                            {/* Form fields remain the same */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-brand-light">Full Name</label>
                                    <input type="text" id="name" placeholder="John Doe" className="mt-1 block w-full px-4 py-3 bg-brand-surface border border-brand-surface/50 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent text-brand-light placeholder:text-brand-muted/50" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-brand-light">Email Address</label>
                                    <input type="email" id="email" placeholder="john.doe@example.com" className="mt-1 block w-full px-4 py-3 bg-brand-surface border border-brand-surface/50 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent text-brand-light placeholder:text-brand-muted/50" />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-brand-light">Subject</label>
                                <input type="text" id="subject" placeholder="Question about curriculum" className="mt-1 block w-full px-4 py-3 bg-brand-surface border border-brand-surface/50 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent text-brand-light placeholder:text-brand-muted/50" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-brand-light">Message</label>
                                <textarea id="message" rows="5" placeholder="I'd like to know more about..." className="mt-1 block w-full px-4 py-3 bg-brand-surface border border-brand-surface/50 rounded-md shadow-sm focus:ring-brand-accent focus:border-brand-accent text-brand-light placeholder:text-brand-muted/50"></textarea>
                            </div>
                            <div className="text-right">
                                <AnimatedButton type="submit" className="inline-flex items-center gap-2">
                                    <FaPaperPlane />
                                    Send Message
                                </AnimatedButton>
                            </div>
                        </motion.form>
                    </div>
                </section>
            </Element>

            {/* 4. "Virtual Tour" CTA */}
            <Element name="virtual-tour">
                <section className="py-24 bg-brand-dark text-center">
                    <div className="container mx-auto px-4">
                        <FaVideo className="text-5xl text-brand-accent mx-auto mb-4" />
                        <h2 className="text-4xl font-bold text-brand-light">Take a Virtual Tour</h2>
                        <p className="mt-4 text-lg max-w-2xl mx-auto text-brand-muted mb-8">
                            Can't visit in person? Explore our state-of-the-art facilities, vibrant classrooms, and beautiful campus grounds from anywhere in the world.
                        </p>
                        <RouterLink to="/gallery">
                            <AnimatedButton>Explore the Gallery</AnimatedButton>
                        </RouterLink>
                    </div>
                </section>
            </Element>

            {/* 2. Dynamic Map with Live Directions */}
            <section className="relative bg-brand-dark h-[500px]">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.617066981229!2d-73.9878536845941!3d40.7484409793282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1628282123456!5m2!1sen!2sus"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" title="Google Maps Location"
                    className="opacity-20 grayscale"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <div className="relative inline-block">
                            <div className="absolute -inset-2 rounded-full bg-brand-accent/50 animate-ping"></div>
                            <div className="relative w-16 h-16 bg-brand-accent rounded-full flex items-center justify-center shadow-lg">
                                <FaMapMarkerAlt className="text-3xl text-brand-dark" />
                            </div>
                        </div>
                        <h3 className="text-3xl font-bold text-brand-light mt-6">Visit Our Campus</h3>
                        <p className="mt-2 text-brand-muted">{schoolAddress}</p>
                        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                            <AnimatedButton className="mt-6">Get Directions</AnimatedButton>
                        </a>

                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default ContactPage;