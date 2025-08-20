import React from "react";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const NewsEvents = () => {
  const news = [
    {
      id: 1,
      title: "Annual Science Exhibition 2025",
      excerpt:
        "Students showcase innovative projects and experiments in our biggest science fair of the year.",
      date: "March 15, 2025",
      category: "Events",
      image: "/api/placeholder/400/250",
      featured: true,
    },
    {
      id: 2,
      title: "New Computer Lab Inauguration",
      excerpt:
        "State-of-the-art computer laboratory with latest technology opens for student use.",
      date: "March 10, 2025",
      category: "News",
      image: "/api/placeholder/400/250",
    },
    {
      id: 3,
      title: "Inter-School Sports Championship",
      excerpt:
        "Our school teams compete in the regional sports championship this weekend.",
      date: "March 8, 2025",
      category: "Sports",
      image: "/api/placeholder/400/250",
    },
  ];

  const upcomingEvents = [
    {
      title: "Parent-Teacher Meeting",
      date: "March 20, 2025",
      time: "10:00 AM - 1:00 PM",
      location: "Main Auditorium",
    },
    {
      title: "Cultural Day Celebration",
      date: "March 25, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "School Campus",
    },
    {
      title: "Annual Day Rehearsal",
      date: "March 28, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Auditorium",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Events: "bg-blue-100 text-blue-600",
      News: "bg-green-100 text-green-600",
      Sports: "bg-orange-100 text-orange-600",
    };
    return colors[category] || "bg-gray-100 text-gray-600";
  };

  return (
    <section className="py-16 md:py-20 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-brand-dark mb-4"
          >
            Latest News & Events
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-brand-muted max-w-3xl mx-auto"
          >
            Stay updated with the latest happenings, achievements, and upcoming
            events at our school community.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* News Articles */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {news.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                    article.featured ? "md:flex" : ""
                  }`}
                >
                  <div
                    className={`${
                      article.featured ? "md:w-1/2" : ""
                    } h-48 bg-gradient-to-br from-brand-accent/20 to-brand-secondary/20 flex items-center justify-center`}
                  >
                    <FaCalendarAlt className="text-4xl text-brand-accent" />
                  </div>
                  <div className={`p-6 ${article.featured ? "md:w-1/2" : ""}`}>
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                          article.category
                        )}`}
                      >
                        {article.category}
                      </span>
                      <span className="text-sm text-brand-muted">
                        {article.date}
                      </span>
                    </div>
                    <h3
                      className={`font-bold text-brand-dark mb-3 ${
                        article.featured ? "text-xl" : "text-lg"
                      }`}
                    >
                      {article.title}
                    </h3>
                    <p className="text-brand-muted mb-4 leading-relaxed">
                      {article.excerpt}
                    </p>
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="inline-flex items-center gap-2 text-brand-accent font-medium hover:text-brand-accent/80 transition-colors"
                    >
                      Read More <FaArrowRight className="text-sm" />
                    </motion.button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                <FaCalendarAlt className="text-brand-accent" />
                Upcoming Events
              </h3>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-4 border border-gray-100 rounded-xl hover:border-brand-accent/30 hover:shadow-md transition-all duration-300"
                  >
                    <h4 className="font-semibold text-brand-dark mb-2">
                      {event.title}
                    </h4>
                    <div className="space-y-1 text-sm text-brand-muted">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-xs text-brand-accent" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="text-xs text-brand-accent" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-xs text-brand-accent" />
                        {event.location}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <motion.div whileHover={{ scale: 1.02 }} className="mt-6">
                <Link
                  to="/events"
                  className="block w-full text-center bg-brand-accent text-white py-3 rounded-xl font-medium hover:bg-brand-accent/90 transition-colors duration-300"
                >
                  View All Events
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsEvents;
