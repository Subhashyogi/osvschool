// src/pages/AcademicsPage.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { academicPrograms } from '../constants';

const categories = ['All', 'Science', 'Arts', 'Humanities'];

const AcademicsPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const filteredPrograms = useMemo(() => {
        if (activeFilter === 'All') return academicPrograms;
        return academicPrograms.filter(p => p.category === activeFilter);
    }, [activeFilter]);

    return (
        <div className="bg-brand-light-bg text-brand-dark-text">
            <div className="pt-32 pb-16 bg-brand-surface text-center">
                <h1 className="text-5xl font-extrabold text-brand-light">Academic Programs</h1>
                <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
                    Find your passion and shape your future with our diverse range of expert-led programs.
                </p>
            </div>

            <div className="container mx-auto px-4 py-16">
                <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveFilter(category)}
                            className={`px-5 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${activeFilter === category
                                ? 'bg-brand-accent text-brand-dark-text'
                                : 'bg-gray-200 text-brand-dark-text hover:bg-gray-300'
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {filteredPrograms.map(program => {
                            const IconComponent = program.icon;
                            return (
                                <motion.div
                                    key={program.title}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                                >
                                    <div className="p-8 text-center">
                                        <div className="inline-block p-4 bg-brand-accent/10 rounded-full mb-4">
                                            <div className="text-4xl text-brand-accent"><IconComponent /></div>
                                        </div>
                                        <h3 className="text-2xl font-bold text-brand-dark-text mb-2">{program.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{program.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

export default AcademicsPage;