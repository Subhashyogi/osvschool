import React, { useState } from "react";
import {
  FaLock,
  FaSave,
  FaSpinner,
  FaEye,
  FaEyeSlash,
  FaUserCircle,
  FaShieldAlt,
  FaInfoCircle,
  FaCog,
  FaCheckCircle,
  FaEnvelope,
  FaUser,
  FaKey,
  FaHistory,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

const AdminSettings = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { getToken, user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleShow = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.currentPassword ||
      !formData.newPassword ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    try {
      setSaving(true);
      const token = getToken();

      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password");
      }

      setSuccess("Password changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setSuccess(null), 4000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  // Password strength calculator
  const getPasswordStrength = (password) => {
    if (!password) return { label: "", color: "", width: "0%" };
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1)
      return { label: "Weak", color: "bg-red-500", width: "20%" };
    if (score <= 2)
      return { label: "Fair", color: "bg-orange-500", width: "40%" };
    if (score <= 3)
      return { label: "Good", color: "bg-yellow-500", width: "60%" };
    if (score <= 4)
      return { label: "Strong", color: "bg-green-500", width: "80%" };
    return { label: "Very Strong", color: "bg-green-600", width: "100%" };
  };

  const strength = getPasswordStrength(formData.newPassword);
  const passwordsMatch =
    formData.newPassword &&
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword;

  const renderPasswordField = (label, name, fieldKey, extra) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          type={showPasswords[fieldKey] ? "text" : "password"}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-accent/30 focus:border-brand-accent transition-all bg-gray-50 focus:bg-white"
          required
        />
        <button
          type="button"
          onClick={() => toggleShow(fieldKey)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
        >
          {showPasswords[fieldKey] ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {extra}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      {/* <div className="bg-gradient-to-r from-brand-dark to-brand-dark/80 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-xl">
            <FaCog className="text-2xl" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Account Settings</h1>
            <p className="text-white/70 text-sm mt-1">
              Manage your account security and preferences
            </p>
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="xl:col-span-4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-brand-dark to-brand-dark/90 px-6 pt-8 pb-12 text-center relative">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
                <FaUserCircle className="text-white text-4xl" />
              </div>
            </div>
            <div className="px-6 pb-6 -mt-4">
              <div className="bg-white rounded-xl shadow-md p-4 text-center border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">
                  {user?.username || "Admin"}
                </h3>
                <div className="flex items-center justify-center gap-1.5 mt-1 text-sm text-gray-500">
                  <FaEnvelope className="text-xs" />
                  <span>{user?.email || "No email set"}</span>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                    <FaCheckCircle className="text-[10px]" />
                    Active
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-brand-accent/10 text-brand-accent text-xs font-medium rounded-full">
                    <FaShieldAlt className="text-[10px]" />
                    Admin
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-5 py-3.5 bg-gray-50 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <FaUser className="text-brand-accent text-xs" />
                Account Details
              </h3>
            </div>
            <div className="divide-y divide-gray-50">
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Username</span>
                <span className="text-sm font-medium text-gray-800">
                  {user?.username || "—"}
                </span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Email</span>
                <span className="text-sm font-medium text-gray-800">
                  {user?.email || "—"}
                </span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Role</span>
                <span className="text-sm font-medium text-brand-accent">
                  Administrator
                </span>
              </div>
              <div className="px-5 py-3.5 flex items-center justify-between">
                <span className="text-xs text-gray-500">Status</span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Active
                </span>
              </div>
            </div>
          </div>

          {/* Security Tips */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 bg-blue-100/50 border-b border-blue-200">
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-blue-600" />
                <h3 className="font-semibold text-blue-800 text-sm">
                  Security Tips
                </h3>
              </div>
            </div>
            <div className="p-5">
              <ul className="space-y-3 text-xs text-blue-700">
                <li className="flex items-start gap-2.5">
                  <FaInfoCircle className="mt-0.5 flex-shrink-0" />
                  <span>
                    Use a strong, unique password with at least 8 characters
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FaInfoCircle className="mt-0.5 flex-shrink-0" />
                  <span>
                    Include uppercase, lowercase, numbers, and special
                    characters
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FaInfoCircle className="mt-0.5 flex-shrink-0" />
                  <span>Never share your password with anyone</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <FaInfoCircle className="mt-0.5 flex-shrink-0" />
                  <span>
                    Change your password regularly for better security
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="xl:col-span-8 space-y-6">
          {/* Change Password Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-accent/10 rounded-lg">
                  <FaKey className="text-brand-accent" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    Change Password
                  </h2>
                  <p className="text-xs text-gray-500">
                    Update your admin panel account password
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg mb-5 text-sm flex items-center gap-2">
                  <FaExclamationTriangle className="flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {success && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded-r-lg mb-5 text-sm flex items-center gap-2">
                  <FaCheckCircle className="flex-shrink-0" />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Current Password */}
                {renderPasswordField(
                  "Current Password",
                  "currentPassword",
                  "current"
                )}

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="text-xs text-gray-400 font-medium">
                    New Password
                  </span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                {/* New Password + Confirm side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {renderPasswordField(
                    "New Password",
                    "newPassword",
                    "new",
                    formData.newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-gray-500">
                            Password strength
                          </span>
                          <span
                            className={`text-[10px] font-medium ${
                              strength.color === "bg-red-500"
                                ? "text-red-600"
                                : strength.color === "bg-orange-500"
                                ? "text-orange-600"
                                : strength.color === "bg-yellow-500"
                                ? "text-yellow-600"
                                : "text-green-600"
                            }`}
                          >
                            {strength.label}
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${strength.color} rounded-full transition-all duration-300`}
                            style={{ width: strength.width }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}

                  {renderPasswordField(
                    "Confirm Password",
                    "confirmPassword",
                    "confirm",
                    formData.confirmPassword && (
                      <div className="mt-2 flex items-center gap-1.5">
                        {passwordsMatch ? (
                          <>
                            <FaCheckCircle className="text-green-500 text-xs" />
                            <span className="text-[10px] text-green-600">
                              Passwords match
                            </span>
                          </>
                        ) : (
                          <>
                            <FaExclamationTriangle className="text-red-500 text-xs" />
                            <span className="text-[10px] text-red-600">
                              Passwords don't match
                            </span>
                          </>
                        )}
                      </div>
                    )
                  )}
                </div>

                {/* Requirements */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-xs font-semibold text-gray-600 mb-2">
                    Password Requirements
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      {
                        check: formData.newPassword.length >= 6,
                        text: "At least 6 characters",
                      },
                      {
                        check: /[A-Z]/.test(formData.newPassword),
                        text: "One uppercase letter",
                      },
                      {
                        check: /[0-9]/.test(formData.newPassword),
                        text: "One number",
                      },
                      {
                        check: /[^A-Za-z0-9]/.test(formData.newPassword),
                        text: "One special character",
                      },
                    ].map((req, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-2 text-xs ${
                          formData.newPassword
                            ? req.check
                              ? "text-green-600"
                              : "text-gray-400"
                            : "text-gray-400"
                        }`}
                      >
                        <FaCheckCircle
                          className={`text-[10px] ${
                            formData.newPassword && req.check
                              ? "text-green-500"
                              : "text-gray-300"
                          }`}
                        />
                        {req.text}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                      setError(null);
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <FaHistory className="text-xs" />
                    Reset Form
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-2.5 bg-brand-dark text-white rounded-lg hover:bg-opacity-90 transition-all disabled:opacity-50 font-medium shadow-sm"
                  >
                    {saving ? (
                      <>
                        <FaSpinner className="animate-spin" /> Updating...
                      </>
                    ) : (
                      <>
                        <FaLock /> Update Password
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Session Info Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
              <h3 className="font-semibold text-gray-800 text-sm flex items-center gap-2">
                <FaHistory className="text-brand-accent text-xs" />
                Session Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaShieldAlt className="text-brand-accent text-sm" />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">Auth Method</p>
                  <p className="text-sm font-semibold text-gray-800">
                    JWT Token
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">
                    Session Status
                  </p>
                  <p className="text-sm font-semibold text-green-600">Active</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <FaUser className="text-purple-600 text-sm" />
                  </div>
                  <p className="text-xs text-gray-500 mb-0.5">Access Level</p>
                  <p className="text-sm font-semibold text-purple-600">
                    Full Access
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
