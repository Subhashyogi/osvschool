import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaUsers, FaAward, FaBookOpen } from "react-icons/fa";

const Statistics = () => {
  const stats = [
    {
      icon: FaGraduationCap,
      number: "500+",
      label: "Graduates",
      description: "Successful alumni making their mark",
    },
    {
      icon: FaUsers,
      number: "1200+",
      label: "Students",
      description: "Active learners in our community",
    },
    {
      icon: FaAward,
      number: "50+",
      label: "Awards",
      description: "Recognition for excellence",
    },
    {
      icon: FaBookOpen,
      number: "30+",
      label: "Subjects",
      description: "Comprehensive curriculum",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-accent-gradient relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-subtle-pattern bg-pattern-size" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl mx-auto"
          >
            Discover the measurable difference we make in our students' lives
            and our community
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
                <stat.icon className="text-3xl text-white" />
              </div>
              <motion.h3
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-4xl md:text-5xl font-bold text-white mb-2"
              >
                {stat.number}
              </motion.h3>
              <h4 className="text-xl font-semibold text-white mb-2">
                {stat.label}
              </h4>
              <p className="text-white/80 text-sm">{stat.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
