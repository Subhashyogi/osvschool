// src/components/sections/PrincipalWelcome.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { principal } from '../../constants';

const PrincipalWelcome = () => {
    return (
        <section className="py-16 md:py-24 bg-brand-surface">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Responsive grid and gap */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >
                        {/* Responsive image size */}
                        <img
                            src={principal.image}
                            alt={principal.name}
                            className="rounded-full w-56 h-56 md:w-80 md:h-80 object-cover border-8 border-brand-dark shadow-2xl"
                        />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.6 }}
                        // Center text on mobile
                        className="text-center lg:text-left"
                    >
                        {/* Responsive text size */}
                        <h2 className="text-3xl md:text-4xl font-bold mb-3">A Message from Our Principal</h2>
                        <h3 className="text-xl font-semibold text-brand-accent mb-6">{principal.name}</h3>
                        <p className="text-lg leading-relaxed italic text-brand-muted">
                            "{principal.welcomeMessage}"
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PrincipalWelcome;