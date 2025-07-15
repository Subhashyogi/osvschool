// src/components/sections/Achievers.jsx
import React from 'react';
import './Marquee.css';
import { facultyMembers as achievers } from '../../constants'; // Reusing data

const AchieverCard = ({ achiever }) => (
    <div className="flex-shrink-0 w-72 mx-4 bg-brand-surface p-4 rounded-lg flex items-center space-x-4 border border-brand-muted-bg/30">
        <img src={achiever.image} alt={achiever.name} className="w-16 h-16 rounded-full object-cover border-2 border-brand-accent" />
        <div>
            <h4 className="font-bold text-brand-light">{achiever.name}</h4>
            <p className="text-sm text-brand-accent">National Science Olympiad</p>
        </div>
    </div>
);

const Achievers = () => {
    const extendedAchievers = [...achievers, ...achievers, ...achievers];

    return (
        <section id="achievers" className="py-24 bg-brand-surface">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold">A Legacy of Achievement</h2>
                <p className="text-brand-muted mt-2">Celebrating our students' success on every stage.</p>
            </div>
            <div className="relative w-full overflow-hidden mask-gradient">
                <div className="flex marquee-content">
                    {extendedAchievers.map((achiever, index) => (
                        <AchieverCard key={index} achiever={achiever} />
                    ))}
                </div>
            </div>
        </section>
    );
};


export default Achievers;