import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../../constants';

const Testimonials = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const featuredTestimonial = testimonials[activeIndex];

    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
    };

    // --- NEW: Dynamically determine the classes for the scrollable container ---
    const selectorContainerClasses = testimonials.length > 3
        ? "space-y-4 lg:max-h-[400px] lg:overflow-y-auto scrollbar-hide lg:pr-4"
        : "space-y-4";

    return (
        <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Voices of Our Community</h2>
                    <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">Hear directly from students, parents, and alumni about their transformative experiences.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
                    {/* --- Left Column (Featured Testimonial) - Unchanged --- */}
                    <div className="lg:col-span-2 relative min-h-[400px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeIndex}
                                className="relative flex flex-col md:flex-row items-center gap-8 bg-brand-white p-8 rounded-2xl shadow-xl"
                                variants={contentVariants} initial="hidden" animate="visible" exit="exit"
                            >
                                <FaQuoteLeft className="absolute top-8 left-8 text-8xl text-gray-100 -z-0" />
                                <div className="relative z-10 flex-shrink-0">
                                    <img src={featuredTestimonial.avatar} alt={featuredTestimonial.name} className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white" />
                                </div>
                                <div className="relative z-10 text-center md:text-left">
                                    <p className="text-xl italic text-brand-muted mb-4">"{featuredTestimonial.quote}"</p>
                                    <h4 className="font-bold text-2xl text-brand-dark">{featuredTestimonial.name}</h4>
                                    <p className="text-brand-accent font-semibold">{featuredTestimonial.title}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* --- Right Column (Selector List) - THE FIX IS APPLIED HERE --- */}
                    <div className="lg:col-span-1">
                        <div className={selectorContainerClasses}>
                            {testimonials.map((testimonial, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <motion.div
                                        key={testimonial.name}
                                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${isActive ? 'bg-white border-brand-accent shadow-lg' : 'bg-white/70 border-transparent hover:bg-white hover:shadow-md'}`}
                                        onClick={() => setActiveIndex(index)}
                                        whileHover={{ scale: isActive ? 1 : 1.03 }}
                                    >
                                        <img src={testimonial.avatar} alt={testimonial.name} className={`w-12 h-12 rounded-full transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                                        <div>
                                            <h5 className="font-bold text-brand-dark">{testimonial.name}</h5>
                                            <p className="text-sm text-brand-muted">{testimonial.title}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;