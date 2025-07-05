import React from "react";
import { cn } from "../utils/cn"; 

export function Button({ children, variant = "default", size = "md", className = "", ...props }) {
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition";

    const variants = {
        default: "bg-primary text-white hover:bg-primary/90",
        outline: "border border-gray-600 text-white hover:bg-gray-700",
        ghost: "text-white hover:bg-gray-800",
    };

    const sizes = {
        sm: "px-2 py-1 text-sm",
        md: "px-4 py-2 text-base",
        icon: "p-2",
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}