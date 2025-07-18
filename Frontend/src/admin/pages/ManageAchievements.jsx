import React, { useState } from 'react';
import { achievers as initialAchievements } from '../../constants';
import { FaEdit, FaTrash, FaPlus, FaTrophy, FaAward } from 'react-icons/fa';

const ManageAchievements = () => {
    const [achievements, setAchievements] = useState(initialAchievements);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAchievement, setEditingAchievement] = useState(null);

    const handleAdd = () => {
        setEditingAchievement(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingAchievement(item);
        setIsModalOpen(true);
    };

    const handleDelete = (itemName) => {
        if (window.confirm(`Are you sure you want to delete the achievement for ${itemName}?`)) {
            setAchievements(achievements.filter(item => item.name !== itemName));
        }
    };

    const handleSave = (itemData) => {
        if (editingAchievement) {
            setAchievements(achievements.map(item => item.name === editingAchievement.name ? { ...item, ...itemData } : item));
        } else {
            setAchievements([...achievements, itemData]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Manage Achievements</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 w-full md:w-auto"
                >
                    <FaPlus className="mr-2" /> Add New Achievement
                </button>
            </div>

            {/* Desktop Table View */}
            <div className="bg-white rounded-lg shadow overflow-x-auto hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achiever</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Achievement</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Award</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {achievements.map((item) => (
                            <tr key={item.name}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full object-cover" src={item.image} alt={item.name} />
                                        <div className="ml-4 text-sm font-medium text-gray-900">{item.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.achievement}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.award}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                    <button onClick={() => handleDelete(item.name)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {achievements.map((item) => (
                    <div key={item.name} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-4 mb-4">
                            <img className="h-16 w-16 rounded-full object-cover" src={item.image} alt={item.name} />
                            <p className="text-lg font-bold text-gray-900">{item.name}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-sm text-gray-600 flex items-start gap-2"><FaTrophy className="mt-1 text-gray-400 flex-shrink-0" /> {item.achievement}</p>
                            <p className="text-sm text-gray-500 flex items-start gap-2"><FaAward className="mt-1 text-gray-400 flex-shrink-0" /> {item.award}</p>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4 pt-4 border-t">
                            <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm"><FaEdit /> Edit</button>
                            <button onClick={() => handleDelete(item.name)} className="text-red-600 hover:text-red-900 flex items-center gap-1 text-sm"><FaTrash /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {isModalOpen && <AchievementForm item={editingAchievement} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

// Modal Form Component for adding/editing achievements
const AchievementForm = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        image: item?.image || '',
        achievement: item?.achievement || '',
        award: item?.award || '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg max-h-full overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{item ? 'Edit' : 'Add'} Achievement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Achiever's Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Achiever's Photo URL</label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="https://example.com/photo.jpg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Achievement Description</label>
                        <input type="text" name="achievement" value={formData.achievement} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Award / Recognition</label>
                        <input type="text" name="award" value={formData.award} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ManageAchievements;