import React from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'

export default function NotFound() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-black to-indigo-900 text-gray-800 px-4">
      <h1 className="text-6xl font-bold mb-4 text-gray-200">404</h1>
      <p className="text-2xl mb-2 text-gray-400">Page Not Found</p>
      <p className="text-gray-500 mb-6">
        Sorry, the page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go Home
      </Link>
    </div>
    </>
  );
}
