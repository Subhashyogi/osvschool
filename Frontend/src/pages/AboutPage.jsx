import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Helmet } from "react-helmet";
import { timelineEvents } from "../constants";
import { FaBookReader, FaUsers, FaAward } from "react-icons/fa";
import { Link } from "react-router-dom";
import AnimatedButton from "../components/common/AnimatedButton";

const AboutPage = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineScroll } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  });

  const headerRef = useRef(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(headerScroll, [0, 1], ["0%", "50%"]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-brand-light text-brand-dark">
      <Helmet>
        <title>About OSV School - Our Story of Excellence Since 1985</title>
        <meta name="description" content="Discover the rich history and philosophy of OSV School. Learn about our journey since 1985, our vision, mission, and commitment to academic excellence and character development." />
        <meta name="keywords" content="OSV School history, about OSV School, school philosophy, academic excellence, character development, school vision, school mission, education since 1985" />
        <meta name="author" content="OSV School" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://osvschool.netlify.app/about" />
        <meta property="og:title" content="About OSV School - Our Story of Excellence Since 1985" />
        <meta property="og:description" content="Discover the rich history and philosophy of OSV School. Learn about our journey since 1985, our vision, mission, and commitment to academic excellence and character development." />
        <meta property="og:image" content="https://osvschool.netlify.app/assets/og-images/og-about.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="OSV School" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://osvschool.netlify.app/about" />
        <meta property="twitter:title" content="About OSV School - Our Story of Excellence Since 1985" />
        <meta property="twitter:description" content="Discover the rich history and philosophy of OSV School. Learn about our journey since 1985, our vision, mission, and commitment to academic excellence and character development." />
        <meta property="twitter:image" content="https://osvschool.netlify.app/assets/og-images/og-about.png" />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://osvschool.netlify.app/about" />
      </Helmet>

      <header ref={headerRef} className="relative h-[60vh] overflow-hidden">
        <motion.div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            y: parallaxY,
            backgroundImage: `url('https://images.pexels.com/photos/8617830/pexels-photo-8617830.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
          }}
        />
        <div className="absolute inset-0 bg-brand-dark/60 z-10" />
        <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-brand-light"
          >
            Our Story of Excellence
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-4 text-lg md:text-xl max-w-2xl text-brand-nav-muted"
          >
            A tradition of nurturing talent and fostering innovation since 1985.
          </motion.p>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="w-full h-80 rounded-2xl overflow-hidden shadow-xl"
          >
            <img
              src="https://images.pexels.com/photos/8617805/pexels-photo-8617805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Our Philosophy"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Our Philosophy
            </motion.h2>
            <motion.div
              variants={fadeInUp}
              className="space-y-4 text-brand-muted"
            >
              <p>
                <strong className="font-semibold text-brand-accent">
                  Our Vision:
                </strong>{" "}
                To be a leading educational institution that inspires students
                to achieve their full potential and become compassionate,
                responsible global citizens.
              </p>
              <p>
                <strong className="font-semibold text-brand-accent">
                  Our Mission:
                </strong>{" "}
                To provide a challenging and supportive learning environment
                that fosters intellectual curiosity, critical thinking, and a
                lifelong love of learning.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section ref={timelineRef} className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Our Journey Through Time
          </h2>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-1 bg-gray-200 -translate-x-1/2"></div>
            <motion.div
              style={{ scaleY: timelineScroll }}
              className="absolute left-1/2 top-0 h-full w-1 bg-brand-accent -translate-x-1/2 origin-top"
            />

            {timelineEvents.map((event, index) => (
              <div
                key={index}
                className={`mb-16 flex w-full items-center ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: "all" }}
                  transition={{ duration: 0.5 }}
                  className="absolute left-1/2 -translate-x-1/2 w-6 h-6 bg-white border-4 border-brand-accent rounded-full z-10"
                />
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6 }}
                  className={`w-[calc(50%-2rem)] p-6 bg-white shadow-lg rounded-2xl ${
                    index % 2 === 0 ? "mr-auto" : "ml-auto"
                  }`}
                >
                  <p className="text-brand-accent font-bold text-lg">
                    {event.year}
                  </p>
                  <h3 className="text-xl font-bold mt-1 text-brand-dark">
                    {event.title}
                  </h3>
                  <p className="text-sm text-brand-muted mt-2">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Values in Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBookReader />,
                value: "Excellence",
                image:
                  "https://images.pexels.com/photos/8946726/pexels-photo-8946726.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                icon: <FaUsers />,
                value: "Community",
                image:
                  "https://images.pexels.com/photos/8617923/pexels-photo-8617923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
              {
                icon: <FaAward />,
                value: "Integrity",
                image:
                  "https://images.pexels.com/photos/1720184/pexels-photo-1720184.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative h-80 rounded-2xl overflow-hidden shadow-xl group"
              >
                <img
                  src={item.image}
                  alt={item.value}
                  className="absolute inset-0 z-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent z-10" />
                <div className="relative z-20 flex flex-col justify-end h-full p-6 text-brand-accent">
                  <div className="text-4xl mb-2 text-brand-accent">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{item.value}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-dark">
            Join Our Community
          </h2>
          <p className="mt-4 text-brand-muted max-w-xl mx-auto">
            Become a part of a community dedicated to shaping the future.
            Contact us to learn more about our programs.
          </p>
          <div className="mt-8 ">
            <Link to="/contact">
              <AnimatedButton className={"text-brand-light"}>
                Contact Us
              </AnimatedButton>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
