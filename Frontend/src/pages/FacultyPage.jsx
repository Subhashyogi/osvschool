// src/pages/FacultyPage.jsx
import React from 'react';
import { facultyMembers, principal } from '../constants/index';
import FacultyCard from '../components/common/FacultyCard';

const FacultyPage = () => {
    return (
        <div>
            <div className="pt-32 pb-16 bg-brand-surface text-center px-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-brand-light">Our Leadership & Faculty</h1>
                <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">Meet the dedicated team guiding our students to success.</p>
            </div>

            <section className="py-16 md:py-20 bg-brand-light-bg text-brand-dark-text">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Principal</h2>
                    {/* Stacks on mobile */}
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-6 md:p-8 rounded-xl shadow-lg">
                        <img src={principal.image} alt={principal.name} className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover border-4 border-brand-accent flex-shrink-0" />
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold">{principal.name}</h3>
                            <p className="text-brand-accent font-semibold">{principal.title}</p>
                            <p className="mt-4 text-gray-600">{principal.welcomeMessage}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-20 bg-brand-dark">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-light">Our Expert Educators</h2>
                    {/* Responsive grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {facultyMembers.map((member, index) => (
                            <FacultyCard key={member.name} member={member} index={index} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FacultyPage;