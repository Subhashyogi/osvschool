import React, { useState } from 'react';
import { testimonials as initialTestimonials } from '../../constants';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ManageTestimonials = () => {
    const [testimonials, setTestimonials] = useState(initialTestimonials);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState(null);

    const handleAdd = () => {
        setEditingTestimonial(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingTestimonial(item);
        setIsModalOpen(true);
    };

    const handleDelete = (itemName) => {
        if (window.confirm(`Are you sure you want to delete the testimonial from ${itemName}?`)) {
            setTestimonials(testimonials.filter(item => item.name !== itemName));
        }
    };

    const handleSave = (itemData) => {
        if (editingTestimonial) {
            setTestimonials(testimonials.map(item => item.name === editingTestimonial.name ? { ...item, ...itemData } : item));
        } else {
            setTestimonials([...testimonials, itemData]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            {/* --- Header Section (already responsive) --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Manage Testimonials</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 w-full md:w-auto"
                >
                    <FaPlus className="mr-2" /> Add New Testimonial
                </button>
            </div>

            {/* 
              --- DESKTOP TABLE VIEW --- 
              This entire div is HIDDEN on small screens (`hidden`) and becomes a `block` element on medium screens and up (`md:block`).
              This is the core of the desktop-first responsiveness.
            */}
            <div className="bg-white rounded-lg shadow overflow-hidden hidden md:block">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="w-3/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="w-2/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="w-5/12 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quote</th>
                            <th className="w-2/12 px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {testimonials.map((item) => (
                            <tr key={item.name}>
                                <td className="px-6 py-4 whitespace-nowrap align-top">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full object-cover" src={item.avatar} alt={item.name} />
                                        <div className="ml-4 text-sm font-medium text-gray-900">{item.name}</div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap align-top text-sm text-gray-500">{item.title}</td>
                                <td className="px-6 py-4 align-top text-sm text-gray-500">
                                    <p className="whitespace-normal">"{item.quote}"</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap align-top text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                    <button onClick={() => handleDelete(item.name)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 
              --- MOBILE CARD VIEW ---
              This entire div is VISIBLE by default on small screens (`grid`) and is HIDDEN on medium screens and up (`md:hidden`).
              This is the "mobile version" of the data display.
            */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {testimonials.map((item) => (
                    <div key={item.name} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-4 mb-4">
                            <img className="h-12 w-12 rounded-full object-cover" src={item.avatar} alt={item.name} />
                            <div>
                                <p className="font-bold text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.title}</p>
                            </div>
                        </div>
                        <blockquote className="text-sm text-gray-600 italic border-l-4 border-gray-200 pl-4">"{item.quote}"</blockquote>
                        <div className="flex justify-end space-x-4 mt-4 pt-4 border-t">
                            <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm"><FaEdit /> Edit</button>
                            <button onClick={() => handleDelete(item.name)} className="text-red-600 hover:text-red-900 flex items-center gap-1 text-sm"><FaTrash /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>

            {/* The Modal Form is already responsive by its nature */}
            {isModalOpen && <TestimonialForm item={editingTestimonial} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};


const TestimonialForm = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: item?.name || '',
        title: item?.title || '',
        avatar: item?.avatar || '',
        quote: item?.quote || '',
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
                <h2 className="text-2xl font-bold mb-6">{item ? 'Edit' : 'Add'} Testimonial</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author's Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Author's Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="e.g., Parent, Class of 2022" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                        <input type="url" name="avatar" value={formData.avatar} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="https://example.com/avatar.jpg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quote</label>
                        <textarea name="quote" value={formData.quote} onChange={handleChange} rows="4" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required></textarea>
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

export default ManageTestimonials;