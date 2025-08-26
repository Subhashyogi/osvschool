import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaCog,
  FaCalendarAlt,
  FaClock,
  FaArrowRight,
  FaStar,
  FaHeart,
  FaGraduationCap,
  FaGlobe,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { FaShield } from "react-icons/fa6";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  //   const quickActions = [
  //     {
  //       title: "Content Management",
  //       description: "Manage website content and media",
  //       icon: <FaRocket className="h-6 w-6" />,
  //       color: "from-blue-500 to-blue-600",
  //       path: "/admin/gallery",
  //     },
  //     {
  //       title: "Faculty Portal",
  //       description: "Add and manage faculty information",
  //       icon: <FaGraduationCap className="h-6 w-6" />,
  //       color: "from-green-500 to-green-600",
  //       path: "/admin/faculty",
  //     },
  //     {
  //       title: "Analytics & Insights",
  //       description: "View performance metrics",
  //       icon: <FaChartLine className="h-6 w-6" />,
  //       color: "from-purple-500 to-purple-600",
  //       path: "#",
  //     },
  //     {
  //       title: "System Settings",
  //       description: "Configure admin preferences",
  //       icon: <FaCog className="h-6 w-6" />,
  //       color: "from-orange-500 to-orange-600",
  //       path: "#",
  //     },
  //   ];

  const features = [
    {
      icon: <FaLightbulb className="h-8 w-8 text-yellow-500" />,
      title: "Smart Management",
      description: "Intelligent content organization and optimization",
    },
    {
      icon: <FaShield className="h-8 w-8 text-green-500" />,
      title: "Secure Platform",
      description: "Enterprise-grade security for your data",
    },
    {
      icon: <FaGlobe className="h-8 w-8 text-blue-500" />,
      title: "Global Access",
      description: "Manage your content from anywhere in the world",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-cool/30">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden bg-gradient-to-r from-brand-dark via-brand-nav to-brand-accent rounded-2xl p-8 mb-8 text-white"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-10"></div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="mb-6 md:mb-0">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold mb-2 text-white"
              >
                Welcome back, {user?.name}!
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl text-brand-nav-muted"
              >
                Ready to create something amazing today?
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="text-right"
            >
              <div className="flex items-center text-brand-nav-muted mb-2">
                <FaClock className="mr-2" />
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="flex items-center text-brand-nav-muted">
                <FaCalendarAlt className="mr-2" />
                {currentTime.toLocaleDateString()}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {quickActions.map((action, index) => (
          <motion.div
            key={action.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="group cursor-pointer"
          >
            <div
              className={`bg-gradient-to-br ${action.color} p-6 rounded-xl shadow-lg text-white relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  {action.icon}
                  <FaArrowRight className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{action.title}</h3>
                <p className="text-white/80 text-sm">{action.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div> */}

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-8"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Platform Features
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover the powerful tools and capabilities that make content
            management effortless and efficient.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="text-center p-6 rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-100"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Inspiration Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-gradient-to-r from-brand-warm to-brand-cool rounded-2xl p-8 text-center"
      >
        <div className="flex justify-center mb-4">
          <div className="flex space-x-2">
            <FaStar className="text-yellow-500 h-6 w-6" />
            <FaHeart className="text-red-500 h-6 w-6" />
            <FaStar className="text-yellow-500 h-6 w-6" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          "Excellence is not a destination; it is a continuous journey that
          never ends."
        </h2>
        <p className="text-gray-600 text-lg">
          Every piece of content you create shapes the future of education. Make
          it count.
        </p>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
