import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedButton from '../common/AnimatedButton';
import { achievers } from '../../constants';
import { FaTrophy } from 'react-icons/fa';

// --- Swiper Imports ---
// We only need the Autoplay module for this effect
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const AchieverCard = ({ achiever }) => {
    // This component is unchanged
    return (
        <div className="relative rounded-2xl overflow-hidden group w-64 md:w-72 h-full">
            <div className="relative bg-white/70 backdrop-blur-md border border-brand-accent/30 rounded-2xl p-6 text-center h-full">
                <img
                    src={achiever.image}
                    alt={achiever.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-brand-accent/50"
                />
                <h3 className="text-xl font-bold text-brand-dark">{achiever.name}</h3>
                <p className="text-brand-muted text-sm mb-4 h-10">{achiever.achievement}</p>
                <div className="bg-brand-accent/20 text-brand-dark font-semibold py-1 px-3 rounded-full inline-flex items-center gap-2">
                    <FaTrophy className="text-brand-accent" />
                    <span>{achiever.award}</span>
                </div>
            </div>
        </div>
    );
};


const Achievers = () => {
    // To ensure a seamless loop on all screen sizes, we duplicate the content multiple times.
    const duplicatedAchievers = [...achievers, ...achievers, ...achievers, ...achievers];

    return (
        <section className="py-16 md:py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-12 md:mb-16 px-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">Our Legacy of Achievement</h2>
                    <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
                        We celebrate the brilliant minds who have excelled on national and international stages.
                    </p>
                </div>
            </div>

            {/* --- THE DEFINITIVE SWIPER IMPLEMENTATION --- */}
            <div className="cursor-grab">
                <Swiper
                    className="continuous-slider py-4"
                    modules={[Autoplay]}
                    loop={true}
                    slidesPerView="auto"
                    spaceBetween={30}
                    // --- THE DEFINITIVE AUTOPLAY CONFIGURATION ---
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true, // Let user take control permanently if they interact
                    }}
                    speed={8000} // Increase speed for a slower, more graceful scroll
                >
                    {duplicatedAchievers.map((achiever, index) => (
                        <SwiperSlide key={index} style={{ width: 'auto' }}>
                            <AchieverCard achiever={achiever} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="text-center mt-12">
                <Link to="/achievements">
                    <AnimatedButton>View All Achievers</AnimatedButton>
                </Link>
            </div>
        </section>
    );
};

export default Achievers;