import React from "react";

export default function Card({ icon, title, description, items, color }) {
  return (
    <div className="bg-black/90 rounded-xl p-6 border border-gray-800 shadow hover:shadow-md shadow-gray-400 transition duration-300">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-${color}`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>

      {/* Either show description or list */}
      {description ? (
        <p className="text-gray-300">{description}</p>
      ) : items && items.length > 0 ? (
        <ul className="list-disc ml-5 space-y-1 text-sm text-gray-300">
          {items.map((item, idx) => (
            <li key={idx} className={`marker:text-amber-200`}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
