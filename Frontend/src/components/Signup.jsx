import React, { useState } from "react";
import { X, User, Mail, Lock, Eye } from "lucide-react";
import Login from "./Login";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";

export default function Signup({ onClose }) {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [error, setError] = useState("");

    const formValidate = () => {
        if (!fullname || !username || !email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email address.");
            return false;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return false;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return false;
        }

        setError("");
        return true;
    };

    const handleSubmit = async () => {
        if (formValidate()) {
            try {
                const response = await axios.post("/api/v1/users/register", {
                    fullname,
                    username,
                    email,
                    password,
                });

                console.log(response.data.data)

                dispatch(login(response.data.data));
                onClose(); 
            } catch (err) {
                console.error(err);
                setError(
                    err.response?.data?.message || "Something went wrong. Try again."
                );
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-[#0e0e10] text-white w-full max-w-md p-6 rounded-2xl shadow-xl relative my-10">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
                    <X />
                </button>

                <h2 className="text-2xl font-bold text-center mb-2">
                    Join <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">DSAViz</span>
                </h2>
                <p className="text-center text-sm text-gray-400 mb-6">
                    Create your account to start your DSA learning journey
                </p>

                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

                <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Full Name</label>
                        <div className="flex items-center px-3 py-2 rounded-xl border border-blue-600 bg-transparent focus-within:ring-2 ring-blue-600">
                            <User className="text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="John Doe"
                                className="bg-transparent outline-none px-2 w-full text-sm"
                                value={fullname}
                                onChange={(e) => setFullname(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm mb-1">Username</label>
                        <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                            <User className="text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="johndoe"
                                className="bg-transparent outline-none px-2 w-full text-sm"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Email</label>
                    <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                        <Mail className="text-gray-400 w-4 h-4" />
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="bg-transparent outline-none px-2 w-full text-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Password</label>
                    <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                        <Lock className="text-gray-400 w-4 h-4" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Create a strong password"
                            className="bg-transparent outline-none px-2 w-full text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Eye onClick={() => setShowPassword(!showPassword)} className="text-gray-400 w-4 h-4 cursor-pointer" />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-sm mb-1">Confirm Password</label>
                    <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                        <Lock className="text-gray-400 w-4 h-4" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Confirm your password"
                            className="bg-transparent outline-none px-2 w-full text-sm"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <Eye onClick={() => setShowPassword(!showPassword)} className="text-gray-400 w-4 h-4 cursor-pointer" />
                    </div>
                </div>

                <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold">
                    Create Account
                </button>

                <p className="text-sm text-gray-400 mt-5 text-center">
                    Already have an account?{" "}
                    <span
                        onClick={() => setShowLogin(true)}
                        className="text-blue-500 hover:underline cursor-pointer"
                    >
                        Sign in
                    </span>
                </p>
            </div>

            {showLogin && <Login onClose={() => setShowLogin(false)} />}
        </div>
    );
}
