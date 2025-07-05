import React from "react";

export function Slider({ value, onValueChange, min = 0, max = 100, step = 1, disabled }) {
    return (
        <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value[0]}
            disabled={disabled}
            onChange={(e) => onValueChange([parseInt(e.target.value)])}
            className={`
                w-full h-2 rounded-lg appearance-none cursor-pointer 
                bg-gradient-to-r from-indigo-500 via-gray-300 to-purple-600 
                disabled:opacity-50 mt-5
            `}
            style={{
                accentColor: "#6366f1", 
            }}
        />
    );
}
