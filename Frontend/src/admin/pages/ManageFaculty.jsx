import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUser,
  FaSearch,
  FaUndo,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const API = "/api";

// Use API for all faculty endpoints, and BASE for image/media URLs

const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const { authenticatedFetch } = useAuth();

  // Fetch faculty members from API
  useEffect(() => {
    fetchFaculty();
    fetchDepartments();
  }, [pagination.currentPage, searchTerm, selectedDepartment]);

  const fetchFaculty = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.currentPage.toString(),
        limit: pagination.itemsPerPage.toString(),
      });

      if (searchTerm) {
        queryParams.append("search", searchTerm);
      }

      if (selectedDepartment) {
        queryParams.append("department", selectedDepartment);
      }

      const response = await authenticatedFetch(
        `${API}/faculty?${queryParams}`
      );

      if (response.ok) {
        const data = await response.json();
        setFaculty(data.data);
        setPagination(data.pagination);
        setError(null); // Clear any previous errors
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error("API Error Response:", errorData);
        setError(
          errorData.message ||
            `Failed to fetch faculty members (${response.status})`
        );
      }
    } catch (err) {
      console.error("Network Error:", err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await authenticatedFetch(`${API}/faculty/departments`);

      if (response.ok) {
        const data = await response.json();
        setDepartments(data.data);
      }
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const handleAdd = () => {
    setEditingFaculty(null);
    setIsModalOpen(true);
  };

  const handleEdit = (facultyMember) => {
    setEditingFaculty(facultyMember);
    setIsModalOpen(true);
  };

  const handleDelete = async (facultyToDelete) => {
    if (
      window.confirm(
        `Are you sure you want to delete "${facultyToDelete.name}"?`
      )
    ) {
      try {
        const response = await authenticatedFetch(
          `${API}/faculty/${facultyToDelete.id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          fetchFaculty(); // Refresh the list
        } else {
          setError("Failed to delete faculty member");
        }
      } catch (err) {
        setError("Error deleting faculty member");
        console.error("Error:", err);
      }
    }
  };

  const handleSave = async (facultyData) => {
    try {
      const method = editingFaculty ? "PUT" : "POST";
      const url = editingFaculty
        ? `${API}/faculty/${editingFaculty.id}`
        : `${API}/faculty`;

      // Determine if we're sending FormData or regular JSON
      const isFormData = facultyData instanceof FormData;

      const requestOptions = {
        method,
      };

      // If it's not FormData, add JSON content type and stringify the body
      if (!isFormData) {
        requestOptions.headers = {
          "Content-Type": "application/json",
        };
        requestOptions.body = JSON.stringify(facultyData);
      } else {
        // For FormData, just set the body directly
        requestOptions.body = facultyData;
      }

      const response = await authenticatedFetch(url, requestOptions);

      if (response.ok) {
        setIsModalOpen(false);
        setEditingFaculty(null);
        fetchFaculty(); // Refresh the list
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to save faculty member");
      }
    } catch (err) {
      setError("Error saving faculty member");
      console.error("Error:", err);
    }
  };

  const handlePageChange = (page) => {
    setPagination((prev) => ({ ...prev, currentPage: page }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedDepartment("");
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-brand-dark">Manage Faculty</h1>
        <button
          onClick={handleAdd}
          className="bg-brand-dark text-white px-6 py-2 rounded-lg hover:bg-opacity-90 flex items-center space-x-2 transition-colors"
        >
          <FaPlus />
          <span>Add Faculty Member</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Search and Filter */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search faculty members..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              />
            </div>
          </div>
          <div className="md:w-64">
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          {(searchTerm || selectedDepartment) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center space-x-2"
            >
              <FaUndo />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Faculty List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark"></div>
          </div>
        ) : faculty.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FaUser className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p>No faculty members found.</p>
            {(searchTerm || selectedDepartment) && (
              <p className="text-sm">Try adjusting your search or filters.</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {faculty.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {member.image ? (
                            <img
                              src={
                                /^https?:\/\//.test(member.image)
                                  ? member.image
                                  : member.image.startsWith("/")
                                  ? member.image
                                  : `/${member.image}`
                              }
                              alt={member.name}
                              className="h-10 w-10 rounded-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                          ) : null}
                          <div
                            className={`h-10 w-10 rounded-full bg-brand-dark/10 flex items-center justify-center ${
                              member.image ? "hidden" : ""
                            }`}
                          >
                            <FaUser className="h-5 w-5 text-brand-dark" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {member.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {member.title || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {member.department || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.created_at
                        ? new Date(member.created_at).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-brand-dark hover:text-brand-accent p-2 rounded-full hover:bg-gray-100"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          className="text-red-600 hover:text-red-700 p-2 rounded-full hover:bg-red-50"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-700">
            <span>
              Showing{" "}
              {(pagination.currentPage - 1) * pagination.itemsPerPage + 1} to{" "}
              {Math.min(
                pagination.currentPage * pagination.itemsPerPage,
                pagination.totalItems
              )}{" "}
              of {pagination.totalItems} results
            </span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {[...Array(pagination.totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-2 rounded-md ${
                  pagination.currentPage === i + 1
                    ? "bg-brand-dark text-white"
                    : "bg-white border border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <FacultyModal
            facultyMember={editingFaculty}
            onSave={handleSave}
            onClose={() => {
              setIsModalOpen(false);
              setEditingFaculty(null);
            }}
            departments={departments}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Faculty Modal Component
const FacultyModal = ({ facultyMember, onSave, onClose, departments }) => {
  const [formData, setFormData] = useState({
    name: facultyMember?.name || "",
    title: facultyMember?.title || "",
    department: facultyMember?.department || "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    facultyMember?.image || null
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("department", formData.department);

    if (selectedImage) {
      formDataToSend.append("image", selectedImage);
    }

    await onSave(formDataToSend);
    setSaving(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        alert("Image file size should be less than 5MB");
        return;
      }

      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(facultyMember?.image || null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">
          {facultyMember ? "Edit Faculty Member" : "Add New Faculty Member"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              placeholder="Enter faculty name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              placeholder="e.g., Professor, Assistant Professor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Department
            </label>
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
              list="departments"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent"
              placeholder="e.g., Computer Science, Mathematics"
            />
            <datalist id="departments">
              {departments.map((dept) => (
                <option key={dept} value={dept} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profile Photo
            </label>
            <div className="space-y-3">
              {imagePreview && (
                <div className="relative inline-block">
                  <img
                    src={
                      imagePreview?.startsWith("data:")
                        ? imagePreview
                        : imagePreview
                        ? (/^https?:\/\//.test(imagePreview)
                            ? imagePreview
                            : imagePreview.startsWith("/")
                            ? imagePreview
                            : `/${imagePreview}`)
                        : ""
                    }
                    alt="Preview"
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  {selectedImage && (
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 text-xs"
                    >
                      ×
                    </button>
                  )}
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-accent focus:border-transparent file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:bg-brand-accent file:text-white hover:file:bg-opacity-90"
              />
              <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, GIF (Max: 5MB)
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="bg-brand-dark text-white px-6 py-2 rounded-lg hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ManageFaculty;
