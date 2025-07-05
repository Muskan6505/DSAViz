import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CategoryCard({ icon, title, subtitle, items, markerColor, route}) {
    return (
        <div className="bg-black/90 rounded-xl p-6 border border-gray-800 shadow-gray-700 hover:shadow-md transition duration-300">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${markerColor.bg}`}>
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
        <p className="text-gray-300 mb-3">{subtitle}</p>
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-300">
            {items.map((item, idx) => (
            <li key={idx} className={`marker:${markerColor.text}`}>{item}</li>
            ))}
        </ul>
        <Link to={`/${route}`} 
        className="mt-4 bg-black border border-gray-700 hover:border-gray-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer">
            Explore <ArrowRight size={16} />
        </Link>
        </div>
    );
}
