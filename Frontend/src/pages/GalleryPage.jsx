import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import { FaPlay, FaImage, FaSpinner } from "react-icons/fa";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Video from "yet-another-react-lightbox/plugins/video";
import videoThumb from "../assets/videoThumb.png";

const filters = ["All", "Photos", "Videos"];

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch gallery items from API
  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "/api/gallery"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch gallery items");
        }

        const data = await response.json();

        // Transform API data to match lightbox format
        const origin = window.location.origin;
        const transformedItems = data.map((item) => {
          const fullMediaUrl = item.mediaUrl.startsWith("http")
            ? item.mediaUrl
            : `${origin}/${item.mediaUrl}`;

          if (item.mediaType === "image") {
            return {
              src: fullMediaUrl,
              alt: item.title,
              description: item.description,
              type: "image",
              thumbnail: fullMediaUrl,
            };
          } else {
            return {
              type: "video",
              sources: [
                {
                  src: fullMediaUrl,
                  type: "video/mp4",
                },
              ],
              poster: videoThumb,
              thumbnail: videoThumb,
              alt: item.title,
              description: item.description,
            };
          }
        });

        setGalleryItems(transformedItems);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching gallery:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGalleryItems();
  }, []);

  const filteredItems = useMemo(() => {
    if (activeFilter === "All") return galleryItems;
    const type = activeFilter === "Photos" ? "image" : "video";
    return galleryItems.filter((item) => item.type === type);
  }, [activeFilter, galleryItems]);

  const openLightbox = (clickedItem) => {
    const originalIndex = filteredItems.findIndex(
      (item) =>
        item.src === clickedItem.src ||
        (item.sources &&
          clickedItem.sources &&
          item.sources[0].src === clickedItem.sources[0].src)
    );
    if (originalIndex > -1) setLightboxIndex(originalIndex);
  };

  // Loading state
  if (loading) {
    return (
      <div className="bg-brand-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-brand-accent mb-4 mx-auto" />
          <p className="text-brand-dark">Loading gallery...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-brand-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-brand-dark mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-brand-muted mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-brand-accent text-white px-6 py-2 rounded-lg hover:bg-brand-accent/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>School Gallery - OSV School | Campus Life & Events</title>
        <meta name="description" content="Explore our vibrant school gallery showcasing campus life, academic events, cultural celebrations, and memorable moments at OSV School. View photos and videos of our dynamic learning environment." />
        <meta name="keywords" content="OSV School gallery, campus photos, school events, academic activities, cultural celebrations, school life, campus events, student activities" />
        <meta name="author" content="OSV School" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://osvschool.netlify.app/gallery" />
        <meta property="og:title" content="School Gallery - OSV School | Campus Life & Events" />
        <meta property="og:description" content="Explore our vibrant school gallery showcasing campus life, academic events, cultural celebrations, and memorable moments at OSV School. View photos and videos of our dynamic learning environment." />
        <meta property="og:image" content="https://osvschool.netlify.app/assets/og-images/og-gallery.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="OSV School" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://osvschool.netlify.app/gallery" />
        <meta property="twitter:title" content="School Gallery - OSV School | Campus Life & Events" />
        <meta property="twitter:description" content="Explore our vibrant school gallery showcasing campus life, academic events, cultural celebrations, and memorable moments at OSV School. View photos and videos of our dynamic learning environment." />
        <meta property="twitter:image" content="https://osvschool.netlify.app/assets/og-images/og-gallery.png" />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://osvschool.netlify.app/gallery" />
      </Helmet>
      <div
        className="relative pt-32 md:pt-40 pb-20 md:pb-24 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/80"></div>
        <div className="relative container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-extrabold text-brand-light"
          >
            Campus Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-brand-nav-muted"
          >
            Explore the moments that define the OSVSR experience.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex justify-center flex-wrap gap-3 md:gap-6 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 text-sm md:text-md font-semibold rounded-full transition-colors duration-300 relative focus:outline-none ${
                activeFilter === filter
                  ? "text-brand-dark"
                  : "text-brand-muted hover:text-brand-dark"
              }`}
            >
              {filter}
              {activeFilter === filter && (
                <motion.div
                  className="absolute bottom-[-4px] left-0 right-0 h-1 bg-brand-accent rounded-full"
                  layoutId="gallery-underline"
                />
              )}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4"
        >
          <AnimatePresence>
            {filteredItems.length === 0 ? (
              <div className="col-span-full">
                {/* Default image when gallery is empty */}
                <div className="flex justify-center mb-8">
                  <div className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg max-w-md">
                    <img
                      src="/principal.jpg"
                      alt="OSVSR School"
                      className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300?text=OSVSR+School";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <FaImage className="text-4xl mb-2" />
                      <p className="font-bold text-center">OSVSR School</p>
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-gray-400 text-6xl mb-4">
                    <FaImage />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    No{" "}
                    {activeFilter === "All"
                      ? "media"
                      : activeFilter.toLowerCase()} {" "}
                    found
                  </h3>
                  <p className="text-brand-muted">
                    {activeFilter === "All"
                      ? "More gallery items will be added soon."
                      : `No ${activeFilter.toLowerCase()} available at the moment.`}
                  </p>
                </div>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <motion.div
                  key={item.src || item.sources?.[0]?.src || index}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="group relative cursor-pointer overflow-hidden rounded-xl shadow-lg aspect-w-4 aspect-h-3"
                  onClick={() => openLightbox(item)}
                >
                  <img
                    src={item.thumbnail || item.poster || item.src}
                    alt={item.alt}
                    className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Found";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-brand-accent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    <div className="text-2xl sm:text-4xl mb-2">
                      {item.type === "video" ? <FaPlay /> : <FaImage />}
                    </div>
                    <p className="font-bold text-center text-xs sm:text-sm line-clamp-2">
                      {item.alt}
                    </p>
                    {item.description && (
                      <p className="text-center text-xs text-brand-accent/80 mt-1 line-clamp-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <Lightbox
        plugins={[Video]}
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={filteredItems}
        styles={{
          container: { backgroundColor: "rgba(33, 37, 41, .95)" },
        }}
      />
    </div>
  );
};

export default GalleryPage;
