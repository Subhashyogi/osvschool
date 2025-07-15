// src/pages/AboutPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaRegEye, FaRocket, FaHandshake } from 'react-icons/fa';

const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const AboutPage = () => {
    return (
        <div className="bg-brand-light-bg text-brand-dark-text">
            <div className="relative pt-32 pb-16 md:pb-20 bg-brand-surface text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-light">Our Story & Mission</h1>
                <p className="mt-4 text-lg text-brand-muted">A Tradition of Excellence Since 1985</p>
            </div>

            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
                        <FaRegEye className="text-4xl md:text-5xl text-brand-accent mb-4" />
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark-text mb-4">Our Vision</h2>
                        <p className="text-gray-600">To be a leading educational institution that inspires students to achieve their full potential and become compassionate, responsible global citizens.</p>
                    </motion.div>
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={fadeIn}>
                        <FaRocket className="text-4xl md:text-5xl text-brand-accent mb-4" />
                        <h2 className="text-2xl md:text-3xl font-bold text-brand-dark-text mb-4">Our Mission</h2>
                        <p className="text-gray-600">To provide a challenging and supportive learning environment that fosters intellectual curiosity, critical thinking, and a lifelong love of learning.</p>
                    </motion.div>
                </div>
            </section>

            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark-text mb-12">Our Core Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {['Integrity', 'Community', 'Excellence'].map((value, index) => (
                            <motion.div
                                key={value}
                                className="p-8 bg-brand-light-bg rounded-xl shadow-lg border-t-4 border-brand-accent"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.5 }}
                                variants={fadeIn}
                                custom={index}
                                transition={{ delay: index * 0.2 }}
                            >
                                <FaHandshake className="text-4xl text-brand-accent mx-auto mb-4" />
                                <h3 className="text-2xl font-bold text-brand-dark-text">{value}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;