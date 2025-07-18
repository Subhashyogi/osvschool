import React from 'react';
import { motion } from 'framer-motion';
import VanillaTilt from 'react-vanilla-tilt';
import { FaLinkedin, FaTwitter } from 'react-icons/fa';

const FacultyCard = ({ member, index }) => {
    const tiltOptions = { max: 15, speed: 400, glare: true, "max-glare": 0.5, scale: 1.05 };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
        >
            <VanillaTilt options={tiltOptions} style={{}}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl group h-96">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-nav via-brand-nav/70 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="p-4 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 group-hover:bg-black/50">
                            <div>
                                <h3 className="text-2xl font-bold text-brand-light">{member.name}</h3>
                                <p className="text-brand-accent font-medium mb-3">{member.title}</p>
                            </div>
                            <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 group-hover:mt-4 transition-all duration-300 overflow-hidden">
                                <p className="text-brand-nav-muted text-sm mb-4">{member.bio}</p>
                                <div className="flex space-x-4">
                                    {member.socials.linkedin && <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-nav-muted hover:text-brand-accent transition-colors"><FaLinkedin size={20} /></a>}
                                    {member.socials.twitter && <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-brand-nav-muted hover:text-brand-accent transition-colors"><FaTwitter size={20} /></a>}
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