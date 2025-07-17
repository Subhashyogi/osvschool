// src/components/sections/PrincipalWelcome.jsx
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { principal } from '../../constants';

// Animation variants for the staggered text effect
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2, // Delay between each child animation
        },
    },
};

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const PrincipalWelcome = () => {
    // 1. Setup for Parallax Effect
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"], // Track scroll from when section enters to when it leaves viewport
    });
    // Map scroll progress to a vertical movement (e.g., -100px to 100px)
    const parallaxY = useTransform(scrollYProgress, [0, 1], [-100, 100]);

    return (
        <section
            ref={sectionRef} // Attach ref for scroll tracking
            className="py-16 md:py-20 bg-gray-50 relative overflow-hidden"
        >
            {/* 2. Thematic Background Quotation Mark */}
            <span
                aria-hidden="true"
                className="absolute top-0 right-0 text-[20rem] font-bold text-gray-200/50 opacity-50 -z-0 pointer-events-none"
                style={{ transform: 'translate(20%, -20%)' }}
            >
                “
            </span>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* 3. New Overlapping Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">

                    {/* Parallax Image Column */}
                    <div className="lg:col-span-2 flex justify-center lg:justify-start">
                        <motion.div
                            style={{ y: parallaxY }} // Apply the parallax effect here
                            className="relative w-64 h-64 md:w-80 md:h-80"
                        >
                            <div className="absolute inset-0 bg-brand-accent rounded-full transform rotate-6"></div>
                            <img
                                src={principal.image}
                                alt={principal.name}
                                className="relative w-full h-full rounded-full object-cover border-8 border-brand-white shadow-2xl"
                            />
                        </motion.div>
                    </div>

                    {/* 4. Staggered Animation Text Column */}
                    <motion.div
                        className="lg:col-span-3 bg-brand-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                    >
                        <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-brand-dark mb-2">
                            A Message from Our Principal
                        </motion.h2>

                        <motion.h3 variants={fadeInUp} className="font-signature text-4xl text-brand-accent mb-6">
                            {principal.name}
                        </motion.h3>

                        <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-brand-muted">
                            {principal.welcomeMessage}
                        </motion.p>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default PrincipalWelcome;