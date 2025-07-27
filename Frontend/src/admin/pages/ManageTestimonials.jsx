import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaUndo,
  FaTimes,
  FaUser,
  FaQuoteLeft,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
// Make sure to import useAuth from your context file path
// import { useAuth } from "../context/AuthContext";

// --- TestimonialModal Component (Standalone) ---
const TestimonialModal = ({
  showModal,
  setShowModal,
  resetForm,
  editingTestimonial,
  handleSubmit,
  formData,
  handleInputChange,
  handleFileChange,
  imagePreview,
  errors,
  isSubmitting,
}) => (
  <AnimatePresence>
    {showModal && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => {
          // Optional: Close modal on overlay click
          setShowModal(false);
          resetForm();
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">
              {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
            <button
              onClick={() => {
                setShowModal(false);
                resetForm();
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Avatar Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar Photo
              </label>
              <div className="flex items-center space-x-4">
                {imagePreview ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src={imagePreview}
                      alt="Avatar preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
                    <FaUser size={30} className="text-gray-400" />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {errors.avtar && (
                    <p className="mt-1 text-sm text-red-600">{errors.avtar}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title/Position
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="e.g., Parent, Student, Alumni"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Quote */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Quote *
              </label>
              <textarea
                name="quote"
                value={formData.quote}
                onChange={handleInputChange}
                rows={4}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.quote ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter the testimonial quote here..."
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                {formData.quote.length}/1000 characters
              </p>
              {errors.quote && (
                <p className="mt-1 text-sm text-red-600">{errors.quote}</p>
              )}
            </div>

            <div className="flex justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                )}
                {isSubmitting
                  ? "Saving..."
                  : editingTestimonial
                  ? "Update"
                  : "Create"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

// --- Main ManageTestimonials Component ---
const ManageTestimonials = () => {
  // This is a placeholder for your actual auth context
  const { getToken, authenticatedFetch } = useAuth();
  const token = getToken();

  const [testimonials, setTestimonials] = useState([]);

  // **IMPROVED LOADING STATE**
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDeleted, setShowDeleted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    quote: "",
    avtar: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch testimonials from API
  const fetchTestimonials = useCallback(
    async (page = 1, search = "", includeDeleted = false) => {
      if (!token) return;

      setIsFetching(true); // Set fetching for every call

      try {
        const response = await authenticatedFetch(
          `https://osvschool-backend.onrender.com/api/testimonials?page=${page}&limit=10&search=${search}&includeDeleted=${includeDeleted}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch testimonials");
        }

        const data = await response.json();
        setTestimonials(data.testimonials || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setCurrentPage(data.pagination?.currentPage || 1);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
      } finally {
        setIsInitialLoading(false); // Turn off initial loader forever after first fetch
        setIsFetching(false); // Turn off subsequent fetching indicator
      }
    },
    [token, authenticatedFetch]
  );

  // Fetch on mount or when search/filter changes
  useEffect(() => {
    fetchTestimonials(currentPage, debouncedSearchTerm, showDeleted);
  }, [debouncedSearchTerm, showDeleted, fetchTestimonials, currentPage]);

  // Debounce search term to avoid API calls on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on new search
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, avtar: file });
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({ name: "", title: "", quote: "", avtar: null });
    setImagePreview(null);
    setEditingTestimonial(null);
    setErrors({});
    setIsSubmitting(false);
  };

  const handleAddNew = () => {
    resetForm();
    setShowModal(true);
  };

  const handleEdit = (testimonial) => {
    resetForm();
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      title: testimonial.title || "",
      quote: testimonial.quote,
      avtar: null,
    });
    setImagePreview(testimonial.avtar);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isSubmitting) return;
    setIsSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("quote", formData.quote);
    if (formData.avtar) {
      formDataToSend.append("avtar", formData.avtar);
    }

    try {
      const url = editingTestimonial
        ? `https://osvschool-backend.onrender.com/api/testimonials/${editingTestimonial.id}`
        : "https://osvschool-backend.onrender.com/api/testimonials";
      const method = editingTestimonial ? "PUT" : "POST";

      const response = await authenticatedFetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.errors) {
          const newErrors = {};
          errorData.errors.forEach((error) => {
            newErrors[error.path] = error.msg;
          });
          setErrors(newErrors);
        }
        return; // Important: Stop execution if there are errors
      }

      setShowModal(false);
      resetForm();
      fetchTestimonials(currentPage, debouncedSearchTerm, showDeleted);
    } catch (error) {
      console.error("Error saving testimonial:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const performAction = async (
    url,
    method,
    confirmMessage,
    successCallback
  ) => {
    if (window.confirm(confirmMessage)) {
      try {
        const response = await authenticatedFetch(url, { method });
        if (response.ok) {
          successCallback();
        }
      } catch (error) {
        console.error(`Error with action (${method} ${url}):`, error);
      }
    }
  };

  const handleDelete = (id) => {
    performAction(
      `https://osvschool-backend.onrender.com/api/testimonials/${id}`,
      "DELETE",
      "Are you sure you want to delete this testimonial?",
      () => fetchTestimonials(currentPage, debouncedSearchTerm, showDeleted)
    );
  };

  const handleRestore = (id) => {
    performAction(
      `https://osvschool-backend.onrender.com/api/testimonials/${id}/restore`,
      "PUT",
      "Are you sure you want to restore this testimonial?",
      () => fetchTestimonials(currentPage, debouncedSearchTerm, showDeleted)
    );
  };

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Manage Testimonials
        </h1>
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add New
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md w-full">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search testimonials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showDeleted}
                onChange={(e) => setShowDeleted(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Show deleted</span>
            </label>
          </div>
        </div>
      </div>

      {/* **IMPROVED LOADING UI** */}
      {isInitialLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div
          className={`bg-white rounded-lg shadow-sm border overflow-hidden transition-opacity duration-300 ${
            isFetching ? "opacity-50" : "opacity-100"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Person
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quote
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testimonials.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <FaQuoteLeft className="h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          No testimonials found
                        </h3>
                        <p className="text-gray-500 mb-4">
                          {searchTerm || showDeleted
                            ? "No testimonials match your current filters."
                            : "Get started by adding your first testimonial."}
                        </p>
                        {!searchTerm && !showDeleted && (
                          <button
                            onClick={handleAddNew}
                            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
                          >
                            <FaPlus /> Add First Testimonial
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  testimonials.map((testimonial) => (
                    <tr key={testimonial.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {testimonial.avtar ? (
                              <img
                                className="h-10 w-10 rounded-full object-cover"
                                src={testimonial.avtar}
                                alt={testimonial.name}
                              />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <FaUser className="text-gray-500" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {testimonial.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {testimonial.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          <FaQuoteLeft className="inline text-gray-400 mr-2" />
                          {testimonial.quote.length > 100
                            ? `${testimonial.quote.substring(0, 100)}...`
                            : testimonial.quote}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {testimonial.title || "N/A"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {!testimonial.isDeleted ? (
                            <>
                              <button
                                onClick={() => handleEdit(testimonial)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <FaEdit />
                              </button>
                              <button
                                onClick={() => handleDelete(testimonial.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <FaTrash />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => handleRestore(testimonial.id)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <FaUndo />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
              <div>
                <p className="text-sm text-gray-700">
                  Page <span className="font-medium">{currentPage}</span> of{" "}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {[...Array(totalPages).keys()].map((i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === i + 1
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Render the standalone Modal and pass all necessary props */}
      <TestimonialModal
        showModal={showModal}
        setShowModal={setShowModal}
        resetForm={resetForm}
        editingTestimonial={editingTestimonial}
        handleSubmit={handleSubmit}
        formData={formData}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        imagePreview={imagePreview}
        errors={errors}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default ManageTestimonials;
