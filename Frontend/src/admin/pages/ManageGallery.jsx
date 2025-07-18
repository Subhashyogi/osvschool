import React, { useState } from 'react';
import { galleryItems as initialGalleryItems } from '../../constants';
import { FaEdit, FaTrash, FaPlus, FaImage, FaVideo } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ManageGallery = () => {
    const [items, setItems] = useState(initialGalleryItems);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const handleAdd = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setIsModalOpen(true);
    };

    const handleDelete = (itemToDelete) => {
        if (window.confirm(`Are you sure you want to delete "${itemToDelete.alt}"?`)) {
            // Find unique identifier (src for images, first source for videos)
            const identifier = itemToDelete.src || itemToDelete.sources[0].src;
            setItems(items.filter(item => (item.src || item.sources[0].src) !== identifier));
            // In a real app, this would be an API call.
        }
    };

    const handleSave = (itemData) => {
        const identifier = itemData.src || itemData.sources[0].src;
        if (editingItem) {
            const originalId = editingItem.src || editingItem.sources[0].src;
            setItems(items.map(item => (item.src || item.sources[0].src) === originalId ? itemData : item));
        } else {
            setItems([...items, itemData]);
        }
        setIsModalOpen(false);
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

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item, index) => (
                    <div key={item.src || item.sources[0].src || index} className="bg-white rounded-lg shadow group overflow-hidden">
                        <div className="relative">
                            <img src={item.thumbnail || item.poster} alt={item.alt} className="h-48 w-full object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center space-x-4">
                                <button onClick={() => handleEdit(item)} className="p-3 bg-white/80 rounded-full text-blue-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300"><FaEdit size={18} /></button>
                                <button onClick={() => handleDelete(item)} className="p-3 bg-white/80 rounded-full text-red-600 opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300 delay-100"><FaTrash size={18} /></button>
                            </div>
                        </div>
                        <div className="p-4">
                            <p className="text-sm font-semibold text-gray-800 truncate">{item.alt}</p>
                            <p className="text-xs text-gray-500 capitalize flex items-center gap-2 mt-1">
                                {item.type === 'image' ? <FaImage /> : <FaVideo />}
                                {item.type}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <AnimatePresence>
                {isModalOpen && <GalleryForm item={editingItem} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
            </AnimatePresence>
        </div>
    );
};

// Modal Form Component for adding/editing gallery items
const GalleryForm = ({ item, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        type: item?.type || 'image',
        alt: item?.alt || '',
        src: item?.src || '', // For image source
        thumbnail: item?.thumbnail || '', // For image/video thumbnail
        poster: item?.poster || '', // For video poster
        videoSrc: item?.sources?.[0]?.src || '', // For video source
    });

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let finalData = { alt: formData.alt, type: formData.type };
        if (formData.type === 'image') {
            finalData.src = formData.src;
            finalData.thumbnail = formData.thumbnail;
        } else {
            finalData.poster = formData.poster;
            finalData.sources = [{ src: formData.videoSrc, type: 'video/mp4' }];
        }
        onSave(finalData);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, y: -20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg max-h-full overflow-y-auto"
            >
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{item ? 'Edit' : 'Add'} Gallery Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Item Type</label>
                        <select name="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Alternative Text (Caption)</label>
                        <input type="text" name="alt" value={formData.alt} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>

                    {formData.type === 'image' ? (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Image URL</label>
                                <input type="url" name="src" value={formData.src} onChange={handleChange} placeholder="https://example.com/image.jpg" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Thumbnail URL</label>
                                <input type="url" name="thumbnail" value={formData.thumbnail} onChange={handleChange} placeholder="https://example.com/thumbnail.jpg" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                            </div>
                        </>
                    ) : (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Video Source URL (.mp4)</label>
                                <input type="url" name="videoSrc" value={formData.videoSrc} onChange={handleChange} placeholder="https://example.com/video.mp4" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Video Poster/Thumbnail URL</label>
                                <input type="url" name="poster" value={formData.poster} onChange={handleChange} placeholder="https://example.com/poster.jpg" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                            </div>
                        </>
                    )}

                    <div className="flex justify-end space-x-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 transition-colors">Save Item</button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export default ManageGallery;