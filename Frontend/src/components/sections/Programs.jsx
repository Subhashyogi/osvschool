import React from "react";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaCalculator,
  FaBook,
  FaGlobe,
  FaPalette,
  FaMusic,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AnimatedButton from "../common/AnimatedButton";

const Programs = () => {
  const programs = [
    {
      icon: FaFlask,
      title: "Science & Technology",
      description:
        "Cutting-edge laboratories and research opportunities in Physics, Chemistry, Biology, and Computer Science.",
      features: ["Modern Labs", "Research Projects", "Tech Integration"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaCalculator,
      title: "Mathematics",
      description:
        "Comprehensive mathematical education from basic arithmetic to advanced calculus and statistics.",
      features: ["Problem Solving", "Logical Thinking", "Real Applications"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: FaBook,
      title: "Languages & Literature",
      description:
        "Master communication skills through English, Hindi, and regional languages with rich literature studies.",
      features: ["Creative Writing", "Public Speaking", "Cultural Studies"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: FaGlobe,
      title: "Social Sciences",
      description:
        "Understanding society, history, geography, and civics to become responsible global citizens.",
      features: ["Historical Analysis", "Geography", "Civic Responsibility"],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: FaPalette,
      title: "Arts & Crafts",
      description:
        "Nurture creativity through visual arts, crafts, and design thinking workshops.",
      features: ["Visual Arts", "Handicrafts", "Design Thinking"],
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: FaMusic,
      title: "Performing Arts",
      description:
        "Express yourself through music, dance, drama, and other performing arts programs.",
      features: ["Music Theory", "Dance Forms", "Theatre Arts"],
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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
    <section className="py-16 md:py-20 bg-brand-surface relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-brand-dark mb-4"
          >
            Academic Excellence Programs
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-brand-muted max-w-3xl mx-auto"
          >
            Our comprehensive curriculum is designed to nurture every aspect of
            your child's development, from academic excellence to creative
            expression and critical thinking skills.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {programs.map((program, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`h-2 bg-gradient-to-r ${program.color}`} />
              <div className="p-8">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${program.color} rounded-full mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <program.icon className="text-2xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-4">
                  {program.title}
                </h3>
                <p className="text-brand-muted mb-6 leading-relaxed">
                  {program.description}
                </p>
                <div className="space-y-2">
                  {program.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-center text-sm text-brand-muted"
                    >
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${program.color} rounded-full mr-3`}
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link to="/academics">
            <AnimatedButton className="inline-flex items-center gap-2 text-brand-light">
              <span>Explore All Programs</span>
              <FaBook />
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Programs;
