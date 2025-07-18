import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // In a real app, you'd check localStorage or a cookie for a token
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // In a real app, this would take email/password and call an API
    const login = (userData) => {
        // Mock user data
        setUser({ name: 'Admin User', email: userData.email });
        navigate('/admin/dashboard');
    };

    const logout = () => {
        setUser(null);
        navigate('/admin/login');
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};