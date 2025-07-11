import React, { useState } from "react";
import { X, Eye, Mail, Lock } from "lucide-react";
import axios from "axios"
import {login} from '../features/userSlice';
import {useDispatch} from 'react-redux'
import { ToastContainer, toast } from "react-toastify";

export default function Login({ onClose }) {
    const [hidePassword, setHidePassword] = useState("password");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();

    const check = () => {
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!trimmedEmail || !trimmedPassword) {
            setError("Both fields are required");
            return false;
        } else if (!emailRegex.test(trimmedEmail)) {
            setError("Enter a valid email");
            return false;
        } else if (trimmedPassword.length < 6) {
            setError("Password must be at least 6 characters");
            return false;
        }

        setError(""); 
        return true;
    };



    const handleSubmit = async() =>{
        if(!check()) return;

        try{
            const res = await axios.post("/api/v1/users/login", {
                email,
                password
            },{withCredentials:true})
            toast.success("Login successfull")
            onClose()
            dispatch(login(res.data.data))
        }catch(err){
            setError(err.response.data?.error);
            toast.error("Login failed!")
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
        <ToastContainer position="top-right" autoClose={1500} theme="dark" />
        <div className="bg-[#0e0e10] text-white w-full max-w-md p-6 rounded-2xl shadow-xl relative">
            {/* Close button */}
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
            <X />
            </button>

            <h2 className="text-2xl font-bold text-center mb-2">Welcome back</h2>
            <p className="text-center text-sm text-gray-400 mb-6">
            Sign in to your DSAViz account to continue your learning journey
            </p>

            {/* Email input */}
            <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <div className="flex items-center px-3 py-2 rounded-xl border border-blue-600 bg-transparent focus-within:ring-2 ring-blue-600">
                <Mail className="text-gray-400 w-4 h-4" />
                <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {setEmail(e.target.value)}}
                className="bg-transparent outline-none px-2 w-full text-sm"
                />
            </div>
            </div>

            {/* Password input */}
            <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center px-3 py-2 rounded-xl border border-gray-700 bg-black">
                <Lock className="text-gray-400 w-4 h-4" />
                <input
                type={hidePassword}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
                className="bg-transparent outline-none px-2 w-full text-sm"
                />
                <Eye onMouseEnter={()=>{setHidePassword("text")}} onMouseLeave={()=>{setHidePassword("password")}} className="text-gray-400 w-4 h-4 cursor-pointer" />
            </div>
            
            </div>

            <button onClick={handleSubmit} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-2 rounded-xl font-semibold mt-2 cursor-pointer">
            Sign In
            </button>

            {error && (
            <div className="text-red-600 text-md mt-2 mb-2">{error}</div>
            )}

            <p className="text-sm  mt-3 text-gray-400 cursor-pointer hover:underline">
            Forgot your password?
            </p>

            {/* Divider
            <div className="flex items-center my-4">
            <div className="h-px bg-gray-700 flex-grow"></div>
            <span className="px-2 text-xs text-gray-500">OR CONTINUE WITH</span>
            <div className="h-px bg-gray-700 flex-grow"></div>
            </div>

            {/* Social login 
            <div className="flex gap-3 mb-4">
            <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-black border border-gray-700">
                <Github className="w-4 h-4" /> GitHub
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-black border border-gray-700">
                <Globe className="w-4 h-4" /> Google
            </button>
            </div> 

            <div className="text-center mb-4">
            <p className="text-sm text-gray-400">Try the demo account:</p>
            <button className="mt-2 px-4 py-1.5 bg-white text-black text-sm font-semibold rounded-xl">
                Use Demo Account
            </button>
            </div> */}

            <p className="text-sm mt-4 text-gray-400">
            Don't have an account?{" "}
            <span className="text-blue-500 hover:underline cursor-pointer">Sign up</span>
            </p>
        </div>
        </div>
    );
}
