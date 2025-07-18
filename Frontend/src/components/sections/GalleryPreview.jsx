import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems } from '../../constants';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';
import { FaArrowRight } from 'react-icons/fa';

const GalleryPreview = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const featuredItem = galleryItems[activeIndex];

    const heroVariants = {
        enter: { opacity: 0, scale: 0.95, y: 10 },
        center: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } },
        exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] } },
    };

    return (
        <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
            <div className="absolute inset-0 bg-repeat opacity-5" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b7b7a4' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">A Glimpse Into Our World</h2>
                    <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">From the classroom to the sports field, see the moments that define our vibrant campus life.</p>
                </div>
                <div className="relative max-w-4xl mx-auto">
                    <div className="relative h-64 md:h-96 w-full rounded-2xl shadow-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeIndex}
                                src={featuredItem.thumbnail || featuredItem.poster}
                                alt={featuredItem.alt}
                                variants={heroVariants} initial="enter" animate="center" exit="exit"
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                            <motion.div
                                key={activeIndex + '-text'}
                                className="absolute bottom-0 left-0 p-6"
                                variants={heroVariants} initial="enter" animate="center" exit="exit"
                            >
                                <h3 className="text-xl font-bold text-brand-nav-text">{featuredItem.alt}</h3>
                            </motion.div>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-center items-center gap-2 md:gap-4">
                        {galleryItems.slice(0, 5).map((item, index) => { // Show first 5 for preview
                            const isActive = index === activeIndex;
                            return (
                                <motion.div
                                    key={item.src || item.sources[0].src}
                                    className="cursor-pointer"
                                    onClick={() => setActiveIndex(index)}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <img src={item.thumbnail || item.poster} alt={item.alt}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 transition-all duration-300 ${isActive ? 'border-brand-accent scale-110' : 'border-white/50 opacity-60 hover:opacity-100'}`}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
                <div className="text-center mt-12">
                    <Link to="/gallery">
                        <AnimatedButton className="inline-flex items-center gap-2">
                            <span>Explore Full Gallery</span>
                            <FaArrowRight />
                        </AnimatedButton>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GalleryPreview;