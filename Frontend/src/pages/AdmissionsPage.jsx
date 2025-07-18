import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalendarAlt, FaPencilAlt, FaCheckCircle, FaChevronDown, FaFileDownload } from 'react-icons/fa';
import AnimatedButton from '../components/common/AnimatedButton';
import { Link } from 'react-router-dom';

const timelineSteps = [
    { icon: <FaPencilAlt />, title: "Submit Application", description: "Begin by completing our comprehensive online application form. Ensure all required documents are uploaded before the deadline." },
    { icon: <FaCalendarAlt />, title: "Entrance Exam & Interview", description: "Qualified applicants will be invited for an entrance examination and a personal interview with our admissions committee." },
    { icon: <FaCheckCircle />, title: "Admission & Enrollment", description: "Successful candidates receive a formal admission offer. Complete the enrollment process to secure your place." },
];
const importantDates = [
    { date: "Oct 1, 2024", event: "Application Opens" },
    { date: "Jan 15, 2025", event: "Application Deadline" },
    { date: "Feb 10, 2025", event: "Entrance Exam Day" },
    { date: "Mar 1, 2025", event: "Decision Notification" },
];
const faqs = [
    { question: "What are the key admission requirements?", answer: "We require the completed application form, official transcripts, two letters of recommendation, and a personal essay. An entrance exam and interview are also part of the process." },
    { question: "Is there an application fee?", answer: "Yes, there is a non-refundable application fee of ₹5000 to cover administrative processing costs." },
    { question: "Do you offer scholarships or financial aid?", answer: "Yes, we offer a range of need-based financial aid and merit-based scholarships. Please visit our 'Financial Aid' section or contact the admissions office for details." },
];

const FAQItem = ({ faq }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-gray-200">
            <button onClick={() => setIsOpen(!isOpen)} className="flex justify-between items-center w-full py-5 text-left">
                <span className="text-lg font-medium text-brand-dark">{faq.question}</span>
                <FaChevronDown className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand-accent' : 'text-gray-500'}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="overflow-hidden">
                        <p className="pb-5 pr-4 text-brand-muted">{faq.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AdmissionsPage = () => {
    return (
        <div className="bg-brand-light text-brand-dark">
            <div className="relative pt-40 pb-24 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/8617830/pexels-photo-8617830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-brand-dark/70"></div>
                <div className="relative container mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-brand-light">Admissions</h1>
                    <p className="mt-4 text-lg md:text-xl text-brand-nav-muted max-w-3xl mx-auto">Your journey to excellence starts here. Discover our process and begin your application today.</p>
                </div>
            </div>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark">The Application Process</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        {timelineSteps.map((step, index) => (
                            <motion.div key={index} className="flex flex-col items-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6, delay: index * 0.2 }}>
                                <div className="bg-brand-accent text-brand-dark rounded-full p-6 text-4xl mb-4">{step.icon}</div>
                                <h3 className="text-xl font-bold text-brand-dark mb-2">Step {index + 1}: {step.title}</h3>
                                <p className="text-brand-muted">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark">Key Dates & Deadlines</h2>
                    <div className="max-w-2xl mx-auto">
                        <div className="border-l-4 border-brand-accent pl-8 space-y-8">
                            {importantDates.map((item, index) => (
                                <motion.div key={index} initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                    <p className="text-xl font-bold text-brand-accent">{item.date}</p>
                                    <p className="font-semibold text-lg text-brand-dark">{item.event}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <h2 className="text-4xl font-bold text-center mb-16 text-brand-dark">Frequently Asked Questions</h2>
                    <div className="space-y-2">
                        {faqs.map((faq, index) => <FAQItem key={index} faq={faq} />)}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-brand-surface text-brand-light">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">Ready to Join the Legacy?</h2>
                    <p className="max-w-2xl mx-auto text-brand-nav-muted mb-8">Our admissions team is here to help you every step of the way. Don't hesitate to reach out.</p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link to="/contact"><AnimatedButton>Contact Admissions</AnimatedButton></Link>
                        <a href="/application-form.pdf" target="_blank" rel="noopener noreferrer">
                            <AnimatedButton className="bg-brand-dark text-brand-light hover:bg-opacity-90 inline-flex items-center gap-2">
                                <FaFileDownload /> Download Form
                            </AnimatedButton>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AdmissionsPage;