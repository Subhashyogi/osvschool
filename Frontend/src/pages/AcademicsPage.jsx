import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { academicPrograms } from '../constants';
import { FaCheck, FaGraduationCap, FaUsers, FaTrophy, FaBookOpen, FaLaptop, FaMicroscope, FaChartLine } from 'react-icons/fa';

const AcademicsPage = () => {
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    };

    return (
        <div className="bg-brand-light">
            {/* Hero Section */}
            <header className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100 text-center px-4">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-extrabold text-brand-dark mb-6"
                >
                    Academic Excellence
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mt-4 text-xl text-brand-muted max-w-4xl mx-auto leading-relaxed"
                >
                    Our comprehensive curriculum is designed to nurture every aspect of your child's development,
                    from academic excellence to creative expression and critical thinking skills.
                    Discover our four core academic streams that prepare students for success in the modern world.
                </motion.p>
            </header>

            {/* Academic Programs Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="space-y-16"
                    >
                        {academicPrograms.map((program, index) => {
                            const { icon: Icon } = program;
                            const isEven = index % 2 === 0;

                            return (
                                <motion.div
                                    key={program.title}
                                    variants={cardVariants}
                                    className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
                                >
                                    {/* Icon and Title Section */}
                                    <div className="lg:w-1/3 text-center lg:text-left">
                                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mb-6">
                                            <Icon className="text-4xl text-white" />
                                        </div>
                                        <h2 className="text-4xl font-bold text-brand-dark mb-4">{program.title}</h2>
                                        <p className="text-lg text-brand-muted leading-relaxed">{program.description}</p>

                                        {/* Department Head */}
                                        <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={program.departmentHead.image}
                                                    alt={program.departmentHead.name}
                                                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                                                />
                                                <div>
                                                    <p className="text-sm text-brand-muted">Department Head</p>
                                                    <p className="font-semibold text-lg text-brand-dark">{program.departmentHead.name}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detailed Subjects Section */}
                                    <div className="lg:w-2/3">
                                        <h3 className="text-2xl font-bold text-brand-dark mb-8 text-center lg:text-left">
                                            Core Subjects & Learning Outcomes
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {program.outcomes.map((outcome, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                                    className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300"
                                                >
                                                    <div className="flex items-start gap-4">
                                                        <div className="flex-shrink-0">
                                                            <FaCheck className="text-brand-accent text-xl mt-1" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-semibold text-brand-dark mb-2">
                                                                {outcome.split(':')[0]}
                                                            </h4>
                                                            <p className="text-brand-muted text-sm">
                                                                {outcome.split(':')[1] || outcome}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* Additional Features Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-brand-dark mb-6">Why Choose Our Academic Programs?</h2>
                        <p className="text-lg text-brand-muted max-w-3xl mx-auto">
                            Our comprehensive approach to education ensures that every student receives personalized attention
                            and develops the skills needed for future success.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: FaGraduationCap,
                                title: "Expert Faculty",
                                description: "Learn from experienced educators with advanced degrees and industry expertise."
                            },
                            {
                                icon: FaLaptop,
                                title: "Modern Facilities",
                                description: "State-of-the-art laboratories and technology-enhanced learning environments."
                            },
                            {
                                icon: FaUsers,
                                title: "Small Class Sizes",
                                description: "Personalized attention with optimal student-teacher ratios for better learning."
                            },
                            {
                                icon: FaTrophy,
                                title: "Proven Success",
                                description: "Consistent track record of students achieving top ranks in competitive exams."
                            }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-brand-accent to-brand-accent/80 rounded-full mb-6">
                                    <feature.icon className="text-2xl text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-brand-dark mb-4">{feature.title}</h3>
                                <p className="text-brand-muted">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-brand-dark text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl font-bold mb-6">Transform Your Future with Excellence</h2>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Join a legacy of academic excellence where every student discovers their potential.
                            Our proven track record of success, expert faculty, and comprehensive curriculum
                            prepare you for the challenges of tomorrow's world.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => navigate('/contact')}
                                className="bg-brand-accent text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-brand-accent/90 transition-colors shadow-lg hover:shadow-xl"
                            >
                                Start Your Journey Today
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AcademicsPage;