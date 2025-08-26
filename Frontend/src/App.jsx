// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import AcademicsPage from "./pages/AcademicsPage";
import FacultyPage from "./pages/FacultyPage";
import GalleryPage from "./pages/GalleryPage";
import ContactPage from "./pages/ContactPage";
import AllAchieversPage from "./pages/AllAchieversPage";
import NotFoundPage from "./pages/NotFoundPage";

// --- Import Admin Panel Components ---
import { AuthProvider } from "./admin/context/AuthContext";
import AdminLogin from "./admin/pages/AdminLogin";
import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/AdminDashboard";
import ManageFaculty from "./admin/pages/ManageFaculty";
import ManageGallery from "./admin/pages/ManageGallery";
// import ManageAchievements from "./admin/pages/ManageAchievements";
import ManageTestimonials from "./admin/pages/ManageTestimonials";

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* --- Public School Website Routes --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="academics" element={<AcademicsPage />} />
          <Route path="faculty" element={<FacultyPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="achievements" element={<AllAchieversPage />} />
        </Route>

        {/* --- Admin Panel Routes --- */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="" element={<AdminDashboard />} />
          <Route path="faculty" element={<ManageFaculty />} />
          <Route path="gallery" element={<ManageGallery />} />
          {/* <Route path="achievements" element={<ManageAchievements />} /> */}
          <Route path="testimonials" element={<ManageTestimonials />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
