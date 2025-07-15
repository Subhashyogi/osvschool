// src/pages/HomePage.jsx
import React from 'react';
import Hero from '../components/sections/Hero';
import Pillars from '../components/sections/Pillars';
import PrincipalWelcome from '../components/sections/PrincipalWelcome';
import Achievers from '../components/sections/Achievers';
import Testimonials from '../components/sections/Testimonials';
import GalleryPreview from '../components/sections/GalleryPreview';

const HomePage = () => {
    return (
        <>
            <Hero />
            <Pillars />
            <PrincipalWelcome />
            <Achievers />
            <Testimonials />
            <GalleryPreview />
        </>
    );
};

export default HomePage;