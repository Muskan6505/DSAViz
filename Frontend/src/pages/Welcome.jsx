import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {Card} from "../components/index.js"
import{
  Activity,
  Code,
  BookOpen,
  Trophy,
  BarChart4,
  Share2,
  TreeDeciduous,
  Zap,
  ListOrdered,
  Search,
  ArrowRight,
  PlayCircle
} from "lucide-react"

export default function Welcome() {
  const features = [
    {
      icon: <Activity className="text-white" size={24} />,
      title: "Interactive Visualizations",
      description: "Watch algorithms come to life with real-time animations for sorting, graph traversals, and tree operations.",
      color: "bg-blue-900"
    },
    {
      icon: <Code className="text-white" size={24} />,
      title: "Code Playground",
      description: "Practice with embedded editor supporting JavaScript, Python, and C++ with instant feedback.",
      color: "bg-purple-900"
    },
    {
      icon: <BookOpen className="text-white" size={24} />,
      title: "Practice Problems",
      description: "Solve categorized DSA problems with step-by-step hints and detailed explanations.",
      color: "bg-green-900"
    },
    {
      icon: <Trophy className="text-white" size={24} />,
      title: "Gamified Learning",
      description: "Earn badges, XP, and climb leaderboards as you master data structures and algorithms.",
      color: "bg-yellow-800"
    }
  ];

  const topics = [
    {
      icon: <BarChart4 className="text-white" size={20} />,
      title: "Sorting Algorithms",
      items: ["Quick Sort", "Merge Sort", "Heap Sort", "Bubble Sort"],
      color: "bg-blue-800"
    },
    {
      icon: <Share2 className="text-white" size={20} />,
      title: "Graph Algorithms",
      items: ["BFS", "DFS", "Dijkstra", "A* Search"],
      color: "bg-purple-800"
    },
    {
      icon: <TreeDeciduous className="text-white" size={20} />,
      title: "Tree Structures",
      items: ["BST", "AVL", "Red-Black", "Heaps"],
      color: "bg-green-800"
    },
    {
      icon: <Zap className="text-white" size={20} />,
      title: "Dynamic Programming",
      items: ["Knapsack", "LCS", "Edit Distance", "Fibonacci"],
      color: "bg-yellow-700"
    },
    {
      icon: <ListOrdered className="text-white" size={20} />,
      title: "Linear Structures",
      items: ["Arrays", "Linked Lists", "Stacks", "Queues"],
      color: "bg-sky-800"
    },
    {
      icon: <Search className="text-white" size={20} />,
      title: "Search Techniques",
      items: ["Binary Search", "Linear Search", "Hash Tables", "Sliding Window"],
      color: "bg-indigo-800"
    }
  ];

  return (
    <>
    <Navbar/>
    <div style={{overflow:scroll, scrollbarWidth:"none"}} className="min-h-screen bg-gray-950  text-white items-center justify-center pt-18">
      <div className=" min-h-screen bg-gradient-to-br from-gray-800 via-black to-indigo-900 text-white flex flex-col items-center justify-center py-10 mb-0">
        <p className="text-sm mb-4 text-blue-400 border border-blue-500 px-3 py-1 rounded-full">
          ⭐ Learn DSA Visually
        </p>
        <h1 className="text-5xl sm:text-6xl font-bold text-center leading-tight">
          Master <span className="bg-gradient-to-br from-purple-600 via-blue-700 to-pink-700 bg-clip-text text-transparent">Data Structures</span><br />
          <span className="text-white">& Algorithms</span>
        </h1>
        <p className="text-gray-400 text-center max-w-2xl mt-6 text-lg">
          The most intuitive platform to learn, visualize, and practice data structures and algorithms. 
          From sorting algorithms to graph theory, master every concept through interactive visualizations.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link to="/visualizers" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 lg:py-6 rounded-lg text-lg font-semibold shadow-md">
            ▶ Start Visualizing
          </Link>
          <Link to="/playground" className="bg-black hover:bg-gray-950 text-white border border-gray-500 px-6 lg:py-6 py-3 rounded-lg text-lg font-semibold shadow-md">
            &lt;/&gt; Try Playground
          </Link>
        </div>

        <div className="flex flex-wrap justify-center mx-10">
          <div className="flex flex-wrap justify-center gap-3 mt-10 text-sm text-gray-100">
            {[
              'Quick Sort',
              'Merge Sort',
              'Heap Sort',
              'Binary Search',
              'BFS',
              'DFS',
              'Dijkstra',
              'A* Search',
              'BST Operations',
              'AVL Rotations',
              'Dynamic Programming'
            ].map((tag) => (
              <span key={tag} className="bg-white/5 px-3 py-1 border-1  border-gray-500 rounded-full hover:border-blue-700 cursor-pointer transition">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* New Statistics and Highlight Section */}
      <div className="w-full border-t-1 border-t-gray-800 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { number: '50+', label: 'Algorithms', icon: '⚡' },
            { number: '200+', label: 'Problems', icon: '📘' },
            { number: '1000+', label: 'Users', icon: '👥' },
            { number: '94%', label: 'Success Rate', icon: '📈' },
          ].map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.number}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20 mx-2">
          <h2 className="text-4xl font-bold">
            Everything you need to <span className="bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">excel in DSA</span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Comprehensive tools and resources designed to make learning data structures and algorithms engaging and effective.
          </p>
        </div>
      </div>

      <div className="mt-20 text-white px-6 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
          <Card
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            color={feature.color}
          />
        ))}
        </div>
      </div>

      <div className="min-h-screen mt-10 text-white px-6 py-12">
        <div className="text-center mb-25">
          <h1 className="text-5xl font-bold">
            Master Core <span className="bg-gradient-to-br from-green-600 via-blue-500 to-pink-700 bg-clip-text text-transparent">DSA Topics</span>
          </h1>
          <p className="mt-3 text-md text-gray-400">
            From fundamental sorting algorithms to advanced graph theory, we cover
            everything you need for technical interviews.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {topics.map((topic, index) => (
            <Card
              key={index}
              icon={topic.icon}
              title={topic.title}
              items={topic.items}
              color={topic.color}
            />
          ))}
        </div>
      </div>
      
      <div className=" mt-10 text-white px-6 py-12 bg-gradient-to-br from-gray-900 via-black to-indigo-800">
        <div className="text-center mb-25">
          <h1 className="text-5xl font-bold">
            Ready to master <span className="bg-gradient-to-br from-green-600 via-blue-500 to-pink-700 bg-clip-text text-transparent">DSA</span> ?
          </h1>
          <p className="mt-3 text-xl text-gray-400">
            Join thousands of developers who have improved their problem-solving skills with our platform.
          </p>
        </div>

        <div className="flex flex-col justify-center items-center sm:flex-row gap-4 mt-10 ">
          <Link to="/visualizers" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 lg:py-6 rounded-lg text-lg font-semibold shadow-md">
            Start Learning <ArrowRight className="text-lg inline"> </ArrowRight>
          </Link>
          <Link to="/problems" className="bg-black hover:bg-gray-950 text-white border border-gray-500 px-6 lg:py-6 py-3 rounded-lg text-lg font-semibold shadow-md">
            Browse Problems
          </Link>
        </div>

      </div>

      <div className="flex flex-col md:flex-row items-center justify-between w-full py-6 px-6 bg-transparent">
      <Link to="/" className="flex items-center gap-3 mb-2 md:mb-0">
        <div className="relative w-8 h-8 bg-[#4F46E5] rounded-xl flex items-center justify-center">
          <PlayCircle className="w-4 h-4 text-white" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-green-400 rounded-full ring-2 ring-black"></span>
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          DSAViz
        </span>
      </Link>

      <p className="text-sm text-gray-400 text-center md:text-right">
        © 2024 DSAViz. Built for developers, by developers.
      </p>
    </div>

    </div>
    </>
  );
}
