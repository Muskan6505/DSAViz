import React from "react";
import { BarChart2, Share2, TreeDeciduous } from "lucide-react";
import { CategoryCard, Navbar } from "../components/index.js";

export default function Home() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-[#000000] text-white py-16 px-6 md:px-25 pt-30">
      <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
        Algorithm <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Visualizer</span>
      </h1>
      <p className="text-center text-gray-400 mb-12 text-xl">
        Watch algorithms come to life with interactive, step-by-step visualizations
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CategoryCard
          icon={<BarChart2 className="text-white" />}
          title="Sorting Algorithms"
          subtitle="Visualize how different sorting algorithms work"
          items={["Bubble Sort", "Quick Sort", "Merge Sort"]}
          markerColor={{ bg: "bg-blue-900", text: "text-blue-500" }}
          route={"sortingVisualizer"}
        />

        <CategoryCard
          icon={<Share2 className="text-white" />}
          title="Graph Algorithms"
          subtitle="Explore graph traversal and pathfinding algorithms"
          items={["BFS", "DFS", "Dijkstra's Algorithm"]}
          markerColor={{ bg: "bg-purple-900", text: "text-purple-500" }}
          route={"graphVisualizer"}
        />

        <CategoryCard
          icon={<TreeDeciduous className="text-white" />}
          title="Tree Structures"
          subtitle="Understand binary search tree operations"
          items={["BST Insert", "BST Search", "BST Delete"]}
          markerColor={{ bg: "bg-green-900", text: "text-green-500" }}
          route={"treeVisualizer"}
        />
      </div>

      <div className="bg-gradient-to-r from-[#0c1323] via-[#100c23] to-[#0d2115] rounded-2xl p-8 md:p-12 text-center text-gray-300 mt-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          Interactive Algorithm Learning
        </h2>
        <p className="max-w-3xl mx-auto text-gray-400 mb-6">
          Each visualizer includes step-by-step animations, customizable speed controls,
          and detailed explanations to help you understand how algorithms work.
        </p>

        <div className="flex justify-center gap-6 text-sm font-medium flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span>Step-by-step execution</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
            <span>Adjustable speed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span>Interactive controls</span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
