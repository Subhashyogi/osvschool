import React from "react";
import { motion } from "framer-motion";
import {
  FaFlask,
  FaCalculator,
  FaBook,
  FaGraduationCap,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AnimatedButton from "../common/AnimatedButton";

const Programs = () => {
  const programs = [
    {
      icon: FaFlask,
      title: "Science & Technology",
      description:
        "Comprehensive scientific education with state-of-the-art laboratories and hands-on research opportunities across multiple disciplines.",
      features: ["Physics & Chemistry", "Biology & Computer Science", "Research Projects"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: FaCalculator,
      title: "Mathematics",
      description:
        "Advanced mathematical education from foundational concepts to complex problem-solving and analytical thinking.",
      features: ["Algebra & Calculus", "Statistics & Geometry", "Problem Solving"],
      color: "from-green-500 to-green-600",
    },

    {
      icon: FaGraduationCap,
      title: "Arts & Humanities",
      description:
        "Comprehensive arts and humanities education fostering critical thinking, creativity, and cultural understanding.",
      features: ["Literature & History", "Geography & Political Science", "Cultural Studies"],
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: FaChartLine,
      title: "Commerce & Business",
      description:
        "Comprehensive business education preparing students for corporate leadership, entrepreneurship, and economic analysis.",
      features: ["Business Studies & Economics", "Accountancy & Finance", "Entrepreneurship"],
      color: "from-pink-500 to-pink-600",
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
