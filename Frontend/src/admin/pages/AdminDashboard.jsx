import React from 'react';
import StatCard from '../components/StatCard';
import { FaUsers, FaBookOpen, FaImages } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// In a real app, this data would come from an API call
import { facultyMembers, academicPrograms, galleryItems } from '../../constants';

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, {user.name}!</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    icon={<FaUsers className="text-white h-6 w-6" />}
                    title="Total Faculty"
                    value={facultyMembers.length}
                    color="bg-blue-500"
                />
                <StatCard
                    icon={<FaBookOpen className="text-white h-6 w-6" />}
                    title="Academic Programs"
                    value={academicPrograms.length}
                    color="bg-green-500"
                />
                <StatCard
                    icon={<FaImages className="text-white h-6 w-6" />}
                    title="Gallery Items"
                    value={galleryItems.length}
                    color="bg-purple-500"
                />
            </div>

            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Start Guide</h2>
                <p className="text-gray-600">
                    Use the sidebar navigation to manage different sections of the website. You can add, edit, or delete content for the Faculty, Gallery, and more. All changes made here will be reflected on the public school website once connected to a backend database.
                </p>
            </div>
        </div>
    );
};

export default AdminDashboard;