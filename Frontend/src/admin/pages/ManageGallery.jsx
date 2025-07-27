import React, { useState, useEffect } from "react";
import { galleryItems as initialGalleryItems } from "../../constants";
import { FaEdit, FaTrash, FaPlus, FaImage, FaVideo } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const ManageGallery = () => {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { getToken } = useAuth();

  // Fetch gallery items from API on component mount
  useEffect(() => {
    fetchGalleryItems();
  }, []);

  const fetchGalleryItems = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const response = await fetch(
        "https://osvschool-backend.onrender.com/api/gallery",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        setError("Failed to fetch gallery items");
      }
    } catch (err) {
      setError("Error fetching gallery items");
      // console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (itemToDelete) => {
    if (
      window.confirm(`Are you sure you want to delete "${itemToDelete.title}"?`)
    ) {
      try {
        const token = getToken();
        const response = await fetch(
          `https://osvschool-backend.onrender.com/api/gallery/${itemToDelete.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          setItems(items.filter((item) => item.id !== itemToDelete.id));
        } else {
          setError("Failed to delete gallery item");
        }
      } catch (err) {
        setError("Error deleting gallery item");
        // console.error("Error:", err);
      }
    }
  };

  const handleSave = async (itemData) => {
    try {
      const token = getToken();
      const method = editingItem ? "PUT" : "POST";
      const url = editingItem
        ? `https://osvschool-backend.onrender.com/api/gallery/${editingItem.id}`
        : "https://osvschool-backend.onrender.com/api/gallery";

      // Check if itemData is FormData (contains file) or regular object
      const isFormData = itemData instanceof FormData;

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type for FormData, let browser set it with boundary
          ...(isFormData ? {} : { "Content-Type": "application/json" }),
        },
        body: isFormData ? itemData : JSON.stringify(itemData),
      });

      if (response.ok) {
        const savedItem = await response.json();
        if (editingItem) {
          setItems(
            items.map((item) => (item.id === editingItem.id ? savedItem : item))
          );
        } else {
          setItems([...items, savedItem]);
        }
        setIsModalOpen(false);
        setError(null);
      } else {
        const errorData = await response.json();
        // console.log("Full error response:", errorData);
        setError(
          `Failed to save gallery item: ${errorData.message || "Unknown error"}`
        );
        // console.error("Save error:", errorData);
      }
    } catch (err) {
      setError("Error saving gallery item");
      // console.error("Error:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Gallery</h1>
        <button
          onClick={handleAdd}
          className="flex items-center px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 transition-colors"
        >
          <FaPlus className="mr-2" /> Add New Item
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-gray-600">Loading gallery items...</div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-lg shadow group overflow-hidden"
            >
              <div className="relative">
                <img
                  src={`https://osvschool-backend.onrender.com/${item.mediaUrl}`}
                  alt={item.title}
                  className="h-48 w-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-4">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-3 bg-white/80 rounded-full text-blue-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
                    className="p-3 bg-white/80 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <p className="text-xs text-gray-500 capitalize flex items-center gap-2 mt-1">
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
          <GalleryForm
            item={editingItem}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Modal Form Component for adding/editing gallery items
const GalleryForm = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: item?.title || "",
    description: item?.description || "",
    mediaType: item?.mediaType || "image",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(
    item?.mediaUrl
      ? `https://osvschool-backend.onrender.com/${item.mediaUrl}`
      : ""
  );
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      // Validate required fields
      if (!formData.title.trim()) {
        alert("Title is required");
        return;
      }

      if (!item && !selectedFile) {
        alert("Please select a file");
        return;
      }

      // For editing without new file, send JSON data
      if (item && !selectedFile) {
        const galleryData = {
          title: formData.title.trim(),
          description: formData.description?.trim() || "",
          mediaType: formData.mediaType,
        };

        onSave(galleryData);
        return;
      }

      // Create FormData to send both file and text data
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title.trim());
      formDataToSend.append("description", formData.description?.trim() || "");
      formDataToSend.append("mediaType", formData.mediaType);

      // Add file if selected
      if (selectedFile) {
        formDataToSend.append("file", selectedFile);
      }

      // Debug: Log all FormData entries
      // for (let pair of formDataToSend.entries()) {
      //   console.log(pair[0] + ": " + pair[1]);
      // }

      onSave(formDataToSend);
    } catch (error) {
      alert("Error preparing form data. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg max-h-full overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {item ? "Edit" : "Add"} Gallery Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter a description for this media item..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Media Type
            </label>
            <select
              name="mediaType"
              value={formData.mediaType}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              {formData.mediaType === "image" ? "Image File" : "Video File"}
            </label>
            <input
              type="file"
              accept={formData.mediaType === "image" ? "image/*" : "video/*"}
              onChange={handleFileChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-brand-dark file:text-white hover:file:bg-opacity-90"
              required={!item} // Required only when adding new item
            />
            {mediaPreview && (
              <div className="mt-2">
                {formData.mediaType === "image" ? (
                  <img
                    src={mediaPreview}
                    alt="Preview"
                    className="h-32 w-32 object-cover rounded-md border-2 border-gray-200"
                  />
                ) : (
                  <video
                    src={mediaPreview}
                    controls
                    className="h-32 w-48 rounded-md border-2 border-gray-200"
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={uploading}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {uploading ? "Uploading..." : "Save Item"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default ManageGallery;
