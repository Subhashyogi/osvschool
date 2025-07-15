// src/components/sections/Pillars.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaBookOpen, FaUserFriends, FaTrophy } from 'react-icons/fa';

const featuresData = [
    { icon: <FaBookOpen />, title: 'Expert Curriculum', description: 'Our programs are designed by industry experts to challenge and inspire.' },
    { icon: <FaUserFriends />, title: 'Vibrant Community', description: 'A diverse and supportive network of students, faculty, and alumni.' },
    { icon: <FaTrophy />, title: 'Legacy of Success', description: 'Join a tradition of excellence and achievement in academics and beyond.' },
];

const Pillars = () => {
    const cardVariants = {
        offscreen: { y: 50, opacity: 0 },
        onscreen: { y: 0, opacity: 1, transition: { type: "spring", bounce: 0.4, duration: 0.8 } }
    };

    return (
        // Responsive padding
        <div className="py-16 md:py-24 bg-brand-dark">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Responsive text and margin */}
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-brand-light">Our Three Pillars</h2>
                {/* Responsive grid: 1 column on mobile, 3 on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {featuresData.map((feature, index) => (
                        <motion.div
                            key={index}
                            className="text-center p-8 bg-brand-surface rounded-xl shadow-xl border-t-4 border-brand-accent"
                            initial="offscreen"
                            whileInView="onscreen"
                            viewport={{ once: true, amount: 0.5 }}
                            variants={cardVariants}
                        >
                            <div className="text-5xl mb-6 inline-block text-brand-accent">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-brand-light mb-3">{feature.title}</h3>
                            <p className="text-brand-muted">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pillars;