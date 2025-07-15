// src/components/sections/Hero.jsx
import React, { useEffect } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';
import { FaMicrochip, FaUsers, FaTrophy } from 'react-icons/fa';
import campusVideo from '../../assets/videos/campus-video.mp4';

// --- Data for the Blueprint Modules ---
const blueprintModules = [
    { icon: <FaMicrochip />, title: "Innovation", description: "Cutting-edge curriculum and technology." },
    { icon: <FaUsers />, title: "Community", description: "A supportive and collaborative network." },
    { icon: <FaTrophy />, title: "Excellence", description: "A legacy of achievement and success." },
];

const Hero = () => {
    const controls = useAnimation();
    const { scrollYProgress } = useScroll();
    const contentY = useTransform(scrollYProgress, [0, 0.1], ['0%', '-50%']); // Parallax for content

    // Main animation sequence controller
    useEffect(() => {
        controls.start("visible");
    }, [controls]);

    // Animation Variants
    const oculusVariants = {
        hidden: { '--mask-size': '0px' },
        visible: { '--mask-size': '200vmax', transition: { duration: 2, ease: [0.6, 0.01, -0.05, 0.9] } },
    };
    const svgVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: { pathLength: 1, opacity: 0.3, transition: { duration: 2, ease: "easeInOut", delay: 1 } },
    };
    const textContainerVariants = {
        hidden: {},
        visible: { transition: { staggerChildren: 0.1, delayChildren: 1.5 } },
    };
    const letterVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } },
    };
    const moduleVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 2.5 } },
    };

    const title = "OSVSR SCHOOL";

    return (
        <section className="relative h-screen overflow-hidden bg-brand-dark">
            {/* Layer 1: The video, which will be revealed by the mask */}
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
                <source src={campusVideo} type="video/mp4" />
            </video>

            {/* Layer 2: The Oculus Mask & Blueprint Overlay */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{
                    backgroundColor: '#212529', // brand-dark
                    maskImage: 'radial-gradient(circle at center, transparent 0%, black var(--mask-size))',
                    WebkitMaskImage: 'radial-gradient(circle at center, transparent 0%, black var(--mask-size))',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                }}
                initial="hidden"
                animate={controls}
                variants={oculusVariants}
            >
                {/* Background Grid on the overlay */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#c79a3b 1px, transparent 1px), linear-gradient(90deg, #c79a3b 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                {/* Animated SVG Lines */}
                <motion.svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" variants={svgVariants}>
                    <path d="M 50 50 L 25 80" stroke="#c79a3b" strokeWidth="0.2" />
                    <path d="M 50 50 L 50 80" stroke="#c79a3b" strokeWidth="0.2" />
                    <path d="M 50 50 L 75 80" stroke="#c79a3b" strokeWidth="0.2" />
                </motion.svg>
            </motion.div>

            {/* Layer 3: The UI Content */}
            <motion.div
                style={{ y: contentY }}
                className="relative z-20 flex items-center justify-center h-full"
            >
                <div className="flex flex-col items-center px-4 text-center">
                    {/* Precision Title Animation */}
                    <motion.h1 variants={textContainerVariants} initial="hidden" animate={controls} className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-widest uppercase text-brand-light" aria-label={title}>
                        {title.split('').map((char, index) => (
                            <motion.span key={index} variants={letterVariants} className="inline-block" style={{ textShadow: `0 3px 15px rgba(0,0,0,0.5)` }}>
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        ))}
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1 }} className="mt-4 text-lg md:text-xl text-brand-muted max-w-3xl font-mono">
                        Designing the Future of Education.
                    </motion.p>

                    {/* Blueprint Module Cards */}
                    <motion.div variants={moduleVariants} initial="hidden" animate={controls} className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mt-16">
                        {blueprintModules.map((mod, index) => (
                            <div key={index} className="bg-brand-dark/50 backdrop-blur-sm p-6 rounded-lg text-center border border-brand-accent/20 transition-all duration-300 hover:border-brand-accent/50 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-accent/10">
                                <div className="text-4xl text-brand-accent mx-auto mb-4">{mod.icon}</div>
                                <h3 className="text-xl font-bold text-brand-light mb-2">{mod.title}</h3>
                                <p className="text-sm text-brand-muted">{mod.description}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Final Call to Action */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3, duration: 1 }} className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link to="/admissions">
                            <AnimatedButton>Construct Your Future</AnimatedButton>
                        </Link>
                        <Link to="/gallery">
                            <AnimatedButton className="bg-transparent border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-dark-text">
                                Analyze the Schematics
                            </AnimatedButton>
                        </Link>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
};

export default Hero;