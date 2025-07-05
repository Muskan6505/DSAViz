import React, { useState } from "react";
import { X, User, Mail, Lock, Eye } from "lucide-react";
import Login from "./Login"

export default function Signup({ onClose }) {
    const [showPassword, setShowPassword] = useState(false)
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-[#0e0e10] text-white w-full max-w-md p-6 rounded-2xl shadow-xl relative my-10">
            {/* Close button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-center mb-2">Join <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                            DSAViz
                        </span></h2>
            <p className="text-center text-sm text-gray-400 mb-6">
            Create your account to start your DSA learning journey
            </p>

            {/* Full Name & Username */}
            <div className="flex gap-3 mb-4">
            <div className="flex-1">
                <label className="block text-sm mb-1">Full Name</label>
                <div className="flex items-center px-3 py-2 rounded-xl border border-blue-600 bg-transparent focus-within:ring-2 ring-blue-600">
                <User className="text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="John Doe"
                    className="bg-transparent outline-none px-2 w-full text-sm"
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
                />
                </div>
            </div>
            </div>

            {/* Email */}
            <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                <Mail className="text-gray-400 w-4 h-4" />
                <input
                type="email"
                placeholder="john@example.com"
                className="bg-transparent outline-none px-2 w-full text-sm"
                />
            </div>
            </div>

            {/* Password */}
            <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                <Lock className="text-gray-400 w-4 h-4" />
                <input
                type= {showPassword? "text" : "password"}
                placeholder="Create a strong password"
                className="bg-transparent outline-none px-2 w-full text-sm"
                />
                <Eye onClick={() => setShowPassword(!showPassword)} className="text-gray-400 w-4 h-4 cursor-pointer" />
            </div>
            </div>

            {/* Confirm Password */}
            <div className="mb-4">
            <label className="block text-sm mb-1">Confirm Password</label>
            <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                <Lock className="text-gray-400 w-4 h-4" />
                <input
                type={showPassword? "text" : "password"}
                placeholder="Confirm your password"
                className="bg-transparent outline-none px-2 w-full text-sm"
                />
                <Eye onClick={() => setShowPassword(!showPassword)} className="text-gray-400 w-4 h-4 cursor-pointer" />
            </div>
            </div>

            {/* Terms agreement */}
            {/* <div className="flex items-start mb-4">
            <input type="checkbox" className="mt-1 accent-blue-600" />
            <p className="ml-2 text-sm text-gray-400">
                I agree to the{" "}
                <span className="text-blue-500 underline cursor-pointer">Terms of Service</span> and{" "}
                <span className="text-blue-500 underline cursor-pointer">Privacy Policy</span>
            </p>
            </div> */}

            {/* Create Account */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold">
            Create Account
            </button>

            {/* Divider
            <div className="flex items-center my-4">
            <div className="h-px bg-gray-700 flex-grow"></div>
            <span className="px-2 text-xs text-gray-500">OR CONTINUE WITH</span>
            <div className="h-px bg-gray-700 flex-grow"></div>
            </div>

            {/* Social Buttons 
            <div className="flex gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-black border border-gray-700">
                <Github className="w-4 h-4" /> GitHub
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-black border border-gray-700">
                <Globe className="w-4 h-4" /> Google
            </button>
            </div> */}

            {/* Already have an account */}
            <p className="text-sm  text-gray-400 mt-5">
            Already have an account?{" "}
            <span onClick={()=>{
                setShowLogin(true)
            }} 
            className="text-blue-500 hover:underline cursor-pointer">Sign in</span>
            </p>
        </div>

        {(showLogin && <Login onClose={() => setShowLogin(false)}/>)}
        </div>
    );
}
