// // src/components/sections/GalleryPreview.jsx
// import React from 'react';
// import { motion } from 'framer-motion';
// import { galleryItems } from '../../constants';
// import { Link } from 'react-router-dom';
// import AnimatedButton from '../common/AnimatedButton';
// import './Marquee.css'; // Import our new CSS file

// const GalleryPreview = () => {
//     // To create a seamless loop, we need to duplicate the gallery items.
//     const loopedItems = [...galleryItems, ...galleryItems];

//     return (
//         <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="text-center mb-12 md:mb-16">
//                     <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">A Glimpse Into Our World</h2>
//                     <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
//                         From the classroom to the sports field, see the moments that define our vibrant campus life.
//                     </p>
//                 </div>

//                 {/* The main container for the cinematic marquee */}
//                 <div className="relative marquee-container">
//                     {/* The scrolling content flexbox */}
//                     <div className="flex gap-6 marquee-content">
//                         {loopedItems.map((item, index) => (
//                             <div
//                                 key={`${item.src || item.sources[0].src}-${index}`}
//                                 className="flex-shrink-0 w-auto rounded-2xl shadow-lg overflow-hidden"
//                             >
//                                 <img
//                                     src={item.thumbnail || item.poster}
//                                     alt={item.alt}
//                                     className="h-48 md:h-64 w-auto object-cover transition-transform duration-300 hover:scale-105"
//                                 />
//                             </div>
//                         ))}
//                     </div>

//                     {/* Gradient fade on the left edge */}
//                     <div className="absolute inset-y-0 left-0 w-16 md:w-24 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
//                     {/* Gradient fade on the right edge */}
//                     <div className="absolute inset-y-0 right-0 w-16 md:w-24 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
//                 </div>

//                 {/* Call to action button */}
//                 <div className="text-center mt-12">
//                     <Link to="/gallery">
//                         <AnimatedButton>
//                             Explore Full Gallery
//                         </AnimatedButton>
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default GalleryPreview;

// src/components/sections/GalleryPreview.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryItems } from '../../constants';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';
import { FaArrowRight } from 'react-icons/fa';

