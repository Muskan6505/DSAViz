import React from "react";
import { Link } from "react-router-dom";
import { PlayCircle } from "lucide-react";

export default function Logo(){
    return (
        <div>
            <Link to="/" className="flex items-center gap-2">
                    <div className="relative w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center">
                        <PlayCircle className="w-4 h-4 text-white" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full ring-2 ring-black"></span>
                    </div>
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                        DSAViz
                    </span>
            </Link>
        </div>
    )
}