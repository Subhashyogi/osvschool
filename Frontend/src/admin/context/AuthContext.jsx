import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Function to handle logout with optional message
  const handleLogout = (message = null) => {
    // Clear localStorage
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    setUser(null);

    // Show message if provided
    if (message) {
      // Store message temporarily for display on login page
      sessionStorage.setItem("logoutMessage", message);
    }

    navigate("/admin/login");
  };

  // Enhanced fetch wrapper that handles token expiration
  const authenticatedFetch = async (url, options = {}) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      handleLogout("Please login to continue");
      throw new Error("No authentication token");
    }

    const headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Check for token expiration
      if (response.status === 401) {
        handleLogout("Your session has expired. Please login again.");
        throw new Error("Token expired");
      }

      return response;
    } catch (error) {
      // If it's a network error and we get a 401, handle it
      if (
        error.message.includes("401") ||
        error.message.includes("Unauthorized")
      ) {
        handleLogout("Your session has expired. Please login again.");
      }
      throw error;
    }
  };

  // Check localStorage on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const userData = localStorage.getItem("adminUser");

        if (token && userData) {
          // Verify token is still valid
          try {
            const response = await fetch(
              "http://localhost:4000/api/auth/verify",
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            );

            if (response.ok) {
              const parsedUser = JSON.parse(userData);
              setUser(parsedUser);

              // If user is on login page but is authenticated, redirect to dashboard
              if (window.location.pathname === "/admin/login") {
                navigate("/admin");
              }
            } else if (response.status === 401) {
              // Token is expired/invalid
              handleLogout("Your session has expired. Please login again.");
            } else {
              // Other error, clear localStorage
              localStorage.removeItem("adminToken");
              localStorage.removeItem("adminUser");

              // Redirect to login if trying to access admin pages
              const currentPath = window.location.pathname;
              if (
                currentPath.startsWith("/admin") &&
                currentPath !== "/admin/login"
              ) {
                navigate("/admin/login");
              }
            }
          } catch (networkError) {
            // If there's a network error, still use cached user data
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);

            if (window.location.pathname === "/admin/login") {
              navigate("/admin");
            }
          }
        } else {
          // If no token but user is trying to access admin pages, redirect to login
          const currentPath = window.location.pathname;
          if (
            currentPath.startsWith("/admin") &&
            currentPath !== "/admin/login"
          ) {
            navigate("/admin/login");
          }
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        // Clear potentially corrupted data
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");

        // Redirect to login if trying to access admin pages
        const currentPath = window.location.pathname;
        if (
          currentPath.startsWith("/admin") &&
          currentPath !== "/admin/login"
        ) {
          navigate("/admin/login");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const login = (userData, token) => {
    // Store token and user data in localStorage
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminUser", JSON.stringify(userData));

    setUser(userData);
    navigate("/admin");
  };

  const logout = () => {
    handleLogout();
  };

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  const value = {
    user,
    login,
    logout,
    isLoading,
    getToken,
    authenticatedFetch,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
