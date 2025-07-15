// src/pages/FacultyPage.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from 'react-countup';
import { facultyMembers, principal, facultyStats, featuredFaculty } from '../constants/index';
import FacultyCard from '../components/common/FacultyCard';
import AnimatedButton from '../components/common/AnimatedButton';
import { FaFlask, FaPaintBrush, FaCalculator, FaChalkboardTeacher, FaSearch } from 'react-icons/fa';

const departments = [
    { name: 'All', icon: <FaChalkboardTeacher /> },
    { name: 'Science', icon: <FaFlask /> },
    { name: 'Arts & Humanities', icon: <FaPaintBrush /> },
    { name: 'Mathematics & CS', icon: <FaCalculator /> },
];

// Light Theme Stat Card
const StatCard = ({ number, suffix, label }) => (
    <div className="text-center p-4 bg-white rounded-lg shadow-md">
        <p className="text-4xl md:text-5xl font-bold text-brand-accent">
            <CountUp end={number} duration={3} enableScrollSpy scrollSpyOnce />
            {suffix}
        </p>
        <p className="mt-2 text-gray-600">{label}</p>
    </div>
);

const FacultyPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaculty = useMemo(() => {
        let faculty = facultyMembers;
        if (activeFilter !== 'All') { faculty = faculty.filter(member => member.department === activeFilter); }
        if (searchTerm) { faculty = faculty.filter(member => member.name.toLowerCase().includes(searchTerm.toLowerCase()) || member.title.toLowerCase().includes(searchTerm.toLowerCase())); }
        return faculty;
    }, [activeFilter, searchTerm]);

    return (
        <div className="bg-brand-light-bg text-brand-dark-text">
            {/* Dark Hero for Contrast */}
            <div className="relative pt-40 pb-24 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-brand-dark/80"></div>
                <div className="relative container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-brand-light">Our Faculty</h1>
                    <p className="mt-4 text-lg max-w-2xl mx-auto text-brand-muted">The heart of our institution—a dedicated team of mentors, innovators, and scholars.</p>
                </div>
            </div>

            {/* Light Theme Stats Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {facultyStats.map(stat => <StatCard key={stat.label} {...stat} />)}
                    </div>
                </div>
            </section>

            {/* Light Theme Spotlight Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12 text-brand-dark-text">Faculty Spotlight</h2>
                    <motion.div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 rounded-xl shadow-xl" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                        <img src={featuredFaculty.image} alt={featuredFaculty.name} className="w-48 h-48 rounded-full object-cover border-4 border-brand-accent flex-shrink-0" />
                        <div className="text-center md:text-left">
                            <h3 className="text-3xl font-bold text-brand-dark-text">{featuredFaculty.name}</h3>
                            <p className="text-xl text-brand-accent font-semibold mt-1">{featuredFaculty.title}</p>
                            <p className="mt-4 text-gray-600 leading-relaxed italic">"{featuredFaculty.quote}"</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Dark Theme Grid for visual break and to match dark cards */}
            <section className="py-24 bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-12 text-brand-light">Meet Our Educators</h2>
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
                        <div className="relative w-full md:w-1/3">
                            <FaSearch className="absolute top-1/2 left-4 -translate-y-1/2 text-brand-muted" />
                            <input type="text" placeholder="Search by name or title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-brand-surface border border-brand-surface/50 rounded-full text-brand-light focus:ring-2 focus:ring-brand-accent focus:outline-none placeholder:text-brand-muted/70" />
                        </div>
                        <div className="flex justify-center flex-wrap gap-x-2 gap-y-2 sm:gap-x-4">
                            {departments.map(department => (
                                <button key={department.name} onClick={() => setActiveFilter(department.name)} className={`flex items-center gap-2 px-4 py-2 text-md font-semibold rounded-full transition-colors duration-300 relative focus:outline-none ${activeFilter === department.name ? 'text-brand-light bg-brand-surface' : 'text-brand-muted hover:text-brand-light'}`}>
                                    {department.icon} <span>{department.name}</span>
                                    {activeFilter === department.name && (<motion.div className="absolute bottom-[-4px] left-2 right-2 h-0.5 bg-brand-accent" layoutId="faculty-underline-better" />)}
                                </button>
                            ))}
                        </div>
                    </div>
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence>
                            {filteredFaculty.length > 0 ? (filteredFaculty.map((member, index) => <FacultyCard key={member.name} member={member} index={index} />)) : (<p className="col-span-full text-center text-brand-muted py-12">No faculty members found.</p>)}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default FacultyPage;