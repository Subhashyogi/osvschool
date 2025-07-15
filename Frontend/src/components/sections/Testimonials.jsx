// src/components/sections/Testimonials.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { testimonials } from '../../constants';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Testimonials = () => {
    return (
        <motion.section
            className="py-24 bg-brand-dark"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16">
                    Voices of Our Community
                </h2>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{ delay: 4500, disableOnInteraction: false }}
                    pagination={{
                        clickable: true,
                        renderBullet: (index, className) => `<span class="${className}"></span>`
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper relative pb-16"
                    style={{
                        '--swiper-navigation-color': '#c79a3b',
                        '--swiper-pagination-color': '#c79a3b',
                        '--swiper-pagination-bullet-inactive-color': '#495057',
                        '--swiper-pagination-bullet-inactive-opacity': '1',
                    }}
                >
                    {testimonials.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-brand-surface p-8 rounded-xl shadow-lg max-w-3xl mx-auto text-center">
                                <img src={testimonial.avatar} alt={testimonial.name} className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-brand-accent" />
                                <p className="text-brand-muted italic text-lg mb-6">"{testimonial.quote}"</p>
                                <h4 className="font-bold text-xl text-brand-light">{testimonial.name}</h4>
                                <p className="text-brand-accent">{testimonial.title}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </motion.section>
    );
};

export default Testimonials;