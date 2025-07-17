// src/components/sections/Hero.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';
import { FaBook, FaPalette, FaRunning } from 'react-icons/fa'; // Using appropriate icons
import campusVideo from '../../assets/videos/campus-video.mp4';

// --- Data for the Content Modules (Updated for a School Context) ---
const contentModules = [
    { icon: <FaBook />, title: "Academics", description: "Fostering intellectual curiosity." },
    { icon: <FaPalette />, title: "The Arts", description: "Unleashing creativity and expression." },
    { icon: <FaRunning />, title: "Athletics", description: "Building character and discipline." },
];

const Hero = () => {
    const controls = useAnimation();

    // Main animation sequence controller
    useEffect(() => {
        // This function starts the animations in a sequence
        const sequence = async () => {
            await controls.start("titleVisible");
            await controls.start("taglineVisible");
            await controls.start("modulesVisible");
            await controls.start("buttonsVisible");
        };
        sequence();
    }, [controls]);

    // --- Simplified Animation Variants ---
    const titleVariants = {
        hidden: { opacity: 0 },
        titleVisible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.2 },
        },
    };
    const letterVariants = {
        hidden: { opacity: 0, y: 30 },
        titleVisible: {
            opacity: 1,
            y: 0,
            transition: { type: 'spring', stiffness: 120, damping: 14 },
        },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        taglineVisible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        modulesVisible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
        buttonsVisible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
    };

    const title = "OSVSR SCHOOL";

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Layer 1: The video background */}
            <div className="absolute inset-0 z-0">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src={campusVideo} type="video/mp4" />
                </video>
                {/* Soft overlay for text readability */}
                <div className="absolute inset-0 bg-brand-dark/60"></div>
            </div>

            {/* Layer 2: The UI Content */}
            <div className="relative z-10 flex flex-col items-center px-4 text-center">
                {/* Title Animation */}
                <motion.h1
                    variants={titleVariants}
                    initial="hidden"
                    animate={controls}
                    className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight uppercase text-brand-light"
                    aria-label={title}
                >
                    {title.split('').map((char, index) => (
                        <motion.span key={index} variants={letterVariants} className="inline-block" style={{ textShadow: `0 3px 15px rgba(0,0,0,0.5)` }}>
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Tagline Animation */}
                <motion.p
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    className="mt-4 text-lg md:text-xl text-brand-muted max-w-3xl"
                >
                    A Tradition of Excellence, A Future of Innovation.
                </motion.p>

                {/* Content Module Cards */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mt-12"
                >
                    {contentModules.map((mod) => (
                        <div key={mod.title} className="bg-brand-surface/50 backdrop-blur-md p-6 rounded-lg text-center border border-brand-accent/20">
                            <div className="text-4xl text-brand-accent mx-auto mb-3">{mod.icon}</div>
                            <h3 className="text-xl font-bold text-brand-light">{mod.title}</h3>
                            <p className="text-sm text-brand-muted mt-1">{mod.description}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Final Call to Action Buttons */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link to="/admissions">
                        <AnimatedButton>Begin Your Application</AnimatedButton>
                    </Link>
                    <Link to="/gallery">
                        <AnimatedButton className="bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark-text">
                            Explore Our Campus
                        </AnimatedButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;