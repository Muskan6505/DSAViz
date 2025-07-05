import React from "react";

export function Card({ children }) {
  return <div className="bg-black/80 border border-gray-700 rounded-lg shadow-md p-4 space-y-4">{children}</div>;
}

export function CardHeader({ children }) {
  return <div className="border-b border-gray-700 pb-2 mb-2">{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <h3 className={`text-lg font-semibold text-white ${className}`}>{children}</h3>;
}

export function CardDescription({ children }) {
  return <p className="text-sm text-gray-400">{children}</p>;
}

export function CardContent({ children, className = "" }) {
  return <div className={`text-white ${className}`}>{children}</div>;
}
