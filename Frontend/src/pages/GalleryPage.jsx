// src/pages/GalleryPage.jsx
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaImage } from 'react-icons/fa';
import { galleryItems } from '../constants';

// Lightbox functionality for opening images and videos
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";

const filters = ['All', 'Photos', 'Videos'];

const GalleryPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const filteredItems = useMemo(() => {
        if (activeFilter === 'All') return galleryItems;
        if (activeFilter === 'Photos') return galleryItems.filter(item => item.type === 'image');
        if (activeFilter === 'Videos') return galleryItems.filter(item => item.type === 'video');
        return [];
    }, [activeFilter]);

    const openLightbox = (clickedItem) => {
        const originalIndex = galleryItems.findIndex(item => item.src === clickedItem.src || (item.sources && item.sources[0].src === clickedItem.sources[0].src));
        setLightboxIndex(originalIndex);
    };

    return (
        <div className="bg-brand-dark">
            {/* 1. Immersive Hero Header */}
            <div className="relative pt-40 pb-24 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1329295/pexels-photo-1329295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-brand-dark/80"></div>
                <div className="relative container mx-auto px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-extrabold text-brand-light"
                    >
                        Campus Gallery
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="mt-4 text-lg max-w-2xl mx-auto text-brand-muted"
                    >
                        Explore the moments that define the OSVSR experience.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* 2. Animated Filter Tabs */}
                <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mb-12">
                    {filters.map(filter => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-5 py-2 text-md font-semibold rounded-full transition-colors duration-300 relative focus:outline-none ${activeFilter === filter ? 'text-brand-light' : 'text-brand-muted hover:text-brand-light'
                                }`}
                        >
                            {filter}
                            {activeFilter === filter && (
                                <motion.div
                                    className="absolute bottom-[-4px] left-0 right-0 h-1 bg-brand-accent rounded-full"
                                    layoutId="underline"
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* 3. Dynamic Masonry-Style Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] sm:auto-rows-[250px] gap-4"
                >
                    <AnimatePresence>
                        {filteredItems.map((item) => (
                            <motion.div
                                key={item.src || item.sources[0].src}
                                layout
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                // 4. Enhanced Interactive Hover Effects
                                className={`group relative cursor-pointer overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-brand-accent/30 hover:-translate-y-1 hover:ring-4 hover:ring-brand-accent ${item.span || ''}`}
                                onClick={() => openLightbox(item)}
                            >
                                <img
                                    src={item.thumbnail || item.poster}
                                    alt={item.alt}
                                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-brand-light opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <div className="text-2xl sm:text-4xl mb-2">
                                        {item.type === 'video' ? <FaPlay /> : <FaImage />}
                                    </div>
                                    <p className="font-bold text-center text-xs sm:text-sm">{item.alt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* 5. Robust Lightbox (No changes needed here, it already works!) */}
            <Lightbox
                plugins={[Video]}
                open={lightboxIndex >= 0}
                index={lightboxIndex}
                close={() => setLightboxIndex(-1)}
                slides={galleryItems}
                styles={{ container: { backgroundColor: "rgba(33, 37, 41, .95)" } }}
            />
        </div>
    );
};

export default GalleryPage;