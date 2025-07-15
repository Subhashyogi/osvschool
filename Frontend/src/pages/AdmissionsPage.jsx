// src/pages/AdmissionsPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaPencilAlt, FaCheckCircle, FaChevronDown } from 'react-icons/fa';
import AnimatedButton from '../components/common/AnimatedButton';
import { Link } from 'react-router-dom';

// --- Data remains the same ---
const timelineSteps = [
    { icon: <FaPencilAlt />, title: "Step 1: Submit Application", description: "Begin by completing our comprehensive online application form. Ensure all required documents are uploaded before the deadline." },
    { icon: <FaCalendarAlt />, title: "Step 2: Entrance Exam & Interview", description: "Qualified applicants will be invited for an entrance examination and a personal interview with our admissions committee." },
    { icon: <FaCheckCircle />, title: "Step 3: Admission & Enrollment", description: "Successful candidates receive a formal admission offer. Complete the enrollment process to secure your place." },
];
const importantDates = [
    { date: "Oct 1, 2023", event: "Application Opens" },
    { date: "Jan 15, 2024", event: "Application Deadline" },
    { date: "Feb 10, 2024", event: "Entrance Exam Day" },
    { date: "Mar 1, 2024", event: "Decision Notification" },
];
const faqs = [
    { question: "What are the key admission requirements?", answer: "We require the completed application form, official transcripts, two letters of recommendation, and a personal essay. An entrance exam and interview are also part of the process." },
    { question: "Is there an application fee?", answer: "Yes, there is a non-refundable application fee of $75 to cover administrative processing costs." },
    { question: "Do you offer scholarships or financial aid?", answer: "Yes, we offer a range of need-based financial aid and merit-based scholarships. Please visit our 'Financial Aid' section for details." },
    { question: "When can we tour the campus?", answer: "We offer guided campus tours on Tuesdays and Thursdays. Please schedule your visit through our online portal." },
];

// --- FAQ Component (Light Theme) ---
const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-5 text-left">
                <span className="text-lg font-medium text-brand-dark-text">{faq.question}</span>
                <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-accent' : 'text-gray-500'}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <p className="pb-5 pr-4 text-gray-600">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// --- Main Admissions Page (Light Theme) ---
const AdmissionsPage = () => {
    return (
        <div className="bg-brand-light-bg text-brand-dark-text">
            {/* Dark Hero Section for Contrast */}
            <div className="relative pt-40 pb-24 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1722183/pexels-photo-1722183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-brand-dark/80"></div>
                <div className="relative container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-brand-light">Admissions</h1>
                    <p className="mt-4 text-lg md:text-xl text-brand-muted max-w-3xl mx-auto">Your journey to excellence starts here. Discover our process and begin your application today.</p>
                </div>
            </div>

            {/* Light Theme Timeline */}
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark-text">The Application Process</h2>
                    <div className="relative max-w-3xl mx-auto">
                        <div className="absolute left-1/2 top-2 h-full w-0.5 bg-gray-200 -translate-x-1/2"></div>
                        {timelineSteps.map((step, index) => (
                            <motion.div key={index} className="relative mb-16" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: index * 0.2 }}>
                                <div className="absolute left-1/2 top-2 w-8 h-8 bg-brand-accent rounded-full border-4 border-brand-light-bg -translate-x-1/2 flex items-center justify-center text-brand-dark-text font-bold">{index + 1}</div>
                                <div className={`p-6 rounded-lg shadow-lg ml-auto w-full md:w-[45%] ${index % 2 === 0 ? 'md:mr-[55%]' : 'md:ml-[55%]'} bg-white border-l-4 border-brand-accent`}>
                                    <h3 className="text-xl font-bold text-brand-dark-text mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Light Theme Dates Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark-text">Key Dates & Deadlines</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {importantDates.map((item, index) => (
                            <motion.div key={index} className="bg-brand-light-bg p-6 rounded-lg text-center border-t-4 border-brand-accent/50 transition-all duration-300 hover:border-brand-accent hover:-translate-y-2 hover:shadow-xl" initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <p className="text-2xl font-bold text-brand-accent">{item.date}</p>
                                <p className="mt-2 text-brand-dark-text">{item.event}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Light Theme FAQ Section */}
            <section className="py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark-text">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        {faqs.map((faq, index) => <FAQItem key={index} faq={faq} />)}
                    </div>
                </div>
            </section>

            {/* Final CTA with Dark BG */}
            <section className="py-24 bg-brand-surface">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-brand-light mb-4">Ready to Join the Legacy?</h2>
                    <p className="max-w-2xl mx-auto text-brand-muted mb-8">Our admissions team is here to help you every step of the way. Don't hesitate to reach out.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"><AnimatedButton>Contact Admissions</AnimatedButton></Link>
                        <a href="/application-form.pdf" target="_blank" rel="noopener noreferrer"><AnimatedButton className="bg-brand-dark text-brand-light hover:bg-brand-dark/90">Download Form</AnimatedButton></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdmissionsPage;