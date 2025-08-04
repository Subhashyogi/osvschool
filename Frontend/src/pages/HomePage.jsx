import React from "react";
import { Helmet } from "react-helmet";
import Hero from "../components/sections/Hero";
import Pillars from "../components/sections/Pillars";
import PrincipalWelcome from "../components/sections/PrincipalWelcome";
import Achievers from "../components/sections/Achievers";
import Statistics from "../components/sections/Statistics";
import Programs from "../components/sections/Programs";
import CampusLife from "../components/sections/CampusLife";
import Testimonials from "../components/sections/Testimonials";
import GalleryPreview from "../components/sections/GalleryPreview";
import NewsEvents from "../components/sections/NewsEvents";
import InstagramFeed from "../components/sections/InstagramFeed";

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>OSV School - Excellence in Education Since 1985</title>
        <meta name="description" content="OSV School offers comprehensive education from kindergarten to higher secondary. Discover our academic programs, world-class facilities, and commitment to nurturing future leaders." />
        <meta name="keywords" content="OSV School, education, academic excellence, science programs, mathematics, arts, commerce, computer labs, science labs, school facilities" />
        <meta name="author" content="OSV School" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://osvschool.netlify.app/" />
        <meta property="og:title" content="OSV School - Excellence in Education Since 1985" />
        <meta property="og:description" content="OSV School offers comprehensive education from kindergarten to higher secondary. Discover our academic programs, world-class facilities, and commitment to nurturing future leaders." />
        <meta property="og:image" content="https://osvschool.netlify.app/assets/og-images/og-home.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="OSV School" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://osvschool.netlify.app/" />
        <meta property="twitter:title" content="OSV School - Excellence in Education Since 1985" />
        <meta property="twitter:description" content="OSV School offers comprehensive education from kindergarten to higher secondary. Discover our academic programs, world-class facilities, and commitment to nurturing future leaders." />
        <meta property="twitter:image" content="https://osvschool.netlify.app/assets/og-images/og-home.png" />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://osvschool.netlify.app/" />
      </Helmet>

      <Hero />
      <Pillars />
      <Statistics />
      <PrincipalWelcome />
      <Programs />
      <CampusLife />
      {/* <Achievers /> */}
      <Testimonials />
      <GalleryPreview />
      {/* <NewsEvents /> */}
      {/* <InstagramFeed /> */}
    </>
  );
};

export default HomePage;
