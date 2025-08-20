import React from "react";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaLaptop,
} from "react-icons/fa";

const CampusLife = () => {
  const facilities = [
    {
      icon: FaFlask,
      title: "Science Labs",
      description:
        "Well-equipped laboratories for Physics, Chemistry, Biology, and Computer Science.",
      image: "/api/placeholder/400/300",
    },
    {
      icon: FaLaptop,
      title: "Computer Labs",
      description:
        "Advanced computer laboratories with latest hardware, software, and high-speed internet for programming, digital design, and technology education.",
      image: "/api/placeholder/400/300",
    },
  ];



  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-brand-dark mb-4"
          >
            Vibrant Campus Life
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-brand-muted max-w-3xl mx-auto"
          >
            Beyond academics, our campus offers a rich environment for personal
            growth, creativity, and lifelong friendships through diverse
            activities and world-class facilities.
          </motion.p>
        </div>

        {/* Facilities Grid */}
        <div className="mb-16">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-brand-dark mb-8 text-center"
          >
            World-Class Facilities
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="h-48 bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 flex items-center justify-center">
                  <facility.icon className="text-6xl text-brand-accent" />
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold text-brand-dark mb-3">
                    {facility.title}
                  </h4>
                  <p className="text-brand-muted">{facility.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>



        {/* Call to Action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-brand-accent/10 to-brand-secondary/10 rounded-2xl"
        >
          <h3 className="text-2xl font-bold text-brand-dark mb-4">
            Experience Our Campus
          </h3>
          <p className="text-brand-muted mb-6 max-w-2xl mx-auto">
            Schedule a campus tour to see our facilities firsthand and meet our
            dedicated faculty and staff.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-brand-accent text-white px-8 py-3 rounded-full font-semibold hover:bg-brand-accent/90 transition-colors duration-300"
          >
            Schedule Campus Tour
          </motion.button>
        </motion.div> */}
      </div>
    </section>
  );
};

export default CampusLife;
