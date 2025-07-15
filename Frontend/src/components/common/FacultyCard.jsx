// src/components/common/FacultyCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FacultyCard = ({ member, index }) => {
    return (
        <motion.div
            className="bg-brand-surface rounded-lg shadow-2xl overflow-hidden text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <div className="h-64 overflow-hidden">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-brand-light">{member.name}</h3>
                <p className="text-brand-accent font-medium mb-3">{member.title}</p>
                <p className="text-brand-muted text-sm">{member.bio}</p>
            </div>
        </motion.div>
    );
};

export default FacultyCard;