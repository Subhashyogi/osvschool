// src/components/common/FacultyCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'react-vanilla-tilt';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const FacultyCard = ({ member, index }) => {
    // Options for the 3D tilt effect
    const tiltOptions = {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
        scale: 1.05,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            {/* 1. 3D Tilt Effect Wrapper */}
            <VanillaTilt options={tiltOptions} style={{}}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                    {/* 2. Background Image & Gradient Overlay */}
                    <img src={member.image} alt={member.name} className="w-full h-96 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent"></div>

                    {/* 3. "Glassmorphism" Info Panel */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-black/50">

                            {/* Name and Title */}
                            <div>
                                <h3 className="text-2xl font-bold text-brand-light">{member.name}</h3>
                                <p className="text-brand-accent font-medium mb-3">{member.title}</p>
                            </div>

                            {/* Bio and Socials (revealed on hover) */}
                            <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                                <p className="text-brand-muted text-sm mb-4">{member.bio}</p>

                                {/* 4. Social Media Links */}
                                <div className="flex space-x-4">
                                    {member.socials.linkedin && (
                                        <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-accent transition-colors">
                                            <FaLinkedin size={20} />
                                        </a>
                                    )}
                                    {member.socials.twitter && (
                                        <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-accent transition-colors">
                                            <FaTwitter size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </VanillaTilt>
        </motion.div>
    );
};

export default FacultyCard;