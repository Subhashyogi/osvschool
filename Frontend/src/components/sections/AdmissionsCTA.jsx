import React from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import AnimatedButton from "../common/AnimatedButton";

const AdmissionsCTA = () => {
  const quickInfo = [
    {
      icon: FaPhone,
      title: "Call Us",
      content: "+91 12345 67890",
      action: "tel:+911234567890",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      content: "admissions@osvr.edu.in",
      action: "mailto:admissions@osvr.edu.in",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Visit Us",
      content: "123 Education Street, Knowledge City",
      action: "/contact",
    },
    {
      icon: FaCalendarAlt,
      title: "Schedule Tour",
      content: "Book a campus visit",
      action: "/contact",
    },
  ];

  const admissionSteps = [
    {
      step: "01",
      title: "Inquiry",
      description:
        "Contact us or visit our campus to learn more about our programs.",
    },
    {
      step: "02",
      title: "Application",
      description: "Submit your application form with required documents.",
    },
    {
      step: "03",
      title: "Assessment",
      description:
        "Participate in our friendly interaction and assessment process.",
    },
    {
      step: "04",
      title: "Enrollment",
      description: "Complete enrollment process and join our school family.",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-dark-gradient relative overflow-hidden">
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
            Join Our School Family
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-3xl mx-auto"
          >
            Admissions are now open for the academic year 2025-26. Give your
            child the best foundation for their future success.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Admission Process */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">
              Simple Admission Process
            </h3>
            <div className="space-y-6">
              {admissionSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                    <span className="text-white font-bold text-sm">
                      {step.step}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Information & CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Get in Touch</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {quickInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.action.startsWith("/") ? undefined : info.action}
                  onClick={
                    info.action.startsWith("/")
                      ? (e) => {
                          e.preventDefault();
                          // Handle internal navigation if needed
                        }
                      : undefined
                  }
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <info.icon className="text-white text-sm" />
                  </div>
                  <div>
                    <div className="text-white/80 text-xs font-medium">
                      {info.title}
                    </div>
                    <div className="text-white text-sm">{info.content}</div>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="space-y-4">
              <Link to="/admissions">
                <AnimatedButton className="w-full bg-white text-gray-500 hover:bg-white/90 transition-colors duration-300 flex items-center justify-center gap-2">
                  Apply Now for 2025-26
                  <FaArrowRight />
                </AnimatedButton>
              </Link>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full border-2 border-white/30 text-white py-3 px-6 rounded-full font-medium hover:border-white/50 hover:bg-white/10 transition-all duration-300"
              >
                Download Prospectus
              </motion.button>
            </div>

            <div className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="text-white/80 text-sm mb-2">
                <strong>Admission Deadline:</strong> April 30, 2025
              </div>
              <div className="text-white/80 text-sm">
                <strong>Classes Available:</strong> Nursery to Class XII
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-white/90 mb-4">
            Have questions? Our admission counselors are here to help!
          </p>
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-all duration-300"
            >
              Schedule a Campus Tour
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default AdmissionsCTA;
