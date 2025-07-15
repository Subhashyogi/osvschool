// src/components/sections/GalleryPreview.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { galleryItems } from '../../constants';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';

const GalleryPreview = () => {
    const previewItems = galleryItems.slice(0, 5);

    return (
        <section className="py-16 md:py-24 bg-brand-dark overflow-hidden"> {/* <-- THE FIX IS HERE */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-brand-light mb-4">A Look Inside</h2>
                <p className="text-lg text-brand-muted mb-12 max-w-2xl mx-auto">
                    From the classroom to the sports field, see what makes our campus special.
                </p>

                <div className="relative h-64 w-full max-w-4xl mx-auto mb-12">
                    {previewItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="absolute w-48 h-32 rounded-lg shadow-2xl overflow-hidden border-4 border-brand-surface"
                            initial={{ opacity: 0, scale: 0.5, rotate: (Math.random() - 0.5) * 30 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: (index - 2) * 5 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ delay: index * 0.1, type: 'spring', stiffness: 100 }}
                            style={{
                                left: `${10 + index * 15}%`,
                                top: `${20 + (index % 2) * 25}%`,
                                zIndex: index,
                            }}
                        >
                            <img src={item.thumbnail || item.poster} alt={item.alt} className="w-full h-full object-cover" />
                        </motion.div>
                    ))}
                </div>

                <Link to="/gallery">
                    <AnimatedButton>
                        Explore Full Gallery
                    </AnimatedButton>
                </Link>
            </div>
        </section>
    );
};

export default GalleryPreview;