import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedButton from "../common/AnimatedButton";
import campusVideo from "../../assets/videos/campus-video.mp4";
import { heroPillars } from "../../constants/index";

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const titleVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const letterVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const title = "O.S.V. SCHOOL";

const Hero = () => {
  return (
    <motion.section
      initial="initial"
      animate="animate"
      variants={containerVariants}
      className="relative min-h-screen pt-20 flex items-center justify-center overflow-hidden bg-brand-dark"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={campusVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-brand-dark/70"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 text-center max-w-4xl w-full mx-auto">
        <motion.h1
          variants={titleVariants}
          className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight uppercase text-brand-light"
          aria-label={title}
        >
          {title.split("").map((char, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className="inline-block"
              style={{ textShadow: `0 2px 10px rgba(0,0,0,0.5)` }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 text-lg md:text-xl text-orange-400 max-w-2xl"
        >
          A Tradition of Excellence, A Future of Innovation.
        </motion.p>

        {/* <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mt-10">
          {heroPillars.map((mod) => (
            <div key={mod.title} className="bg-brand-surface/50 backdrop-blur-md p-6 rounded-lg text-center border border-brand-accent/20">
              <div className="text-4xl text-brand-accent mx-auto mb-3">{mod.icon}</div>
              <h3 className="text-xl font-semibold text-brand-accent">{mod.title}</h3>
            </div>
          ))}
        </motion.div> */}

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
        >
          <Link to="/about" className="w-full sm:w-auto">
            <AnimatedButton className="w-full sm:w-auto text-brand-light">
              Learn More About Us
            </AnimatedButton>
          </Link>
          <Link to="/gallery" className="w-full sm:w-auto">
            <AnimatedButton className="bg-transparent border-2 border-brand-accent text-brand-light hover:bg-brand-accent hover:text-brand-dark w-full sm:w-auto">
              Explore Our Campus
            </AnimatedButton>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
