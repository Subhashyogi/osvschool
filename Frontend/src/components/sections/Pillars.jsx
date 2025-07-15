// src/components/sections/Pillars.jsx
import React from 'react';
import { FaBookOpen, FaUserFriends, FaTrophy } from 'react-icons/fa';
import PillarCard from '../common/PillarCard'; // Import our new component

const featuresData = [
    { icon: <FaBookOpen />, title: 'Expert Curriculum', description: 'Our programs are designed by industry experts to challenge and inspire.' },
    { icon: <FaUserFriends />, title: 'Vibrant Community', description: 'A diverse and supportive network of students, faculty, and alumni.' },
    { icon: <FaTrophy />, title: 'Legacy of Success', description: 'Join a tradition of excellence and achievement in academics and beyond.' },
];

const Pillars = () => {
    return (
        <div className="py-16 md:py-24 bg-brand-light">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Enhanced Section Header */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">The Cornerstones of Our Success</h2>
                    <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">We are built on a foundation of academic rigor, strong community values, and a history of achievement.</p>
                </div>

                {/* The new responsive grid using the PillarCard component */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {featuresData.map((feature, index) => (
                        <PillarCard
                            key={index}
                            feature={feature}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Pillars;