import React, { useState, useEffect } from "react";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaImage,
  FaVideo,
  FaUpload,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = getToken();
      // Use the public endpoint to fetch, as it's simpler
      const response = await fetch(`/api/gallery`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Sort by creation date, newest first
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setItems(sortedData);
      } else {
        throw new Error("Failed to fetch gallery items");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenUploadModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemToDelete) => {
    if (window.confirm(`Are you sure you want to delete this media item?`)) {
      try {
        const token = getToken();
        const response = await fetch(`/api/gallery/${itemToDelete.id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setItems((prevItems) =>
            prevItems.filter((item) => item.id !== itemToDelete.id)
          );
        } else {
          throw new Error("Failed to delete item.");
        }
      } catch (err) {
        setError(err.message || "Error deleting gallery item");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      const token = getToken();
      const isEditing = !!editingItem;

      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `/api/gallery/${editingItem.id}` : `/api/gallery`;

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Let the browser set the Content-Type for FormData
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Save operation failed");
      }

      const resultData = await response.json();

      if (isEditing) {
        // Replace the edited item in the list
        setItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editingItem.id ? resultData : item
          )
        );
      } else {
        // Add new items to the top of the list
        const newItems = Array.isArray(resultData.data)
          ? resultData.data
          : [resultData.data];
        setItems((prevItems) => [...newItems, ...prevItems]);
      }

      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError(err.message || "Error saving gallery item");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Gallery</h1>
        <button
          onClick={handleOpenUploadModal}
          className="flex items-center px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          <FaUpload className="mr-2" /> Upload Media
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-lg text-gray-600">
          Loading...
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow group overflow-hidden"
            >
              <div
                className="relative aspect-[4/3] bg-gray-100 cursor-zoom-in"
                onClick={() => setPreviewItem(item)}
                title="Click to preview"
              >
                {item.mediaType === "video" ? (
                  <video
                    src={item.mediaUrl}
                    className="h-full w-full object-cover"
                    preload="metadata"
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={item.mediaUrl}
                    alt={`Gallery item ${item.id}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(item);
                    }}
                    title="Replace"
                    className="p-3 bg-white/80 rounded-full text-blue-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item);
                    }}
                    title="Delete"
                    className="p-3 bg-white/80 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs text-gray-500 capitalize flex items-center gap-2">
                  {item.mediaType === "image" ? <FaImage /> : <FaVideo />}
                  {item.mediaType}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <MediaUploadModal
            item={editingItem}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
          />
        )}
        {previewItem && (
          <PreviewModal
            item={previewItem}
            onClose={() => setPreviewItem(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Form Component for uploading/editing media
const MediaUploadModal = ({ item, onSave, onClose }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // Set initial preview if editing
  useEffect(() => {
    if (item?.mediaUrl) {
      setPreviews([item.mediaUrl]);
    }
  }, [item]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      const newPreviews = files.map((file) => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();

    if (item) {
      // Editing a single file
      formData.append("file", selectedFiles[0]);
    } else {
      // Bulk uploading new files
      selectedFiles.forEach((file) => {
        formData.append("files", file);
      });
    }

    await onSave(formData);
    setIsUploading(false);
  };

  const isEditing = !!item;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {isEditing ? "Replace Media File" : "Upload New Media"}
        </h2>
        <form onSubmit={handleSubmit} className="flex-grow flex flex-col">
          <div className="flex-grow">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {isEditing
                ? "Select Replacement File"
                : "Select Files for Bulk Upload"}
            </label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
              multiple={!isEditing}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:font-semibold file:bg-brand-dark file:text-white hover:file:bg-opacity-90 cursor-pointer"
              required
            />
            {previews.length > 0 && (
              <div className="mt-4 border-t pt-4 max-h-80 overflow-y-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="aspect-square">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6 mt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading || selectedFiles.length === 0}
              className="px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? "Uploading..." : "Save"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ManageGallery;

// Full-screen preview for image/video
const PreviewModal = ({ item, onClose }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const isVideo = item?.mediaType === "video";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.98, opacity: 0 }}
        className="relative max-w-5xl w-[92vw] max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {isVideo ? (
          <video
            src={item.mediaUrl}
            controls
            autoPlay
            className="w-full h-full max-h-[85vh] object-contain rounded-lg bg-black"
          />
        ) : (
          <img
            src={item.mediaUrl}
            alt="Preview"
            className="w-full h-full max-h-[85vh] object-contain rounded-lg bg-black"
            loading="eager"
          />
        )}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-white text-gray-800 rounded-full shadow px-3 py-1 text-sm font-medium"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};
