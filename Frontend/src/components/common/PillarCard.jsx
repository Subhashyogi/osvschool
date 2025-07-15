// src/components/common/PillarCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PillarCard = ({ feature, index }) => {
    // Variants for the background glow animation
    const glowVariants = {
        initial: { opacity: 0, scale: 0.5 },
        hover: { opacity: 1, scale: 1.2, transition: { duration: 0.3 } },
    };

    // Variants for the card's initial "fly-in" animation
    const cardVariants = {
        offscreen: { y: 100, opacity: 0 },
        onscreen: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                bounce: 0.4,
                duration: 0.8,
                delay: index * 0.1, // Stagger the animation of each card
            },
        },
    };

    return (
        // The perspective wrapper enables the 3D effect
        <motion.div
            style={{ perspective: '1000px' }}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.5 }}
            variants={cardVariants}
        >
            <motion.div
                className="relative h-full bg-brand-white rounded-2xl shadow-lg p-8 text-center"
                // The 3D tilt effect on hover
                whileHover={{ rotateY: -15, rotateX: 10, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }} // Crucial for containing 3D transformed children
            >
                {/* Background Glow Effect */}
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        background: 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
                        '--tw-gradient-from': 'rgba(183, 183, 164, 0.2)', // from-brand-accent/20
                        '--tw-gradient-to': 'rgba(183, 183, 164, 0)',   // to-transparent
                    }}
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover" // Controlled by parent's hover state
                />

                {/* Card Content - lifted forward in 3D space */}
                <div className="relative" style={{ transform: 'translateZ(40px)' }}>
                    {/* Animated Icon */}
                    <motion.div
                        className="text-5xl mb-6 inline-block text-brand-accent"
                        whileHover={{ scale: 1.2, y: -10 }} // Icon lifts up on its own hover
                        transition={{ type: 'spring', stiffness: 300 }}
                    >
                        {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                    <p className="text-brand-muted">{feature.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PillarCard;