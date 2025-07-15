// src/components/common/AnimatedButton.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedButton = ({ children, className, ...props }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            className={`px-6 py-3 font-semibold rounded-full shadow-lg bg-brand-dark text-brand-light transition-all ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default AnimatedButton;