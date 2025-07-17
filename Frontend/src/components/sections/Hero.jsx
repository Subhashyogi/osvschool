// src/components/sections/Hero.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';
import { FaBook, FaPalette, FaRunning } from 'react-icons/fa';
import campusVideo from '../../assets/videos/campus-video.mp4';

const contentModules = [
    { icon: <FaBook />, title: "Academics", description: "Fostering intellectual curiosity." },
    { icon: <FaPalette />, title: "The Arts", description: "Unleashing creativity and expression." },
    { icon: <FaRunning />, title: "Athletics", description: "Building character and discipline." },
];

const Hero = () => {
    const controls = useAnimation();

    useEffect(() => {
        const sequence = async () => {
            await controls.start("titleVisible");
            await controls.start("taglineVisible");
            await controls.start("modulesVisible");
            await controls.start("buttonsVisible");
        };
        sequence();
    }, [controls]);

    const titleVariants = {
        hidden: { opacity: 0 },
        titleVisible: {
            opacity: 1,
            transition: { staggerChildren: 0.05, delayChildren: 0.2 },
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
        <section className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden bg-brand-dark">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video autoPlay loop muted playsInline className="w-full h-full object-cover object-center">
                    <source src={campusVideo} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-brand-dark/60"></div>
            </div>

            {/* Foreground Content */}
            <div className="relative z-10 flex flex-col items-center  p-4 sm:px-6 lg:px-8 text-center max-w-2xl w-full mx-auto">
                {/* Animated Title */}
                <motion.h1
                    variants={titleVariants}
                    initial="hidden"
                    animate={controls}
                    className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight uppercase text-brand-light"
                    aria-label={title}
                >
                    {title.split('').map((char, index) => (
                        <motion.span
                            key={index}
                            variants={letterVariants}
                            className="inline-block"
                            style={{ textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </motion.span>
                    ))}
                </motion.h1>

                {/* Tagline */}
                <motion.p
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    className="mt-2 text-sm sm:text-base md:text-lg text-brand-muted max-w-sm sm:max-w-xl"
                >
                    A Tradition of Excellence, A Future of Innovation.
                </motion.p>

                {/* Content Modules */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl w-full mt-8 px-2"
                >
                    {contentModules.map((mod) => (
                        <div
                            key={mod.title}
                            className="bg-brand-surface/50 backdrop-blur-md p-4 sm:p-6 rounded-lg text-center border border-brand-accent/20"
                        >
                            <div className="text-3xl sm:text-4xl text-brand-accent mx-auto mb-2">{mod.icon}</div>
                            <h3 className="text-lg sm:text-xl font-semibold text-brand-light">{mod.title}</h3>
                            <p className="text-xs sm:text-sm text-brand-muted mt-1">{mod.description}</p>
                        </div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate={controls}
                    className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full px-4"
                >
                    <Link to="/admissions" className="w-full sm:w-auto">
                        <AnimatedButton className="w-full sm:w-auto text-sm sm:text-base">Begin Your Application</AnimatedButton>
                    </Link>
                    <Link to="/gallery" className="w-full sm:w-auto">
                        <AnimatedButton className="bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark-text w-full sm:w-auto text-sm sm:text-base">
                            Explore Our Campus
                        </AnimatedButton>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
