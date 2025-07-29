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

const title = ".S.V. SR. SEC. SCHOOL";

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
        <div className="absolute inset-0 bg-brand-dark/10"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center p-4 text-center max-w-4xl w-full mx-auto">
        {/* The outer div is no longer needed for flex, as the h1 will handle it */}
        <motion.h1
          variants={titleVariants}
          className="flex items-baseline justify-center xxs:text-lg xs:text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight uppercase text-brand-light"
          aria-label={`O${title}`}
        >
          {/* 1. The image is now a motion component AND it's INSIDE the h1 */}
          <motion.img
            src="/src/assets/o-letter.svg"
            alt="O"
            // 2. Apply the same animation variants as the letters
            variants={letterVariants}
            // 3. Use 'em' units for responsive sizing! This is better than fixed heights.
            className="inline-block"
            style={{
              height: "0.80em",
              width: "0.80em",
              // Optional: fine-tune vertical alignment
              position: "relative",
              top: "0.08em",
            }}
          />

          {/* The rest of your title mapping logic remains the same */}
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
          className="mt-6 md:mt-4 text-lg md:text-xl text-orange-400 max-w-2xl"
        >
          A Tradition of Excellence, A Future of Innovation.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-12 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-4 w-full"
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
