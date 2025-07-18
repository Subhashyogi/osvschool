import React, { useState } from 'react';
import { facultyMembers as initialFaculty } from '../../constants';
import { FaEdit, FaTrash, FaPlus, FaChalkboardTeacher, FaBuilding } from 'react-icons/fa';

const ManageFaculty = () => {
    const [faculty, setFaculty] = useState(initialFaculty);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMember, setEditingMember] = useState(null);

    const handleAdd = () => {
        setEditingMember(null);
        setIsModalOpen(true);
    };

    const handleEdit = (member) => {
        setEditingMember(member);
        setIsModalOpen(true);
    };

    const handleDelete = (memberName) => {
        if (window.confirm(`Are you sure you want to delete ${memberName}?`)) {
            setFaculty(faculty.filter(m => m.name !== memberName));
        }
    };

    const handleSave = (memberData) => {
        if (editingMember) {
            setFaculty(faculty.map(m => m.name === editingMember.name ? { ...m, ...memberData } : m));
        } else {
            setFaculty([...faculty, { ...memberData, socials: { linkedin: '#', twitter: '#' } }]);
        }
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <h1 className="text-3xl font-bold text-gray-800">Manage Faculty</h1>
                <button
                    onClick={handleAdd}
                    className="flex items-center px-4 py-2 bg-brand-dark text-white rounded-md hover:bg-opacity-90 w-full md:w-auto"
                >
                    <FaPlus className="mr-2" /> Add New Member
                </button>
            </div>

            {/* --- Desktop Table View --- */}
            <div className="bg-white rounded-lg shadow overflow-x-auto hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {faculty.map((member) => (
                            <tr key={member.name}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0 h-10 w-10">
                                            <img className="h-10 w-10 rounded-full object-cover" src={member.image} alt={member.name} />
                                        </div>
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{member.department}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900 mr-4"><FaEdit /></button>
                                    <button onClick={() => handleDelete(member.name)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* --- Mobile Card View --- */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
                {faculty.map((member) => (
                    <div key={member.name} className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                            <img className="h-16 w-16 rounded-full object-cover" src={member.image} alt={member.name} />
                            <div className="flex-1">
                                <p className="text-lg font-bold text-gray-900">{member.name}</p>
                                <p className="text-sm text-gray-600 flex items-center gap-2"><FaChalkboardTeacher />{member.title}</p>
                                <p className="text-sm text-gray-500 flex items-center gap-2"><FaBuilding />{member.department}</p>
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-4 pt-4 border-t">
                            <button onClick={() => handleEdit(member)} className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm"><FaEdit /> Edit</button>
                            <button onClick={() => handleDelete(member.name)} className="text-red-600 hover:text-red-900 flex items-center gap-1 text-sm"><FaTrash /> Delete</button>
                        </div>
                    </div>
                ))}
            </div>


            {isModalOpen && <FacultyForm member={editingMember} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
};

// The Form component remains the same as it's already responsive.
const FacultyForm = ({ member, onSave, onClose }) => {
    const [formData, setFormData] = useState({
        name: member?.name || '',
        title: member?.title || '',
        department: member?.department || 'Science',
        bio: member?.bio || '',
        image: member?.image || '',
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
                <h2 className="text-2xl font-bold mb-6">{member ? 'Edit' : 'Add'} Faculty Member</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" name="title" value={formData.title} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Photo URL</label>
                        <input type="url" name="image" value={formData.image} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" placeholder="https://example.com/photo.jpg" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Department</label>
                        <select name="department" value={formData.department} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                            <option>Science</option>
                            <option>Arts & Humanities</option>
                            <option>Mathematics & CS</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" className="mt-1 block w-full border border-gray-300 rounded-md p-2" required></textarea>
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

export default ManageFaculty;