const GalleryPreview = () => {
    // State to track which image is currently featured
    const [activeIndex, setActiveIndex] = useState(0);
    const featuredItem = galleryItems[activeIndex];

    // Animation variants for the main featured image and text
    const heroVariants = {
        enter: { opacity: 0, scale: 0.95, y: 10 },
        center: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } },
        exit: { opacity: 0, scale: 0.95, y: -10, transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] } },
    };

    return (
        <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
            {/* Subtle background pattern for texture */}
            <div
                className="absolute inset-0 bg-repeat opacity-5"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b7b7a4' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}
            ></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">A Glimpse Into Our World</h2>
                    <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
                        From the classroom to the sports field, see the moments that define our vibrant campus life.
                    </p>
                </div>

                {/* Main container for the hero image and thumbnails */}
                <div className="relative max-w-4xl mx-auto">
                    {/* Hero Image Display */}
                    <div className="relative h-64 md:h-96 w-full rounded-2xl shadow-2xl overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={activeIndex} // Crucial for AnimatePresence to detect change
                                src={featuredItem.thumbnail || featuredItem.poster}
                                alt={featuredItem.alt}
                                variants={heroVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                className="w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        {/* Text Overlay for the hero image */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
                            <motion.div
                                key={activeIndex + '-text'} // Also key the text to animate it
                                className="absolute bottom-0 left-0 p-6"
                                variants={heroVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                            >
                                <h3 className="text-xl font-bold text-brand-nav-text">{featuredItem.alt}</h3>
                            </motion.div>
                        </div>
                    </div>

                    {/* Thumbnail Arc Selector */}
                    <div className="mt-8 flex justify-center items-center gap-2 md:gap-4">
                        {galleryItems.map((item, index) => {
                            const isActive = index === activeIndex;
                            return (
                                <motion.div
                                    key={item.src || item.sources[0].src}
                                    className="cursor-pointer"
                                    onClick={() => setActiveIndex(index)}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    <img
                                        src={item.thumbnail || item.poster}
                                        alt={item.alt}
                                        className={`
                                            w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4
                                            transition-all duration-300
                                            ${isActive
                                                ? 'border-brand-accent scale-110'
                                                : 'border-white/50 opacity-60 hover:opacity-100'
                                            }
                                        `}
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Call to action button */}
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



// // src/components/sections/GalleryPreview.jsx
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { galleryItems } from '../../constants';
// import { Link } from 'react-router-dom';
// import AnimatedButton from '../common/AnimatedButton';
// import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';

// // Animation variants for the map view's container
// const mapContainerVariants = {
//     enter: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
//     exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
// };

// // Animation variants for the location detail view
// const detailVariants = {
//     enter: { opacity: 1, scale: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2, duration: 0.5, ease: 'easeOut' } },
//     exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4, ease: 'easeIn' } },
// };

// const fadeIn = {
//     enter: { opacity: 0, y: 10 },
//     center: { opacity: 1, y: 0 },
// };

// const GalleryPreview = () => {
//     // State to track the selected location. `null` means the map is showing.
//     const [selectedLocation, setSelectedLocation] = useState(null);

//     return (
//         <section className="py-16 md:py-24 bg-gray-50">
//             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="text-center mb-12 md:mb-16">
//                     <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Explore Our Campus</h2>
//                     <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
//                         Click on a location to take a closer look at the places where our students learn, create, and grow.
//                     </p>
//                 </div>

//                 <div className="relative w-full max-w-4xl mx-auto h-[400px] md:h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200">
//                     <AnimatePresence mode="wait">
//                         {selectedLocation === null ? (
//                             // --- The Map View ---
//                             <motion.div
//                                 key="map"
//                                 variants={mapContainerVariants}
//                                 initial="enter"
//                                 animate="enter"
//                                 exit="exit"
//                                 className="w-full h-full relative"
//                             >
//                                 {/* Stylized map background */}
//                                 <div className="absolute inset-0 bg-repeat opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-4c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' id='path_1' fill='%23b7b7a4' fill-rule='evenodd'/%3E%3C/svg%3E")`}}></div>

//                                 {galleryItems.map((item, index) => (
//                                     <motion.div
//                                         key={index}
//                                         className="absolute group"
//                                         style={{ top: item.position.top, left: item.position.left, transform: 'translate(-50%, -50%)' }}
//                                         whileHover={{ scale: 1.1 }}
//                                         onClick={() => setSelectedLocation(item)}
//                                     >
//                                         <div className="relative flex flex-col items-center cursor-pointer">
//                                             <div className="absolute -bottom-2 w-4 h-4 bg-brand-accent/30 rounded-full animate-ping"></div>
//                                             <FaMapMarkerAlt className="text-4xl text-brand-accent drop-shadow-lg" />
//                                             <span className="mt-2 text-xs font-bold text-brand-dark bg-white/70 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.alt}</span>
//                                         </div>
//                                     </motion.div>
//                                 ))}
//                             </motion.div>
//                         ) : (
//                             // --- The Location Detail View ---
//                             <motion.div
//                                 key="detail"
//                                 variants={detailVariants}
//                                 initial="enter"
//                                 animate="enter"
//                                 exit="exit"
//                                 className="w-full h-full relative grid grid-cols-1 md:grid-cols-2 overflow-hidden"
//                             >
//                                 <motion.div variants={fadeIn} className="relative h-full w-full">
//                                     <img src={selectedLocation.src || selectedLocation.poster} alt={selectedLocation.alt} className="w-full h-full object-cover"/>
//                                 </motion.div>
//                                 <div className="relative flex flex-col justify-center p-8 md:p-12">
//                                     <motion.h3 variants={fadeIn} className="text-2xl md:text-3xl font-bold text-brand-dark">{selectedLocation.alt}</motion.h3>
//                                     <motion.p variants={fadeIn} className="mt-4 text-brand-muted">{selectedLocation.description}</motion.p>
//                                 </div>
//                                 <button
//                                     onClick={() => setSelectedLocation(null)}
//                                     className="absolute top-4 right-4 z-20 bg-white/70 backdrop-blur-sm p-3 rounded-full shadow-md hover:bg-white"
//                                 >
//                                     <FaTimes />
//                                 </button>
//                             </motion.div>
//                         )}
//                     </AnimatePresence>
//                 </div>
                
//                 <div className="text-center mt-12">
//                     <Link to="/gallery">
//                         <AnimatedButton>
//                             View All Moments in the Full Gallery
//                         </AnimatedButton>
//                     </Link>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default GalleryPreview;
