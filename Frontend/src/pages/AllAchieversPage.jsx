import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import { achievers } from "../constants";
import { FaTrophy } from "react-icons/fa";

// A self-contained, reusable card for displaying an achiever.
const AchieverCard = ({ achiever }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl p-6 text-center shadow-lg h-full"
    >
      <img
        src={achiever.image}
        alt={achiever.name}
        className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-brand-accent/50"
      />
      <h3 className="text-xl font-bold text-brand-dark">{achiever.name}</h3>
      <p className="text-brand-muted text-sm mb-4 h-10">
        {achiever.achievement}
      </p>
      <div className="bg-brand-accent/20 text-brand-dark font-semibold py-1 px-3 rounded-full inline-flex items-center gap-2">
        <FaTrophy className="text-brand-accent" />
        <span>{achiever.award}</span>
      </div>
    </motion.div>
  );
};

const AllAchieversPage = () => {
  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>
          Our Achievers - OSV School | Celebrating Student Excellence
        </title>
        <meta
          name="description"
          content="Celebrate the outstanding achievements of OSV School students. Discover our academic champions, sports stars, and talented individuals who have excelled in various competitions and platforms."
        />
        <meta
          name="keywords"
          content="OSV School achievers, student achievements, academic excellence, sports champions, school awards, student success, academic competitions, school achievements"
        />
        <meta name="author" content="OSV School" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://osvschool.in/achievers" />
        <meta
          property="og:title"
          content="Our Achievers - OSV School | Celebrating Student Excellence"
        />
        <meta
          property="og:description"
          content="Celebrate the outstanding achievements of OSV School students. Discover our academic champions, sports stars, and talented individuals who have excelled in various competitions and platforms."
        />
        <meta
          property="og:image"
          content="https://osvschool.in/assets/og-images/og-about.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="OSV School" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://osvschool.in/achievers" />
        <meta
          property="twitter:title"
          content="Our Achievers - OSV School | Celebrating Student Excellence"
        />
        <meta
          property="twitter:description"
          content="Celebrate the outstanding achievements of OSV School students. Discover our academic champions, sports stars, and talented individuals who have excelled in various competitions and platforms."
        />
        <meta
          property="twitter:image"
          content="https://osvschool.in/assets/og-images/og-about.png"
        />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="canonical" href="https://osvschool.in/achievers" />
      </Helmet>
      <header className="pt-32 pb-16 bg-gray-50 text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-brand-dark"
        >
          Our Achievers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-lg text-brand-muted max-w-2xl mx-auto"
        >
          Celebrating the students who have demonstrated excellence and
          dedication on various platforms.
        </motion.p>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievers.map((achiever, index) => (
            <AchieverCard key={index} achiever={achiever} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default AllAchieversPage;
