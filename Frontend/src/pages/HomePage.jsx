import React from "react";
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
