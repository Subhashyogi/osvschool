import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { academicPrograms } from '../constants';
import { FaTimes, FaCheck, FaArrowRight } from 'react-icons/fa';

const ProgramModal = ({ program, onClose }) => {
    if (!program) return null;
    const { icon: Icon } = program;

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-nav/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="relative w-full max-w-2xl bg-brand-white rounded-2xl shadow-2xl p-8 md:p-12 text-brand-dark overflow-y-auto max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-brand-muted hover:text-brand-dark transition-colors"><FaTimes size={24} /></button>
                <div className="text-6xl text-brand-accent mb-4">{Icon && <Icon />}</div>
                <h2 className="text-3xl font-bold text-brand-dark mb-2">{program.title}</h2>
                <p className="text-brand-muted mb-6">{program.description}</p>
                <h4 className="font-bold mb-3 text-brand-dark">Key Learning Outcomes:</h4>
                <ul className="space-y-3 mb-8">
                    {program.outcomes.map((outcome, index) => (
                        <li key={index} className="flex items-start gap-3 text-brand-muted">
                            <FaCheck className="text-brand-accent flex-shrink-0 mt-1" />
                            <span>{outcome}</span>
                        </li>
                    ))}
                </ul>
                <div className="pt-6 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                        <img src={program.departmentHead.image} alt={program.departmentHead.name} className="w-16 h-16 rounded-full object-cover" />
                        <div>
                            <p className="text-sm text-brand-muted">Department Head</p>
                            <p className="font-semibold text-brand-dark">{program.departmentHead.name}</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const AcademicsPage = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedProgram, setSelectedProgram] = useState(null);

    return (
        <div className="bg-brand-light">
            <header className="pt-32 pb-16 bg-gray-50 text-center px-4">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-5xl font-extrabold text-brand-dark">Our Academic Programs</motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
                    A curriculum designed not just to educate, but to inspire. Find your passion and forge your future with us.
                </motion.p>
            </header>

            <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {academicPrograms.map((program, index) => {
                        const { icon: Icon } = program;
                        const isHovered = index === hoveredIndex;

                        return (
                            <motion.div
                                key={program.title}
                                className="relative p-8 bg-white rounded-2xl shadow-lg cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setSelectedProgram(program)}
                                layout
                            >
                                <motion.div className="text-5xl text-brand-accent mb-4" animate={{ scale: isHovered ? 1.1 : 1 }}>
                                    {Icon && <Icon />}
                                </motion.div>
                                <h3 className="text-xl font-bold text-brand-dark mb-2 h-14">{program.title}</h3>
                                <p className="text-sm text-brand-muted h-24">{program.description}</p>
                                <motion.div
                                    className="mt-4 font-semibold text-brand-accent flex items-center gap-2"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: isHovered ? 1 : 0 }}
                                >
                                    Learn More <FaArrowRight />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

            <AnimatePresence>
                {selectedProgram && <ProgramModal program={selectedProgram} onClose={() => setSelectedProgram(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default AcademicsPage;