import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    PlayCircle,
    Activity,
    Code2,
    BookOpen,
    Trophy,
    Menu,
    X,
    User,
    LogOut
} from "lucide-react";
import { Login, Signup } from "../components/index.js";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/userSlice"; 
import Profile from "./Profile";
import axios from "axios";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const isLoggedIn = user.isLoggedIn;

    const handleLogout = async() => {
        dispatch(logout());
        const res = await axios.post("/api/v1/users/logout", {}, { withCredentials:true })
        setDropdownOpen(false);
    };

    return (
        <nav className="bg-black/90 text-white px-6 py-4 fixed top-0 left-0 right-0 z-50 shadow-md shadow-gray-700">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2">
                    <div className="relative w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center">
                        <PlayCircle className="w-4 h-4 text-white" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full ring-2 ring-black"></span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        DSAViz
                    </span>
                </Link>

                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Desktop Nav */}
                <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
                    <Link to="/visualizers" className="flex items-center gap-1 hover:text-white">
                        <Activity className="w-4 h-4" /> Visualizers
                    </Link>
                    <Link to="/playground" className="flex items-center gap-1 hover:text-white">
                        <Code2 className="w-4 h-4" /> Playground
                    </Link>
                    <Link to="/problems" className="flex items-center gap-1 hover:text-white">
                        <BookOpen className="w-4 h-4" /> Problems
                    </Link>
                    <Link to="/leaderboard" className="flex items-center gap-1 hover:text-white">
                        <Trophy className="w-4 h-4" /> Leaderboard
                    </Link>
                </div>

                {/* Auth Buttons or User */}
                <div className="hidden md:flex items-center gap-3 relative">
                    {isLoggedIn ? (
                        <>
                            <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <User className="w-7 h-7 text-gray-300 text-xl rounded-full bg-white/15 p-1" />
                                <span className="text-sm">{user.username}</span>
                            </div>
                            {dropdownOpen && (
                                <div className="absolute top-12 right-0 bg-black/20 border border-gray-500 rounded-xl shadow-lg w-48 z-51 cursor-pointer">
                                    <button
                                        onClick={() => {setShowProfile(true), setDropdownOpen(false)}}
                                        className="w-full text-left px-4 py-2 text-sm hover:text-blue-600 cursor-pointer"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-4 py-2 text-sm hover:text-red-600 cursor-pointer"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setShowLogin(true)}
                                className="px-4 py-1.5 rounded-lg border border-gray-700 bg-black text-white hover:bg-gray-800 transition"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => setShowSignup(true)}
                                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition"
                            >
                                Get Started
                            </button>
                        </>
                    )}
                </div>
            </div>

            {/* Mobile Dropdown */}
            {menuOpen && (
                <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium text-gray-300">
                    <Link to="/visualizers" className="flex items-center gap-2 hover:text-white">
                        <Activity className="w-4 h-4" /> Visualizer
                    </Link>
                    <Link to="/playground" className="flex items-center gap-2 hover:text-white">
                        <Code2 className="w-4 h-4" /> Playground
                    </Link>
                    <Link to="/problems" className="flex items-center gap-2 hover:text-white">
                        <BookOpen className="w-4 h-4" /> Problems
                    </Link>
                    <Link to="/leaderboard" className="flex items-center gap-2 hover:text-white">
                        <Trophy className="w-4 h-4" /> Leaderboard
                    </Link>
                    <div className="flex flex-col gap-2 pt-2 border-t border-gray-700">
                        {isLoggedIn ? (
                            <>
                                <button
                                    onClick={() => setShowProfile(true)}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-800"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-800"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setShowLogin(true)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black hover:bg-gray-800 transition"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => setShowSignup(true)}
                                    className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition"
                                >
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Modals */}
            {showLogin && <Login onClose={() => setShowLogin(false)} />}
            {showSignup && <Signup onClose={() => setShowSignup(false)} />}
            {showProfile && <Profile user={user.user} onClose={() => setShowProfile(false)} />}
        </nav>
    );
}
