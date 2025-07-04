import React from "react";
import { Link } from "react-router-dom"; // Optional if using routing

const visualizers = [
  { id: 1, name: "Sorting Algorithms", path: "/visualizers/sorting", description: "Visualize bubble, merge, quick sort, etc." },
  { id: 2, name: "Pathfinding Algorithms", path: "/visualizers/pathfinding", description: "See how BFS, DFS, A* find paths." },
  { id: 3, name: "Recursion Tree", path: "/visualizers/recursion", description: "Understand recursive calls visually." },
];

export default function Visualizers() {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">Algorithm Visualizers</h1>

      <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visualizers.map((viz) => (
          <Link
            key={viz.id}
            to={viz.path}
            className="block bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">{viz.name}</h2>
            <p className="text-gray-600 text-sm">{viz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
