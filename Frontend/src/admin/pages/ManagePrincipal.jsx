import React, { useState, useEffect } from "react";
import {
  FaSave,
  FaSpinner,
  FaImage,
  FaEye,
  FaQuoteLeft,
  FaUserTie,
  FaPen,
  FaLightbulb,
  FaCheckCircle,
  FaCamera,
  FaUndo,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { compressImage } from "../../utils/compressImage";

const ManagePrincipal = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    welcomeMessage: "",
  });
  const [currentImage, setCurrentImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [lastSaved, setLastSaved] = useState(null);
  const { getToken } = useAuth();

  useEffect(() => {
    fetchPrincipalMessage();
  }, []);

  const fetchPrincipalMessage = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/principal-message");
      if (response.ok) {
        const data = await response.json();
        setFormData({
          name: data.name || "",
          title: data.title || "",
          welcomeMessage: data.welcomeMessage || "",
        });
        setCurrentImage(data.imageUrl || null);
        if (data.updatedAt) {
          setLastSaved(new Date(data.updatedAt));
        }
      }
    } catch (err) {
      console.error("Error fetching principal message:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setSelectedFile(compressed);
        setPreview(URL.createObjectURL(compressed));
      } catch (err) {
        console.error("Compression error:", err);
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formData.name.trim() || !formData.welcomeMessage.trim()) {
      setError("Name and welcome message are required.");
      return;
    }

    try {
      setSaving(true);
      const token = getToken();
      const data = new FormData();
      data.append("name", formData.name);
      data.append("title", formData.title);
      data.append("welcomeMessage", formData.welcomeMessage);
      if (selectedFile) {
        data.append("image", selectedFile);
      }

      const response = await fetch("/api/principal-message", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: data,
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Failed to save");
      }

      const result = await response.json();
      setCurrentImage(result.imageUrl || currentImage);
      setSelectedFile(null);
      setPreview(null);
      setLastSaved(new Date());
      setSuccess("Principal message updated successfully!");
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FaSpinner className="animate-spin text-3xl text-gray-500" />
      </div>
    );
  }

  const displayImage = preview || currentImage;
  const wordCount = formData.welcomeMessage
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      {/* <div className="bg-gradient-to-r from-brand-dark to-brand-dark/80 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/10 rounded-xl">
              <FaUserTie className="text-2xl" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Principal's Message</h1>
              <p className="text-white/70 text-sm mt-1">
                Manage the welcome message displayed on the homepage
              </p>
            </div>
          </div>
          {lastSaved && (
            <div className="text-xs text-white/50 flex items-center gap-1.5">
              <FaCheckCircle />
              Last saved:{" "}
              {lastSaved.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          )}
        </div>
      </div> */}

      {/* Alerts */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg text-sm">
          <span className="font-semibold">Error: </span>
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-r-lg text-sm flex items-center gap-2">
          <FaCheckCircle />
          {success}
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column - Edit Form */}
        <div className="xl:col-span-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Photo Upload Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <FaCamera className="text-brand-accent" />
                  <h2 className="font-semibold text-gray-800">
                    Profile Photo
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50 border-2 border-gray-200 flex-shrink-0 shadow-inner">
                      {displayImage ? (
                        <img
                          src={displayImage}
                          alt="Principal"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                          <FaImage size={32} />
                          <span className="text-[10px] mt-1">No Photo</span>
                        </div>
                      )}
                    </div>
                    {preview && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs flex items-center justify-center hover:bg-red-600 shadow-md"
                        title="Remove selected image"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div className="flex-1 space-y-3">
                    <div>
                      <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-dark text-white rounded-lg hover:bg-opacity-90 cursor-pointer transition-colors text-sm font-medium">
                        <FaCamera />
                        Choose Photo
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">
                      Accepted formats: JPEG, PNG, GIF, WEBP
                    </p>
                    <p className="text-xs text-gray-400">
                      Max file size: 5MB. Square image (1:1) recommended for
                      best results.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Details Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <FaPen className="text-brand-accent text-sm" />
                  <h2 className="font-semibold text-gray-800">
                    Personal Details
                  </h2>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Dr. Alok Gupta"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title / Designation
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g. Principal, OSVSR School"
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Welcome Message Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FaQuoteLeft className="text-brand-accent text-sm" />
                    <h2 className="font-semibold text-gray-800">
                      Welcome Message
                    </h2>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{formData.welcomeMessage.length} chars</span>
                    <span className="text-gray-300">|</span>
                    <span>{wordCount} words</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <textarea
                  name="welcomeMessage"
                  value={formData.welcomeMessage}
                  onChange={handleChange}
                  rows={10}
                  placeholder="Write the principal's welcome message here... This will be displayed on the homepage for all visitors to read."
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all resize-vertical bg-gray-50 focus:bg-white leading-relaxed"
                  required
                />
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => fetchPrincipalMessage()}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <FaUndo className="text-xs" />
                  Discard Changes
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-8 py-2.5 bg-brand-dark text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 font-medium shadow-sm"
                >
                  {saving ? (
                    <>
                      <FaSpinner className="animate-spin" /> Saving...
                    </>
                  ) : (
                    <>
                      <FaSave /> Publish Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Column - Preview & Tips */}
        <div className="xl:col-span-4 space-y-6">
          {/* Live Preview */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-6">
            <div className="px-5 py-3.5 bg-gradient-to-r from-brand-accent/10 to-transparent border-b border-gray-100">
              <div className="flex items-center gap-2">
                <FaEye className="text-brand-accent" />
                <h3 className="font-semibold text-gray-800 text-sm">
                  Live Preview
                </h3>
              </div>
            </div>

            <div className="p-5">
              {/* Preview Card */}
              <div className="bg-gradient-to-br from-brand-light to-white rounded-xl p-5 border border-gray-100">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-brand-accent/30 mx-auto shadow-lg">
                    {displayImage ? (
                      <img
                        src={displayImage}
                        alt="Principal preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300">
                        <FaUserTie size={28} />
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-center mb-3">
                  <h4 className="text-xs font-semibold text-brand-accent uppercase tracking-wider mb-0.5">
                    From the Principal's Desk
                  </h4>
                  <p className="text-base font-bold text-gray-800">
                    {formData.name || "Principal Name"}
                  </p>
                  {formData.title && (
                    <p className="text-[11px] text-gray-500 mt-0.5">
                      {formData.title}
                    </p>
                  )}
                </div>

                <div className="relative bg-white rounded-lg p-3 border border-gray-100">
                  <FaQuoteLeft className="absolute top-2 left-2 text-brand-accent/15 text-sm" />
                  <p className="text-[11px] text-gray-600 leading-relaxed pl-5 line-clamp-8">
                    {formData.welcomeMessage ||
                      "The welcome message will appear here once you start typing..."}
                  </p>
                </div>
              </div> 
            </div>
          </div>

          {/* Writing Tips */}
          {/* <div className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 bg-amber-100/50 border-b border-amber-200">
              <div className="flex items-center gap-2">
                <FaLightbulb className="text-amber-600" />
                <h3 className="font-semibold text-amber-800 text-sm">
                  Writing Tips
                </h3>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3 text-xs text-amber-800">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    1
                  </span>
                  <span>
                    Start with a warm, welcoming greeting to visitors and
                    parents
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    2
                  </span>
                  <span>
                    Highlight the school's values, vision, and academic
                    philosophy
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    3
                  </span>
                  <span>
                    Mention key achievements or what sets the school apart
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    4
                  </span>
                  <span>
                    End with an invitation or encouraging message for
                    prospective families
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0 text-[10px] font-bold mt-0.5">
                    5
                  </span>
                  <span>Keep it between 150–400 words for best readability</span>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ManagePrincipal;