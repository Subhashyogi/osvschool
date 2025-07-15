// src/components/sections/Hero.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import campusVideo from '../../assets/videos/campus-video.mp4';
import AnimatedButton from '../common/AnimatedButton';

const Hero = () => {
    return (
        <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
            <video
                autoPlay loop muted playsInline
                className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
            >
                <source src={campusVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            <div className="absolute z-10 inset-0 bg-brand-dark opacity-75"></div>

            <motion.div
                className="relative z-20 px-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
            >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight uppercase text-brand-light">
                    OSVSR SCHOOL
                </h1>
                <p className="mt-4 text-lg md:text-xl text-brand-muted max-w-2xl mx-auto">
                    A Tradition of Excellence, A Future of Innovation.
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link to="/admissions">
                        <AnimatedButton>Apply Now</AnimatedButton>
                    </Link>
                    <Link to="/about">
                        <AnimatedButton className="bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark-text">
                            Learn More
                        </AnimatedButton>
                    </Link>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;