import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';
import { achievers } from '../../constants';

const AchieverCard = ({ achiever, index, hoveredIndex, setHoveredIndex }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const isAnotherHovered = hoveredIndex !== null && hoveredIndex !== index;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative rounded-2xl overflow-hidden group"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: `radial-gradient(300px at ${mousePosition.x}px ${mousePosition.y}px, rgba(183, 183, 164, 0.2), transparent 80%)` }}
            />
            <div className={`relative bg-white/70 backdrop-blur-md border border-brand-accent/30 rounded-2xl p-6 text-center transition-all duration-300 ${isAnotherHovered ? 'opacity-60 scale-95' : 'opacity-100 scale-100'}`}>
                <img src={achiever.image} alt={achiever.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-brand-accent/50" />
                <h3 className="text-xl font-bold text-brand-dark">{achiever.name}</h3>
                <p className="text-brand-muted text-sm mb-4">{achiever.achievement}</p>
                <div className="bg-brand-accent/20 text-brand-dark font-semibold py-1 px-3 rounded-full inline-flex items-center gap-2">
                    <FaTrophy className="text-brand-accent" />
                    <span>{achiever.award}</span>
                </div>
            </div>
        </motion.div>
    );
};

const Achievers = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <section className="py-16 md:py-20 bg-gray-50" onMouseLeave={() => setHoveredIndex(null)}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Our Legacy of Achievement</h2>
                    <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
                        We celebrate the brilliant minds and talented individuals who have excelled on national and international stages.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {achievers.map((achiever, index) => (
                        <AchieverCard key={index} achiever={achiever} index={index} hoveredIndex={hoveredIndex} setHoveredIndex={setHoveredIndex} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievers;