import React from "react";
import Navbar from '../components/Navbar'

export default function Leaderboard() {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-black to-indigo-900 text-gray-100">
      <h1 className="text-4xl font-bold mb-4">Leaderboard</h1>
      <p className="text-lg text-gray-400">Coming Soon!</p>
    </div>
    </>
  );
}
