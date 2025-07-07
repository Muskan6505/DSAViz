import React, { useState } from "react";
import { X, Pencil } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Profile({ user, onClose }) {
    const [editDetails, setEditDetails] = useState(false);
    const [fullname, setFullname] = useState(user.fullname);
    const [username] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [avatarPreview, setAvatarPreview] = useState(user.avatar || null);
    const [avatarFile, setAvatarFile] = useState(null);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const handleUpdateDetails = async () => {
        try {
            const res = await axios.patch(
                "/api/v1/users/update",
                { fullname, email },
                { withCredentials: true }
            );
            if (res.status === 200) {
                toast.success("Details updated successfully!");
            }
        } catch (error) {
            toast.error("Failed to update details.");
        }
        setEditDetails(false);
    };

    const handleUploadAvatar = async () => {
        if (!avatarFile) return;
        const formData = new FormData();
        formData.append("avatar", avatarFile);

        try {
            const res = await axios.patch(
                "/api/v1/users/update-avatar",
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            if (res.status === 200) {
                toast.success("Avatar updated successfully!");
            }
        } catch (error) {
            toast.error("Failed to update avatar.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <ToastContainer position="top-right" autoClose={1500} theme="dark" />

            {/* Container with Scroll and Responsiveness */}
            <div className="bg-[#18181B] text-white w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl shadow-2xl relative space-y-6 custom-scrollbar transition-all duration-300">
                
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-2">
                    <h2 className="text-3xl font-bold">Profile</h2>
                    <p className="text-sm text-gray-400">Manage your personal information & avatar</p>
                </div>

                {/* Avatar Section */}
                <div className="border border-gray-700 bg-[#1f1f22] rounded-xl p-5 shadow-lg">
                    <h3 className="text-lg font-semibold mb-4">👤 Profile Picture</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 items-center text-center">
                        <img
                            src={
                                avatarPreview ||
                                "https://ui-avatars.com/api/?name=" + encodeURIComponent(fullname)
                            }
                            alt="Avatar"
                            className="w-28 h-28 rounded-full border-4 border-blue-600 shadow-lg object-cover mb-4 sm:mb-0"
                        />
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="text-sm text-gray-300 border border-gray-600 rounded-lg px-3 py-1.5 file:mr-2"
                            />
                            <button
                                onClick={handleUploadAvatar}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90 transition"
                            >
                                Upload Avatar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div className="border border-gray-700 bg-[#1f1f22] rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">📝 Profile Details</h3>
                        {!editDetails && (
                            <button
                                onClick={() => setEditDetails(true)}
                                className="text-blue-400 text-sm hover:underline flex items-center gap-1"
                            >
                                <Pencil className="w-4 h-4" />
                                Edit
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div>
                            <label className="text-gray-400 text-sm">Full Name</label>
                            {editDetails ? (
                                <input
                                    type="text"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 rounded-lg bg-[#2a2a2e] border border-gray-600 text-white"
                                />
                            ) : (
                                <p className="text-white mt-1">{fullname}</p>
                            )}
                        </div>

                        {/* Username */}
                        <div>
                            <label className="text-gray-400 text-sm">Username</label>
                            <p className="text-white mt-1">{username}</p>
                        </div>

                        {/* Email */}
                        <div className="sm:col-span-2">
                            <label className="text-gray-400 text-sm">Email</label>
                            {editDetails ? (
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full mt-1 px-3 py-2 rounded-lg bg-[#2a2a2e] border border-gray-600 text-white"
                                />
                            ) : (
                                <p className="text-white mt-1">{email}</p>
                            )}
                        </div>
                    </div>

                    {/* Update Buttons */}
                    {editDetails && (
                        <div className="flex justify-end gap-3 mt-6">
                            <button
                                onClick={() => setEditDetails(false)}
                                className="px-4 py-2 rounded-lg border border-gray-600 hover:bg-gray-800"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdateDetails}
                                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:opacity-90"
                            >
                                Update Details
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
