import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ icon, title, value, color }) => {
    return (
        <motion.div
            className="p-6 bg-white rounded-lg shadow-md flex items-center"
            whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
        >
            <div className={`p-3 rounded-full mr-4 ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-800">{value}</p>
            </div>
        </motion.div>
    );
};

export default StatCard;