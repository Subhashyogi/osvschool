import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import AnimatedButton from "../common/AnimatedButton";
import { FaArrowRight, FaSpinner } from "react-icons/fa";

const GalleryPreview = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch gallery items from API
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        console.log("Fetching gallery items from API...");

        const response = await fetch(
          "https://osvschool-backend.onrender.com/api/gallery"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Gallery data received:", data);

        // Transform API data to match component expectations
        const transformedData = data.map((item) => ({
          id: item.id,
          src: item.mediaUrl,
          thumbnail: item.mediaUrl,
          poster: item.mediaUrl,
          alt: item.title,
          description: item.description,
          mediaType: item.mediaType,
        }));

        if (transformedData.length > 0) {
          setGalleryItems(transformedData);
          setActiveIndex(0);
        } else {
          console.log("No gallery items found in API response");
          setGalleryItems([]);
        }

        setError(null);
      } catch (err) {
        console.error("Error fetching gallery items:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  // Return early if loading
  if (loading) {
    return (
      <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FaSpinner className="animate-spin text-4xl text-brand-accent mx-auto mb-4" />
          <p className="text-brand-muted">Loading gallery...</p>
        </div>
      </section>
    );
  }

  // Return early if error or no items
  if (error || galleryItems.length === 0) {
    return (
      <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-brand-muted">
            {error
              ? `Error: ${error}`
              : "No gallery items available at the moment."}
          </p>
        </div>
      </section>
    );
  }

  const featuredItem = galleryItems[activeIndex];

  // Safety check for activeIndex bounds
  if (!featuredItem) {
    setActiveIndex(0);
    return null;
  }

  const heroVariants = {
    enter: { opacity: 0, scale: 0.95, y: 10 },
    center: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-gray-50 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-repeat opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23b7b7a4' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-dark">
            A Glimpse Into Our World
          </h2>
          <p className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto">
            From the classroom to the sports field, see the moments that define
            our vibrant campus life.
          </p>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-64 md:h-96 w-full rounded-2xl shadow-2xl overflow-hidden">
            <AnimatePresence mode="wait">
              {featuredItem.mediaType === "video" ? (
                <motion.video
                  key={activeIndex}
                  src={featuredItem.src}
                  variants={heroVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full object-cover"
                  controls
                  muted
                  onError={(e) => {
                    console.error("Video failed to load:", featuredItem.src);
                  }}
                />
              ) : (
                <motion.img
                  key={activeIndex}
                  src={featuredItem.thumbnail || featuredItem.poster}
                  alt={featuredItem.alt}
                  variants={heroVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Image failed to load:", featuredItem.src);
                    e.target.src = "/logo-placeholder.svg";
                  }}
                />
              )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
              <motion.div
                key={activeIndex + "-text"}
                className="absolute bottom-0 left-0 p-6"
                variants={heroVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <h3 className="text-xl font-bold text-brand-nav-text">
                  {featuredItem.alt}
                </h3>
              </motion.div>
            </div>
          </div>
          <div className="mt-8 flex justify-center items-center gap-2 md:gap-4">
            {galleryItems.slice(0, 5).map((item, index) => {
              // Show first 5 for preview
              const isActive = index === activeIndex;
              return (
                <motion.div
                  key={item.id || index}
                  className="cursor-pointer"
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {item.mediaType === "video" ? (
                    <video
                      src={item.src}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 transition-all duration-300 ${
                        isActive
                          ? "border-brand-accent scale-110"
                          : "border-white/50 opacity-60 hover:opacity-100"
                      }`}
                      muted
                      onError={(e) => {
                        console.error(
                          "Video thumbnail failed to load:",
                          item.src
                        );
                      }}
                    />
                  ) : (
                    <img
                      src={item.thumbnail || item.poster}
                      alt={item.alt}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 transition-all duration-300 ${
                        isActive
                          ? "border-brand-accent scale-110"
                          : "border-white/50 opacity-60 hover:opacity-100"
                      }`}
                      onError={(e) => {
                        console.error(
                          "Image thumbnail failed to load:",
                          item.src
                        );
                        e.target.src = "/logo-placeholder.svg";
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
        <div className="text-center mt-12">
          <Link to="/gallery">
            <AnimatedButton className="inline-flex items-center gap-2">
              <span>Explore Full Gallery</span>
              <FaArrowRight />
            </AnimatedButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;
