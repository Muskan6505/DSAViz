import React from "react";

export function Badge({ children, className = "", variant = "default" }) {
    const variants = {
        default: "bg-primary text-white",
        outline: "border border-gray-400 text-white",
    };

    return (
        <span className={`inline-block px-4 py-4 text-xs font-medium rounded ${variants[variant]} ${className}`}>
        {children}
        </span>
    );
}