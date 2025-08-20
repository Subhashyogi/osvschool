import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft, FaSpinner } from "react-icons/fa";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch testimonials from API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        console.log("Fetching testimonials from API...");

        const response = await fetch("/api/testimonials/public");

        if (!response.ok) {
          if (response.status === 503) {
            throw new Error(
              "Database temporarily unavailable. Please try again later."
            );
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Testimonials data received:", data);

        // Ensure we have an array of testimonials
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          setActiveIndex(0); // Reset to first testimonial
        } else {
          console.log("No testimonials found in API response");
          setTestimonials([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Return early if no testimonials or loading
  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaSpinner className="animate-spin text-4xl text-brand-accent mx-auto mb-4" />
          <p className="text-brand-muted">Loading testimonials...</p>
        </div>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-muted">
            {error
              ? `Error: ${error}`
              : "No testimonials available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  const featuredTestimonial = testimonials[activeIndex];

  // Safety check for activeIndex bounds
  if (!featuredTestimonial) {
    setActiveIndex(0);
    return null;
  }

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } },
  };

  // --- NEW: Dynamically determine the classes for the scrollable container ---
  const selectorContainerClasses =
    testimonials.length > 3
      ? "space-y-4 lg:max-h-[400px] lg:overflow-y-auto scrollbar-hide lg:pr-4"
      : "space-y-4";

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            Voices of Our Community
          </h2>
          <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
            Hear directly from students, parents, and alumni about their
            transformative experiences.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          {/* --- Left Column (Featured Testimonial) - Unchanged --- */}
          <div className="lg:col-span-2 relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="relative flex flex-col md:flex-row items-center gap-8 bg-brand-white p-8 rounded-2xl shadow-xl"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <FaQuoteLeft className="absolute top-8 left-8 text-8xl text-gray-100 -z-0" />
                <div className="relative z-10 flex-shrink-0">
                  <img
                    src={featuredTestimonial.avtar || "/logo-placeholder.svg"}
                    alt={featuredTestimonial.name}
                    className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-lg border-4 border-white"
                    onError={(e) => {
                      e.target.src = "/logo-placeholder.svg";
                    }}
                  />
                </div>
                <div className="relative z-10 text-center md:text-left">
                  <p className="text-xl italic text-brand-muted mb-4">
                    "{featuredTestimonial.quote}"
                  </p>
                  <h4 className="font-bold text-2xl text-brand-dark">
                    {featuredTestimonial.name}
                  </h4>
                  <p className="text-brand-accent font-semibold">
                    {featuredTestimonial.title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- Right Column (Selector List) - THE FIX IS APPLIED HERE --- */}
          <div className="lg:col-span-1">
            <div className={selectorContainerClasses}>
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex;
                return (
                  <motion.div
                    key={testimonial.name}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer border-2 transition-all duration-300 ${
                      isActive
                        ? "bg-white border-brand-accent shadow-lg"
                        : "bg-white/70 border-transparent hover:bg-white hover:shadow-md"
                    }`}
                    onClick={() => setActiveIndex(index)}
                    whileHover={{ scale: isActive ? 1 : 1.03 }}
                  >
                    <img
                      src={testimonial.avtar || "/logo-placeholder.svg"}
                      alt={testimonial.name}
                      className={`w-12 h-12 rounded-full transition-transform duration-300 ${
                        isActive ? "scale-110" : ""
                      }`}
                      onError={(e) => {
                        e.target.src = "/logo-placeholder.svg";
                      }}
                    />
                    <div>
                      <h5 className="font-bold text-brand-dark">
                        {testimonial.name}
                      </h5>
                      <p className="text-sm text-brand-muted">
                        {testimonial.title}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
