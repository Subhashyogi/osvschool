import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaImage } from 'react-icons/fa';
import { galleryItems } from '../constants';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";

const filters = ['All', 'Photos', 'Videos'];

const GalleryPage = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxIndex, setLightboxIndex] = useState(-1);

    const filteredItems = useMemo(() => {
        if (activeFilter === 'All') return galleryItems;
        const type = activeFilter === 'Photos' ? 'image' : 'video';
        return galleryItems.filter(item => item.type === type);
    }, [activeFilter]);

    const openLightbox = (clickedItem) => {
        const originalIndex = galleryItems.findIndex(item => item.src === clickedItem.src || (item.sources && clickedItem.sources && item.sources[0].src === clickedItem.sources[0].src));
        if (originalIndex > -1) setLightboxIndex(originalIndex);
    };

    return (
        <div className="bg-brand-light">
            <div className="relative pt-32 md:pt-40 pb-20 md:pb-24 text-center bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}>
                <div className="absolute inset-0 bg-brand-dark/80"></div>
                <div className="relative container mx-auto px-4">
                    <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-5xl font-extrabold text-brand-light">
                        Campus Gallery
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-brand-nav-muted">
                        Explore the moments that define the OSVSR experience.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
                <div className="flex justify-center flex-wrap gap-3 md:gap-6 mb-12">
                    {filters.map(filter => (
                        <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-5 py-2 text-sm md:text-md font-semibold rounded-full transition-colors duration-300 relative focus:outline-none ${activeFilter === filter ? 'text-brand-dark' : 'text-brand-muted hover:text-brand-dark'}`}>
                            {filter}
                            {activeFilter === filter && (<motion.div className="absolute bottom-[-4px] left-0 right-0 h-1 bg-brand-accent rounded-full" layoutId="gallery-underline" />)}
                        </button>
                    ))}
                </div>

                <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4">
                    <AnimatePresence>
                        {filteredItems.map((item, index) => (
                            <motion.div key={item.src || item.sources[0].src || index} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, ease: 'easeInOut' }} className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-w-4 aspect-h-3" onClick={() => openLightbox(item)}>
                                <img src={item.thumbnail || item.poster} alt={item.alt} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-brand-light opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                    <div className="text-2xl sm:text-4xl mb-2">{item.type === 'video' ? <FaPlay /> : <FaImage />}</div>
                                    <p className="font-bold text-center text-xs sm:text-sm">{item.alt}</p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <Lightbox plugins={[Video]} open={lightboxIndex >= 0} index={lightboxIndex} close={() => setLightboxIndex(-1)} slides={galleryItems} styles={{ container: { backgroundColor: "rgba(33, 37, 41, .95)" } }} />
        </div>
    );
};

export default GalleryPage;