import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import { FaSpinner, FaUser, FaGraduationCap } from "react-icons/fa";
import FacultyCard from "../components/common/FacultyCard";

const StatCard = ({ number, suffix, label }) => (
  <div className="text-center p-4 bg-white rounded-lg shadow-md">
    <p className="text-4xl md:text-5xl font-bold text-brand-accent">
      <CountUp end={number} duration={3} enableScrollSpy scrollSpyOnce />
      {suffix}
    </p>
    <p className="mt-2 text-brand-muted text-sm md:text-base">{label}</p>
  </div>
);

const FacultyPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [facultyStats, setFacultyStats] = useState({
    totalFaculty: 0,
    departments: 0,
    experience: 15,
    qualifications: 95,
  });
  const [featuredFaculty, setFeaturedFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch faculty data from API
  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        setLoading(true);

        // Fetch all faculty members
        const facultyResponse = await fetch(
          "https://osvschool-backend.onrender.com/api/faculty?limit=100"
        );
        if (!facultyResponse.ok) {
          throw new Error("Failed to fetch faculty members");
        }

        const facultyData = await facultyResponse.json();
        const members = facultyData.data || [];

        // Transform faculty data to include full image URLs
        const transformedMembers = members.map((member) => ({
          ...member,
          image: member.image ? `http://localhost:4000${member.image}` : null,
        }));

        setFacultyMembers(transformedMembers);

        // Calculate departments from faculty data
        const uniqueDepartments = [
          ...new Set(
            members.map((member) => member.department).filter(Boolean)
          ),
        ];
        const departmentList = [
          { name: "All", icon: <FaGraduationCap /> },
          ...uniqueDepartments.map((dept) => ({
            name: dept,
            icon: <FaUser />,
          })),
        ];
        setDepartments(departmentList);

        // Calculate stats
        const stats = {
          totalFaculty: members.length,
          departments: uniqueDepartments.length,
          experience: 15, // Static for now
          qualifications: 95, // Static for now
        };
        setFacultyStats(stats);

        // Set featured faculty (first member or random)
        if (members.length > 0) {
          const featured = members[0];
          setFeaturedFaculty({
            ...featured,
            image: featured.image
              ? `http://localhost:4000${featured.image}`
              : null,
            quote:
              "Education is the most powerful weapon which you can use to change the world.",
          });
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching faculty:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  const filteredFaculty = useMemo(() => {
    if (activeFilter === "All") return facultyMembers;
    return facultyMembers.filter(
      (member) => member.department === activeFilter
    );
  }, [activeFilter, facultyMembers]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-brand-light min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-brand-accent mb-4 mx-auto" />
          <p className="text-brand-dark">Loading faculty...</p>
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
    <div className="bg-brand-light text-brand-dark">
      <div
        className="relative pt-32 md:pt-40 pb-20 md:pb-24 text-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        }}
      >
        <div className="absolute inset-0 bg-brand-dark/80"></div>
        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-brand-light">
            Our Faculty
          </h1>
          <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto text-brand-nav-muted">
            The heart of our institution—a dedicated team of mentors,
            innovators, and scholars.
          </p>
        </div>
      </div>
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <StatCard
              number={facultyStats.totalFaculty}
              suffix=""
              label="Faculty Members"
            />
            <StatCard
              number={facultyStats.departments}
              suffix=""
              label="Departments"
            />
            <StatCard
              number={facultyStats.experience}
              suffix="+"
              label="Years Experience"
            />
            <StatCard
              number={facultyStats.qualifications}
              suffix="%"
              label="Advanced Degrees"
            />
          </div>
        </div>
      </section>
      {/* {featuredFaculty && (
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-dark">
              Faculty Spotlight
            </h2>
            <motion.div
              className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-white p-8 md:p-12 rounded-xl shadow-xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full border-4 border-brand-accent flex-shrink-0 overflow-hidden bg-gray-200">
                {featuredFaculty.image ? (
                  <img
                    src={featuredFaculty.image}
                    alt={featuredFaculty.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full ${
                    featuredFaculty.image ? "hidden" : "flex"
                  } items-center justify-center bg-gray-200`}
                >
                  <FaUser className="text-4xl text-gray-400" />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-brand-dark">
                  {featuredFaculty.name}
                </h3>
                <p className="text-lg md:text-xl text-brand-accent font-semibold mt-1">
                  {featuredFaculty.title}
                </p>
                {featuredFaculty.department && (
                  <p className="text-brand-muted mt-1">
                    {featuredFaculty.department}
                  </p>
                )}
                <p className="mt-4 text-brand-muted leading-relaxed italic">
                  "{featuredFaculty.quote}"
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )} */}
      {/* <section className="py-16 md:py-24 bg-brand-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-brand-accent">
            Meet Our Educators
          </h2>
          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-12">
            {departments.map((department) => (
              <button
                key={department.name}
                onClick={() => setActiveFilter(department.name)}
                className={`flex items-center gap-2 px-4 py-2 text-sm md:text-md font-semibold rounded-full transition-colors duration-300 relative focus:outline-none ${
                  activeFilter === department.name
                    ? "text-brand-accent bg-brand-surface"
                    : "text-brand-nav-muted hover:text-brand-accent"
                }`}
              >
                {department.icon} <span>{department.name}</span>
                {activeFilter === department.name && (
                  <motion.div
                    className="absolute bottom-[-4px] left-2 right-2 h-0.5 bg-brand-accent"
                    layoutId="faculty-underline"
                  />
                )}
              </button>
            ))}
          </div>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredFaculty.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">
                    <FaUser />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-accent mb-2">
                    No faculty members found
                  </h3>
                  <p className="text-brand-nav-muted">
                    {activeFilter === "All"
                      ? "No faculty members available at the moment."
                      : `No faculty members found in ${activeFilter} department.`}
                  </p>
                </div>
              ) : (
                filteredFaculty.map((member, index) => (
                  <FacultyCard
                    key={member.id || member.name}
                    member={member}
                    index={index}
                  />
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section> */}

      <section className="py-20 md:py-28 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- Section Header (Matches website's gradient style) --- */}
          <div className="text-center mb-16">
            {/* <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"> */}
            <h2 className="text-4xl md:text-5xl font-bold text-brand-light">
              Our Guiding Stars
            </h2>
            <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
              Meet the dedicated mentors and brilliant minds shaping the future
              at our school.
            </p>
          </div>

          {/* --- Department Filters (Matches website's button style) --- */}
          <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-16">
            {departments.map((department) => (
              <button
                key={department.name}
                onClick={() => setActiveFilter(department.name)}
                className={`relative flex items-center gap-2 px-5 py-2.5 text-md font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500/50 ${
                  activeFilter === department.name
                    ? "text-white bg-blue-600 shadow-lg shadow-blue-600/30"
                    : "text-gray-300 bg-gray-800/60 hover:bg-gray-700/80 border border-gray-700"
                }`}
              >
                {department.icon} <span>{department.name}</span>
                {activeFilter === department.name && (
                  <motion.div
                    className="absolute -bottom-1.5 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    layoutId="faculty-underline"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* --- Faculty Grid --- */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            <AnimatePresence>
              {filteredFaculty.length > 0 ? (
                filteredFaculty.map((member, index) => (
                  <FacultyCard
                    key={member.id || member.name}
                    member={member}
                    index={index}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <div className="inline-block p-6 bg-gray-800/50 rounded-full mb-6">
                    <FaUsers className="text-gray-500 text-7xl" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Educators Not Found
                  </h3>
                  <p className="text-gray-400">
                    No educators found in the {activeFilter} department.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;
