// src/pages/AdmissionsPage.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaPencilAlt, FaCheckCircle } from 'react-icons/fa';
import AnimatedButton from '../components/common/AnimatedButton';
import { Link } from 'react-router-dom';

const steps = [
    { icon: <FaPencilAlt />, title: "Submit Application", description: "Complete our online form and submit required documents before the deadline." },
    { icon: <FaCalendarAlt />, title: "Schedule Entrance Exam", description: "Qualified applicants will be invited for our entrance examination to assess academic readiness." },
    { icon: <FaCheckCircle />, title: "Admission & Enrollment", description: "Successful candidates receive an admission offer. Complete enrollment to secure your place." },
];

const AdmissionsPage = () => {
    return (
        <div>
            <div className="pt-32 pb-20 bg-brand-surface text-center">
                <h1 className="text-5xl font-extrabold text-brand-light">Admissions</h1>
                <p className="mt-4 text-lg text-brand-muted">Begin your journey to becoming an OSVSR leader.</p>
            </div>

            <section className="py-24 container mx-auto px-4 bg-brand-light-bg text-brand-dark-text">
                <h2 className="text-4xl font-bold text-center mb-16">How to Apply</h2>
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center p-6"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="p-6 bg-brand-accent/10 rounded-full mb-4 ring-2 ring-brand-accent/20">
                                <div className="text-4xl text-brand-accent">{step.icon}</div>
                            </div>
                            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600">{step.description}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            <section className="py-24 bg-brand-surface">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-brand-light mb-4">Ready to Apply?</h2>
                    <p className="max-w-2xl mx-auto text-brand-muted mb-8">
                        Our admissions team is here to help you every step of the way. If you have any questions, please don't hesitate to reach out.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact">
                            <AnimatedButton>Contact Admissions</AnimatedButton>
                        </Link>
                        <a href="/application-form.pdf" target="_blank" rel="noopener noreferrer">
                            <AnimatedButton className="bg-brand-light text-brand-dark hover:bg-brand-light/90">Download Form</AnimatedButton>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdmissionsPage;