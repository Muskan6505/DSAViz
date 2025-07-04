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
} from "lucide-react";
import {Login, Signup} from "../components/index.js"

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <nav className="bg-black/70 text-white px-6 py-4 fixed top-0 left-0 right-0 z-100 shadow-md shadow-gray-700">
        <div className="flex items-center justify-between">
            {/* Left Section - Logo */}
            <Link to="/" className="flex items-center gap-2">
                <div className="relative w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center">
                    <PlayCircle className="w-4 h-4 text-white" />
                    <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full ring-2 ring-black"></span>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    DSAViz
                </span>
            </Link>

            {/* Mobile menu toggle */}
            <button
            className="md:hidden focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex gap-6 text-sm font-medium text-gray-300">
            <Link to="/visualizers" className="flex items-center gap-1 hover:text-white">
                <Activity className="w-4 h-4" />
                Visualizer
            </Link>
            <Link to="/playground" className="flex items-center gap-1 hover:text-white">
                <Code2 className="w-4 h-4" />
                Playground
            </Link>
            <Link to="/problems" className="flex items-center gap-1 hover:text-white">
                <BookOpen className="w-4 h-4" />
                Problems
            </Link>
            <Link to="/leaderboard" className="flex items-center gap-1 hover:text-white">
                <Trophy className="w-4 h-4" />
                Leaderboard
            </Link>
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setShowLogin(true)} 
            className="px-4 py-1.5 rounded-lg border border-gray-700 bg-black text-white hover:bg-gray-800 transition">
                Sign In
            </button>
            <button onClick={() => setShowSignup(true)}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition">
                Get Started
            </button>
            </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
            <div className="md:hidden mt-4 flex flex-col gap-4 text-sm font-medium text-gray-300">
            <Link to="/visualizer" className="flex items-center gap-2 hover:text-white">
                <Activity className="w-4 h-4" />
                Visualizer
            </Link>
            <Link to="/playground" className="flex items-center gap-2 hover:text-white">
                <Code2 className="w-4 h-4" />
                Playground
            </Link>
            <Link to="/problems" className="flex items-center gap-2 hover:text-white">
                <BookOpen className="w-4 h-4" />
                Problems
            </Link>
            <Link to="/leaderboard" className="flex items-center gap-2 hover:text-white">
                <Trophy className="w-4 h-4" />
                Leaderboard
            </Link>
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-700">
                <button onClick={() => setShowLogin(true)}
                className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-black text-white hover:bg-gray-800 transition">
                Sign In
                </button>
                
                <button onClick={() => setShowSignup(true)}
                className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition">
                Get Started
                </button>
            </div>
            </div>
        )}
        {showLogin && <Login onClose={() => setShowLogin(false)} />}
        {showSignup && <Signup onClose={() => setShowSignup(false)} />}
        </nav>
    );
}
